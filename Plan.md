# Astro Homepage Refresh (Purpula Nebula)

## Findings from repo scan

- Homepage entry is `public_html/index.html` and it injects header/footer/portfolio via jQuery.

```85:101:/Users/patrickgatewood/Developer/website/public_html/index.html
<body class="home">

<div id="header"></div>

<div id="intro-container" align="center">
  <div id="intro" align="center">
    <img id="portrait" src="images/portrait.jpeg"/>
    <h1 id="name-header">Patrick Gatewood</h1>
    <ul class="whoami">
```

- Brand color and background:

```4:12:/Users/patrickgatewood/Developer/website/public_html/css/header.css
:root {
    --patrick-purple: rgb(84, 72, 200);
    --expanded-navbar-gray: #171123;
}
```

```1:4:/Users/patrickgatewood/Developer/website/public_html/css/index.css
body {
    background: #171123;
}
```

- Top-level routes: `index.html`, `portfolio.html`, `resume.html`, `recipe-nabber.html`, `arkit-research/**`, plus Hugo blog in `public_html/blog` served on subdomain.
- Caddy in-repo shows main site + blog subdomain; blog has explicit `root "./blog/public/"`.

```1:8:/Users/patrickgatewood/Developer/website/public_html/Caddyfile
https://patrickgatewood.com {
  file_server
}

https://blog.patrickgatewood.com {
  file_server
    root "./blog/public/"
}
```

- Existing CI builds only the Hugo blog over SSH; no workflow deploys the main site.

```1:12:/Users/patrickgatewood/Developer/website/.github/workflows/deploy.yml
name: Build & Deploy Hugo Blog
on:
  push:
    branches:
      - master
...
```

## Goals

- Replace the homepage only with Astro-rendered `dist/index.html` (starfield hero), keep all other legacy pages and routes working.
- Retain brand purple `#5448c8` (rgb(84,72,200)) and dark space background vibe.
- Add CI to build Astro and rsync `dist/` to the server.

## Assumptions

- The main site’s web root on the server can be targeted via a new secret `SERVER_PATH` (e.g., `/var/www/patrickgatewood.com`).
- CI triggers on both `main` and `master` for now.
- We won’t modify the production Caddyfile in this phase. We’ll deploy built static files to the same docroot the main site already uses.

## Implementation plan

1. Scaffold Astro (non-invasive)

   - Create: `.nvmrc` (Node 20), `package.json`, `astro.config.mjs`, optional `tsconfig.json`, `public/` (optional), `src/styles/theme.css`, `src/components/*`, `src/pages/index.astro`.
   - Notes: Astro builds static HTML by default. `src/pages/index.astro` → `dist/index.html`.

2. Build “Purpula Nebula” UI

   - Background radial gradient using deep navy tokens, plus SVG starfield layer with twinkle and slow drift (prefers-reduced-motion respected).
   - Hero: large bold name in `--nebula` (#5448c8) with subtle white glow, tagline in `--lavender`.
   - Satellite: small SVG icon oscillating slowly (proof-of-concept), disabled in reduced motion.

3. SEO & Accessibility

   - Title, description, theme-color `#5448c8`, canonical. High contrast text. Decorative SVGs `aria-hidden="true"`.

4. Preserve legacy pages

   - Do not edit/remove legacy files. Add visible links to `https://blog.patrickgatewood.com` and `/legacy/index.html` on the new homepage.
   - CI one-time: ensure `${SERVER_PATH}/legacy/index.html` exists (copy current `${SERVER_PATH}/index.html` if missing).

5. CI/CD for Astro (new workflow)

   - New `.github/workflows/deploy-astro.yml`:
     - On push to `main` and `master`.
     - Setup Node 20, `npm ci && npm run build`.
     - SSH: ensure `legacy/index.html` exists on server.
     - SCP: upload `dist/` to `${SERVER_PATH}` using existing SSH secrets and new `SERVER_PATH`.
   - Keep existing Hugo blog workflow untouched.

6. Local scripts

   - `dev`, `build`, `preview` in `package.json`.

7. Phase 2 stubs (non-blocking)
   - `src/data/projects.json` (sample item) and `src/pages/readme.svg.ts` returning themed SVG.

## File operations

- Create:

  - `.nvmrc`
  - `package.json`, `astro.config.mjs`, `tsconfig.json`
  - `src/styles/theme.css`
  - `src/components/Hero.astro`, `src/components/Starfield.astro`, `src/components/Satellite.astro`
  - `src/pages/index.astro`
  - `src/data/projects.json`
  - `src/pages/readme.svg.ts`
  - `.github/workflows/deploy-astro.yml`

- No edits to legacy files. No deletions.

## Rollback

1. SSH to server and move `${SERVER_PATH}/legacy/index.html` back to `${SERVER_PATH}/index.html`.
2. Or temporarily disable the Astro deploy workflow.
3. All other legacy routes remain unaffected.

## Acceptance

- `npm run build` succeeds; `dist/` contains the new homepage.
- Homepage shows starfield, glowing purple name, lavender tagline, floating icon; no console errors.
- Animations respect `prefers-reduced-motion`.
- Legacy routes (portfolio, resume, arkit-research, blog subdomain) still load.
- CI builds on push to main/master and uploads `dist/` to `${SERVER_PATH}`.
