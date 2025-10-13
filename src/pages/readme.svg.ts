export async function GET() {
  const nebula = "#5448c8";
  const lavender = "#a5b4fc";
  const text = `Patrick Gatewood`;
  const tagline = `Software Engineer · Creator`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="70%" stop-color="#080d1a"/>
      <stop offset="100%" stop-color="#04070f"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <rect width="800" height="200" fill="url(#bg)"/>
  <text x="400" y="95" fill="${nebula}" font-family="Inter, -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" text-anchor="middle" filter="url(#glow)">${text}</text>
  <text x="400" y="135" fill="${lavender}" font-family="Inter, -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif" font-size="18" text-anchor="middle">${tagline}</text>
</svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
