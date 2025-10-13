import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceRadial,
  forceX,
  forceY,
} from "d3-force";

function setup(root: HTMLElement) {
  const iconPx = Number(root.dataset.iconpx || 96);
  const gap = Number(root.dataset.gap || 18);
  const ratio = Number(root.dataset.radiusScale || 0.46);
  const spin = Number(root.dataset.spin || 0.004);

  const nodesEls = Array.from(root.querySelectorAll(".node")) as HTMLElement[];
  if (!nodesEls.length) return;

  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ICON = iconPx;
  const COLLIDE = ICON / 2 + gap + 2;
  const DECAY = prefersReduced ? 0.98 : 0.9;
  const SPIN = prefersReduced ? 0.0 : spin;

  const simNodes = nodesEls.map((el) => ({ x: 0, y: 0, vx: 0, vy: 0, el }));

  function measure() {
    const w = root.clientWidth;
    const h = root.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.max(ICON, Math.min(w, h) * ratio - ICON / 2);
    return { w, h, cx, cy, R };
  }

  let dims = measure();

  // Seed initial positions in a compact offscreen grid to avoid stacking
  {
    const count = simNodes.length;
    const cols = Math.ceil(Math.sqrt(count));
    const cell = ICON + gap;
    const startX = ICON; // small padding from left
    const startY = dims.h + cell; // below container
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = (Math.random() - 0.5) * 6;
      const jitterY = (Math.random() - 0.5) * 6;
      simNodes[i].x = startX + col * cell + jitterX;
      simNodes[i].y = startY + row * cell + jitterY;
    }
    // Apply initial transform so first frame is offscreen and unstacked
    const tZ = " translate(-50%, -50%)";
    for (const n of simNodes) {
      (n.el as HTMLElement).style.transform =
        `translate3d(${n.x}px, ${n.y}px, 0)` + tZ;
    }
  }

  const sim = forceSimulation(simNodes as any)
    .velocityDecay(DECAY)
    .force("center", forceCenter(dims.cx, dims.cy))
    // Stronger vertical clamp toward center line, weaker horizontal centering
    .force("y", forceY(dims.cy).strength(prefersReduced ? 0.06 : 0.36))
    .force("x", forceX(dims.cx).strength(prefersReduced ? 0.01 : 0.01))

    // Keep a gentle radial pull for cohesion
    .force(
      "radial",
      forceRadial(dims.R, dims.cx, dims.cy).strength(
        prefersReduced ? 0.015 : 0.5
      )
    )
    .force("collide", forceCollide(COLLIDE).iterations(5))
    .alpha(1)
    .alphaMin(0.001)
    .stop();

  function swirl() {
    for (const n of simNodes) {
      const dx = n.x - dims.cx,
        dy = n.y - dims.cy;
      const d = Math.hypot(dx, dy) || 1;
      const tx = -dy / d,
        ty = dx / d;
      n.vx += tx * SPIN;
      n.vy += ty * SPIN;
    }
  }

  let rafPending = false;
  function write() {
    rafPending = false;
    const tZ = " translate(-50%, -50%)";
    for (const n of simNodes) {
      (n.el as HTMLElement).style.transform =
        `translate3d(${n.x}px, ${n.y}px, 0)` + tZ;
    }
  }

  sim.on("tick", () => {
    swirl();
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(write);
    }
  });

  function restart() {
    dims = measure();
    const fC = sim.force("center") as any;
    if (fC && typeof fC.x === "function") {
      fC.x(dims.cx).y(dims.cy);
    }
    const fY = sim.force("y") as any;
    if (fY && typeof fY.y === "function") {
      fY.y(dims.cy).strength(prefersReduced ? 0.06 : 0.16);
    }
    const fX = sim.force("x") as any;
    if (fX && typeof fX.x === "function") {
      fX.x(dims.cx).strength(prefersReduced ? 0.01 : 0.03);
    }
    const fR = sim.force("radial") as any;
    if (fR && typeof fR.radius === "function") {
      fR.radius(dims.R)
        .x(dims.cx)
        .y(dims.cy)
        .strength(prefersReduced ? 0.015 : 0.02);
    }
    sim.alpha(0.9).restart();
  }

  // Pre-simmer: run a number of ticks offscreen so nodes are arranged before reveal
  {
    const preTicks = 120; // ~ initial stabilization
    for (let i = 0; i < preTicks; i++) {
      swirl();
      sim.tick();
    }
    write();
    root.classList.add("ready");
  }

  const ro = new ResizeObserver(() => restart());
  ro.observe(root);
  if (!prefersReduced) sim.restart();
  else write();

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      sim.alphaTarget(visible && !prefersReduced ? 0.03 : 0.0);
    },
    { threshold: 0.1 }
  );
  io.observe(root);

  addEventListener("astro:before-swap", () => {
    sim.stop();
    ro.disconnect();
    io.disconnect();
  });
}

// Initialize all orbits on the page
Array.from(document.querySelectorAll('[data-icon-orbit="1"]')).forEach((el) =>
  setup(el as HTMLElement)
);
