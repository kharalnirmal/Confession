# Static deployment checklist

The app needs no backend or environment variables. Use Node.js 24 LTS and build
from the committed lockfile:

```bash
npm ci
npm test
npm run lint
npm run build
npm run preview
```

`preview` serves the generated build for local inspection, not as a production
server. Upload the entire `dist/` directory to a static host; do not deploy the
source directory or only `dist/index.html`.

## Vercel

Select the Vite preset, `npm ci` as install command, `npm run build` as build
command, and `dist` as output directory. No client-side router or server API
rewrite is needed for the current single-page experience.

## Hosting under a subpath

Set Vite's base to the deployed path, including its trailing slash. To inspect a
one-off subpath build without changing the configuration:

```bash
npm run build -- --base=/confession/
npm run preview
```

Open the preview's `/confession/` path. `BASE_URL` is substituted at build time,
not configured by the web server after upload. The tree image and soundtrack use
that base; verify both requests succeed. Rebuild with the correct base before
publishing elsewhere. A normal `npm run build` restores the configured default.

On Windows **Git Bash**, prevent MSYS from converting the URL path into a Windows
filesystem path: use `MSYS_NO_PATHCONV=1 npm run build -- --base=/confession/`.
This prefix is specific to that shell; it is not needed in PowerShell or on Linux.

## Before publishing

- Obtain appropriate rights for the soundtrack or replace it with licensed music.
  See [soundtrack packaging](music-preview.md).
- If changing domains, update canonical, Open Graph, Twitter, and JSON-LD URLs in
  `index.html`; social-image URLs must be publicly reachable absolute URLs.
- Confirm `music/glue-song.m4a`, `images/sakura-tree.webp`, `story-icon.svg`, and
  `og-image-nirmal.png` exist in the output. Serve their actual files, not an HTML
  fallback response. Check response content types and audio playback on the host.
- Test both music and silence, the ending, replay, and narrow-screen layout on the
  deployed URL. An upload succeeding does not verify browser behavior.
- Google Fonts is an external dependency. Block font requests once to check local
  fallbacks remain readable; a static deployment is not automatically offline-ready.

## Rollback

Keep the previous successful deployment available through the host's deployment
history. Restore that deployment if verification fails; do not rewrite Git history
or mix files from two different builds.
