import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceRadial,
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
  const COLLIDE = ICON / 2 + gap;
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
  const sim = forceSimulation(simNodes as any)
    .velocityDecay(DECAY)
    .force("center", forceCenter(dims.cx, dims.cy))
    .force("radial", forceRadial(dims.R, dims.cx, dims.cy).strength(0.06))
    .force("collide", forceCollide(COLLIDE).iterations(2))
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
    const fR = sim.force("radial") as any;
    if (fR && typeof fR.radius === "function") {
      fR.radius(dims.R)
        .x(dims.cx)
        .y(dims.cy)
        .strength(prefersReduced ? 0.03 : 0.06);
    }
    sim.alpha(0.9).restart();
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
