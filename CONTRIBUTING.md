# Contributing

Confession is a static React/TypeScript experience. Please preserve the story's
existing pacing, artwork, and music-or-silence choice unless a change explicitly
calls for redesigning them.

## Local setup

Use Node.js 24 LTS and npm (`nvm use` if you use nvm), then:

```bash
npm ci
npm run dev
```

Create a descriptive branch from an up-to-date `main`. Keep each pull request
focused on one independently reviewable improvement. The customization map in
[README.md](README.md#make-it-yours) identifies the main editing points.

## Before requesting review

```bash
npm test
npm run lint
npm run build
```

Tests run directly on Node's built-in TypeScript support; test imports use explicit
`.ts` extensions. Add deterministic regression tests for changes to pure motion
or timing helpers. Do not add sleeps or rely on real audio to test those helpers.

For UI changes, also open the app in a browser. Check the full opening-to-ending
flow, replay, pause/resume, music and silence, reduced motion, and a narrow mobile
viewport. A passing build alone does not establish correct playback or accessibility.
Include screenshots for visible changes and list browsers/devices actually tested.

## Assets and privacy

Do not commit secrets, private messages, or personal recordings. Confirm permission
before adding third-party artwork, fonts, or music. The packaged soundtrack has
[explicit rights caveats](docs/music-preview.md); its presence is not a license to
redistribute it. Keep editable artwork in `docs/artwork/` and deployed assets in
`public/`; do not commit `dist/` or `node_modules/`.

## Pull request notes

Explain the problem, the change, and the checks performed. Separate observed
results from untested assumptions. If a check is not applicable, say why rather
than marking it as passed. Mention any deployment, timing, or asset-size impact.
