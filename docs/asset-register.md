# Asset register

## Invitation illustration and favicon
- Files: `src/components/Envelope.tsx`, `public/story-icon.svg`.
- Origin: original SVG artwork authored for this project, not downloaded from a third-party collection.
- Includes: envelope, botanical sprig, gold thread, heart seal, and favicon.
- External dependencies, embedded images, and attribution requirements: none.
- Status: first-frame artwork ready for user review; character artwork remains pending approval.

## Typography
- Current: system sans-serif and Georgia/Times New Roman fallbacks. No font downloads or third-party requests.
- Lora and DM Sans remain pending local font retrieval and retained licenses.

## Music and character assets
- Original layered artwork now lives in `src/components/Characters.tsx` and `src/components/StoryIllustration.tsx`. Authored for this project, not downloaded or adapted from stock assets. No external image, font, or animation requests.
- Revised per user feedback: a long-haired woman in a lavender dress/cardigan and a short-haired man in a peach overshirt/trousers. Reusable detailed faces include brows, eyes, nose, lips, hair strands, earrings, and facial shading. Clothing has seams, pleats, collars, buttons, pockets, shoes, and a watch.
- Separate standing/flower, umbrella, handholding, purpose-drawn embrace, and seated-lean compositions. Umbrella, gripping hand, and person share a rig; whole-couple sway cannot separate their contact. These are illustrated preview characters for user review, not photorealistic artwork or a formally approved model sheet.
- GSAP interpolates authored SVG layers with a paused timeline; the audio clock seeks that timeline. Reduced motion and manual reading show complete static poses.
- A user-supplied commercial recording is enabled **only in local development**. No release rights have been established. See `docs/music-preview.md`.
- Production continues to use silent/manual reading; the MP3 is not copied to `public/`, imported as a bundled asset, or included in `dist/`.
