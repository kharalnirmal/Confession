# Asset register

## Invitation illustration and favicon
- Files: `src/components/Envelope.tsx`, `public/story-icon.svg`.
- Origin: original SVG artwork authored for this project, not downloaded from a third-party collection.
- Includes: envelope, botanical sprig, gold thread, heart seal, and favicon.
- External dependencies, embedded images, and attribution requirements: none.
- Status: first-frame artwork ready for user review; character artwork remains pending approval.

## Typography
- `index.html` loads Lora and Dancing Script through Google Fonts, with preconnects to `fonts.googleapis.com` and `fonts.gstatic.com`. These are external runtime requests, not locally bundled fonts.
- Local fallbacks remain available through the font stacks in `src/App.css` and `src/index.css`. Check readability with font requests blocked. Self-hosting would require retaining the applicable font licenses.

## Sakura tree
- Runtime: `src/components/SakuraTree.tsx`, `public/images/sakura-tree.webp`; editable vector master: `docs/artwork/sakura-tree.svg`; falling-petal motion: `src/lib/sakura.ts`.
- Locally authored SVG illustration guided by the user's full-canopy sakura reference. Layered rose shadows, individual five-petaled flowers, a continuous trunk, and tapered branches hidden within the crown. Green canopy leaves were removed per user feedback. No stock downloads or external runtime requests.
- Image generation was attempted but failed due to provider quota; no generated image asset is used.
- Eight small falling petals use the story clock, including pause/replay behavior. Reduced motion keeps them static.
- Performance: the static tree is baked into a transparent 1500×1650 WebP (approximately 231 KiB) and preloaded. This replaces 3,672 live SVG flower instances with one cached image; the SVG master is not shipped to browsers. No procedural blossom generation runs during app startup or scene changes.
- All chapters use the original `40 0 520 450` camera framing and unchanged character positions. Only the tree geometry is adjusted for a taller trunk and an overhead crown; the couple is not scaled down to fit the tree. Blossom clusters are rearranged rather than vertically scaling individual flowers. Blossoms have translucent tip shading and fine veins; falling petals have asymmetric notched shapes, pink gradients, slower drifting, and perspective flutter.

## Music and character assets
- Original layered artwork now lives in `src/components/Characters.tsx` and `src/components/StoryIllustration.tsx`. Authored for this project, not downloaded or adapted from stock assets. The artwork itself needs no third-party image or animation requests; page typography separately uses Google Fonts as noted above.
- Revised per user feedback: a long-haired woman in a lavender dress/cardigan and a short-haired man in a peach overshirt/trousers. Reusable detailed faces include brows, eyes, nose, lips, hair strands, earrings, and facial shading. Clothing has seams, pleats, collars, buttons, pockets, shoes, and a watch.
- Separate standing/flower, umbrella, handholding, purpose-drawn embrace, and seated-lean compositions. Umbrella, gripping hand, and person share a rig; whole-couple sway cannot separate their contact. These are illustrated preview characters for user review, not photorealistic artwork or a formally approved model sheet.
- GSAP interpolates authored SVG layers with a paused timeline; the active app's narrative clock (`useStoryPlayback`) positions scene animation independently of background music. Reduced motion uses static illustrated poses.
- The user-supplied recording is packaged as `public/music/glue-song.m4a` and copied into production output. The original root MP3 remains ignored by Git. No release rights have been established by packaging it. See [soundtrack packaging and rights](music-preview.md).
- Both music and silence choices use the same narrative flow. The recording loops as optional background audio; its provisional cue-sheet boundaries do not establish beat or lyric synchronization.
