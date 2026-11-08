# A Little Universe for Two — Detailed Project Plan

**Status:** Mobile-first illustrated preview implemented with a user-supplied soundtrack in local development only. M2 controller tests and direct real-file seeking checks pass. Commercial music rights, listening-calibrated timing, character review, and release QA remain open; do not treat the preview as approved for public deployment.

**Working title:** A Little Universe for Two  
**Tagline:** A small story. An infinite kind of love.

This document is the implementation brief, creative reference, and acceptance checklist for a premium, mobile-first romantic story website. No application code, dependency installation, or scaffolding is authorized by creating this plan.

## 1. Project status and boundaries

- The user reports an existing Vite + React + TypeScript project named `little-universe-for-two` with dependencies already installed.
- Treat React, TypeScript, Vite, GSAP, `@lottiefiles/dotlottie-react`, `lucide-react`, Tailwind CSS v4, and `@tailwindcss/vite` as present. Do not reinstall them.
- The inspected workspace, `C:\Users\Nirmal Kharal\Desktop\love`, was empty before this document was created. The actual application folder and installed versions have not yet been verified.
- Before implementation, locate the existing project and inspect its files, package versions, configuration, and any `AGENTS.md` instructions.
- Tailwind v4 may need its Vite plugin and `@import "tailwindcss";` configured during implementation, not during planning.
- No backend, database, authentication, analytics, trackers, or personal data are needed.
- No additional dependencies without justification and approval.
- Do not modify the older birthday repository.
- Implement scene by scene after approval, with a reviewable result at each milestone.

## 2. Creative concept

An illustrated letter opens into a tiny world that gradually becomes warmer because two people have found each other. A shy glance becomes a shared umbrella, a handwritten note becomes a page in an imaginary memory book, and the stars they discover eventually form a constellation above their embrace. Rather than announcing romance with spectacle, the experience earns its emotional peak through small, recognizable gestures, then becomes beautifully quiet for the final confession. It should feel like a pocket-sized animated film someone made for the person they love, without requiring names, dates, photographs, or private information.

### Alternative titles

- Where Our Stars Meet
- The Quiet Magic of Us
- Every Version, You

### Creative principles

1. Intimacy before spectacle: the emotional peak depends on the earlier small gestures.
2. One coherent illustrated world rather than unrelated slides.
3. Consistent vector characters, never CSS-shape people or emoji substitutes.
4. Elegance over visual noise: no constant confetti, unmotivated bouncing, or dashboard styling.
5. Short original prose, not long scrolling text walls.
6. Soundtrack-led cinematic timing, with manual accessible alternatives.
7. Optional discoveries never gate essential story content.

### Recurring visual motif

A thin gold thread begins as the envelope seal detail, becomes a garden path, then a book ribbon, and finally a constellation line. This provides continuity without requiring heavy transitions or excessive effects.

### Reference review

- Demo: <https://fajarghifar.github.io/happybirthday/>
- Older repository: <https://github.com/kharalnirmal/Shrijana-s-Birthday>
- The older repository's HTML and animation script were reviewed read-only. Its audio starts separately from its GSAP timeline, and replay restarts only the animation.
- Retain the storytelling idea of escalating reveals, not the reference's visual style or synchronization implementation.
- The fetched demo response did not expose enough to assess its rendered motion visually. Do not claim a complete visual/browser review has occurred.

## 3. Storyboard

The triggers below are musical landmarks to calibrate against the approved recording, not timestamps. Total cinematic duration remains pending the actual audio file. Invitation waiting and post-track exploration are outside that duration.

| Scene | Mood and setting | Character behavior | Original copy | Audio trigger | Interactions |
| --- | --- | --- | --- | --- | --- |
| 1. The Invitation | Warm ivory paper, illustrated envelope, small gold seal. One deliberate drift, then stillness. | Tiny silhouettes introduce the pair on the seal. | “Some stories begin with a grand adventure. Ours begins with a little hello.” Button: “Open Our Story”. | Outside the musical timeline. The visitor's tap requests playback; music-dependent opening waits for confirmed playback. | Open, sound preference, reduced-motion option. Readiness message: “Gathering a little starlight…” |
| 2. A Chance Encounter | Envelope opens into a moonlit pastel garden; two paths meet beneath a flowering tree. | Blink, look away, glance back; offer a flower; approach. | “Of all the paths we could have taken, I’m glad ours crossed.” | Opening phrase and first musical resolution. | Pause or next chapter; no required puzzle. |
| 3. The Little Things | Three memory-book vignettes: shared shelter, two warm cups, quiet companionship. No photographs or dates. | Tilt the umbrella toward the other person; hands meet near a cup; shoulders settle together. | “You make ordinary days feel worth keeping.” / “Even silence feels like company with you.” | Three selected phrase boundaries in the quieter middle passage. | Optional stars reveal notes. Opening a reading panel pauses playback; closing offers explicit Resume. |
| 4. A Sky Made for Us | Ribbon rises into the sky. Stars connect gradually; a heart becomes recognizable near completion. | Approach, hold hands, embrace using purpose-drawn poses. | “Somewhere between the little things, you became my favorite part of everything.” | Verified musical lift; hand contact on an accent; constellation completes at the selected peak. | Watch, pause, or skip. No tapping required to earn the payoff. |
| 5. The Confession | Camera settles. A paper note appears while the couple stays visible behind it. | Embrace softens into sitting together; a gentle head lean. | “I don’t need a perfect story. Just the chance to keep sharing the small, beautiful parts with you.” Final line: “In every version of my story, I'd still choose you.” | Musical release and closing phrase, allowing sufficient reading time. | Pause to read; access full semantic story text. |
| 6. The Afterglow | Twilight sky, completed constellation, seated couple. No new climax. | Occasional blink or subtle breathing; static in reduced motion. | “There’s a little universe here. And room for us.” | Track outro and `ended`; tableau remains indefinitely. | Replay, Sound On/Off, supported volume control, Explore little notes. |

### Pacing and interaction rules

- Select a concise recording with a complete emotional arc; do not pad the story to fill a long track.
- Any edit to music must be permitted by its license and end musically rather than abruptly.
- Caption dwell times are calibrated through real reading tests, especially on narrow phones.
- Do not introduce arbitrary chapter durations before track selection.
- Provide persistent pause and subtle next-chapter controls during playback.
- Next chapter seeks the soundtrack too; it never advances visuals alone.
- Essential prose appears automatically and remains available in the reading view.
- Optional discoveries are fully accessible after the story, so exploration does not compete with the peak.
- The final tableau has no mandatory countdown or forced exit.

### Optional hidden note copy

These are proposed original lines, subject to approval:

- “You make room for joy in the smallest places.”
- “My favorite kind of adventure is a day beside you.”
- “Some moments are quiet. That doesn’t make them small.”

## 4. Art direction

### Palette

| Role | Color | Usage |
| --- | --- | --- |
| Warm ivory | `#FFF8EF` | Paper, invitation, light caption surfaces |
| Blush | `#E9B7C5` | Flowers and restrained romantic accents |
| Dusty lavender | `#B7A7CB` | Clothing, foliage, evening transitions |
| Soft peach | `#F3C5A8` | Warm light and contrasting character clothing |
| Twilight blue | `#283650` | Night setting |
| Deep night | `#172238` | Dark caption backing and deep scenery |
| Plum ink | `#3D3048` | Text on light backgrounds |
| Muted gold | `#D9B77B` | Thread, seal, constellation accents |

Pastels are illustration colors, not default text colors. Verify actual contrast combinations; prefer plum ink on ivory and ivory on deep twilight.

### Typography

Recommended pairing: **Lora + DM Sans**, pending retrieval of official font files and their license notices.

- Lora for titles and confession: literary, warm, not ornate.
- DM Sans for captions, controls, and statuses.
- Lora italic for the note rather than a third, difficult-to-read script font.
- Self-host a minimal WOFF2 selection and retain font licenses.
- Begin caption testing around 18–22px on phones with generous line height.
- Keep text blocks short, generally one or two sentences.
- Use HTML for essential text, not outlined SVG text.
- Provide robust system-font fallbacks and stable layout during font loading.

### Character specification

**Recommended route: bespoke layered SVG characters.** Consistent poses and convincing physical contact matter more than using an existing animation package.

Proposed pair, subject to art approval:

- Two softly stylized adult figures, approximately four heads tall.
- Person A: rounded dark curls, lavender cardigan, charcoal trousers.
- Person B: short wavy dark hair, peach overshirt, cream trousers.
- Stable silhouettes, face proportions, clothing, palette, and stroke style across scenes.
- No names, prescribed pronouns, wedding symbolism, or private references.
- Copy is generic; the illustration depicts one pair. Additional visual representation requires separately approved character variants.

Required deliverables:

- Model sheet: front/three-quarter views and seated profiles.
- Poses: standing, shy glance, walking, offered flower, handholding, embrace, seated lean.
- Separate groups for head, eyes, eyelids, eyebrows, torso, arms, hands, and necessary foreground layers.
- Documented transform origins and stable group identifiers.
- Dedicated contact poses for handholding and hugging; do not fake these by rotating unrelated arms.
- Simplified paths, consistent strokes, and no embedded external dependencies.
- Static fallback pose for each chapter.

GSAP animates authored SVG layers. CSS handles layout and compositing, not primary character construction. Do not assume an arbitrary SVG is already rigged or an arbitrary Lottie exposes editable character controls.

### Background and effects

- Layered garden composition: foreground stems, characters in the middle, distant hills and sky.
- Restrained gradients and, if useful, one small static paper-texture asset.
- Desktop reveals extra scenery instead of excessively enlarging characters.
- Portrait layouts place the constellation above the pair and reserve stable caption space.
- Start with three to five interactive stars and approximately a dozen decorative moving points at most; adjust only after profiling.
- Avoid full-screen animated filters, constant camera motion, and large particle DOM trees.
- Use transforms and opacity for most motion; employ short, scoped SVG stroke drawing only where justified.

## 5. Asset sources, verification, and provenance

Source verification is not approval of a complete character set. No matching multi-pose blink/approach/handhold/hug Lottie collection has been verified.

| Source | Verified during planning | Intended use and constraints |
| --- | --- | --- |
| [ManyPixels](https://www.manypixels.co/gallery) | Gallery lists “Couple 1” in Playstroke and Colossalflat with SVG assets. Displayed license permits personal/commercial use and modification without required attribution, with restrictions on competing libraries and asset-pack redistribution. | Possible static seated vignette or adaptation source. Not a verified multi-pose rig. Inspect actual paths and do not mix illustration styles. |
| [Open Doodles](https://www.opendoodles.com/) | Downloadable SVG illustrations, including sitting, reading, and loving; site identifies collection as CC0. | Editable fallback/reference. Its sketch style is less aligned with the recommended polished storybook look. No verified complete couple sequence. |
| [LottieFiles license](https://lottiefiles.com/page/license) | Lottie Simple License allows use and modification of covered public downloadable files, including commercially, and requires those files/derivatives to retain its terms. | Optional search source only. Verify each listing, applicable license, download, compatibility, and seek behavior. Premium assets may have different terms. |

### Asset approval checklist

- [ ] Actual file is available, not merely a preview.
- [ ] Rights cover intended hosting, display, modification, and distribution as part of the website.
- [ ] Character style and identity match other scenes.
- [ ] SVG structure or animation controls support required behavior.
- [ ] Lottie file works in the installed `@lottiefiles/dotlottie-react` version.
- [ ] Seek/frame rendering and static fallback are verified where needed.
- [ ] File size and rendering cost fit mobile targets.
- [ ] No fragile production hotlinks or unexpected third-party requests.
- [ ] Required notices and attribution are retained.

### Provenance register

Record for every asset:

- Local path and title.
- Creator and source URL.
- Retrieval date and version.
- License name and saved license text/evidence.
- Allowed modifications and any relevant restrictions.
- Modifications performed.
- Attribution requirements and where fulfilled.
- Approval status.

Store permitted assets locally under `public/assets/`. Keep notices in `public/assets/licenses/` and a human-readable register in `docs/asset-register.md`. A repository's code license does not automatically clear every bundled image or recording.

## 6. Music and rights decision

### Commercial mood references

| Song | Strength | Tradeoff |
| --- | --- | --- |
| Glue Song — beabadoobee | Best match for tenderness, warmth, intimacy, and small affectionate gestures. | Vocals can compete with prose; less suited to an enormous visual climax. |
| Until I Found You — Stephen Sanchez | Nostalgic devotion and classic romantic-film atmosphere. | More overtly retro and grand than the quiet storybook direction. |
| golden hour — JVKE | Dreamlike lift and strong inspiration for the constellation reveal. | Scale can overwhelm the intimate encounter and confession. |

Use *Glue Song* as an emotional reference, with a restrained instrumental lift—not an imitation of these compositions.

### Recommended public-release route

Choose a cleared instrumental featuring acoustic guitar or felt piano, subtle strings, and a natural closing cadence. Display original romantic prose rather than copyrighted lyrics.

Options:

1. **Commission an original short score.** Obtain explicit rights for website hosting, synchronization, delivered formats, and permitted edits. Best creative control.
2. **Select a vetted stock instrumental.** [Pixabay Music](https://pixabay.com/music/) is a candidate source. Its [license summary](https://pixabay.com/service/license-summary/) permits use/adaptation subject to restrictions, including no standalone redistribution. Inspect the selected recording and full terms, retain evidence, and use it as part of the creative experience rather than a downloadable music offering.
3. **User-supplied licensed commercial recording.** Proceed only with appropriate recording/composition permissions and, if applicable, permission to display supplied lyrics.

No specific safe-to-host track is approved yet. A source's license page does not establish clearance for an unexamined recording. A purchased song download or streaming subscription is not sufficient permission for public website synchronization or lyric display.

Do not download, redistribute, transcribe, or paste commercial recordings or lyrics without appropriate rights. Do not use Spotify or YouTube as the canonical synchronization clock.

### Required timing inputs

- Exact approved file, format, version, and identifier/checksum.
- Decoded duration and any leading silence.
- Audible opening, phrase boundaries, musical lift, peak, release, and ending.
- Chapter start/end times in seconds.
- Prose cue start/end times with readable dwell durations.
- Animation beats: glance, approach, contact, hug, constellation completion, note reveal.
- If authorized lyrics are selected: approved text and calibrated phrase/word timing data.
- Permission for any trim, fade, or alternate edit.

Timing must be based on waveform inspection and listening to the actual delivery file. BPM alone is insufficient. Replacing or re-encoding the recording requires verifying cue calibration again.

## 7. UX and responsive behavior

### Layout

- Support widths from 320px upward.
- Use fluid stage dimensions and art-directed portrait/desktop compositions.
- Respect safe-area insets and mobile browser chrome.
- Avoid a rigid viewport layout that clips text on short screens; permit scrolling when needed.
- Keep captions separate from busy illustration regions.
- Reserve image and caption dimensions to prevent layout jumps.
- Desktop framing should feel like a storybook stage, not a dashboard.

### Controls

- Invitation: Open Our Story, sound preference, motion preference, reading alternative.
- During playback: Pause/Resume, Sound On/Off, next chapter, accessible chapter navigation.
- Afterglow: Replay and optional hidden-note exploration.
- Volume slider where supported; iOS may require system volume adjustment.
- Accessible real buttons, visible focus, descriptive names, and generous touch targets.
- Optional notes use accessible dialogs or panels with focus management.
- Opening a reading panel pauses audio; closing does not resume unexpectedly.
- Do not require drag gestures, hover, precise taps, or discovered hotspots.

### Silent/manual mode

Provide an explicit manual reading mode when sound is unwanted or fails. Visitors advance chapters themselves; this is not an independent fake soundtrack clock. The full story remains available as semantic text with static illustrations.

## 8. Architecture

### Technology policy

- React + TypeScript + Vite using the project's installed APIs.
- GSAP for scoped scene interpolation.
- Tailwind v4 and limited authored CSS for responsive composition and tokens.
- Lucide icons only where useful, with accessible labels.
- Lottie only if an approved asset materially benefits the result; installation does not require usage.
- Reducer/controller state; no global state library necessary.

### Component tree

```text
App
└─ StoryExperience
   ├─ AudioHost — one persistent HTMLAudioElement
   ├─ Invitation
   ├─ ReadinessOverlay
   ├─ SceneStage
   │  ├─ EncounterScene
   │  ├─ LittleThingsScene
   │  ├─ ConstellationScene
   │  ├─ ConfessionScene
   │  └─ AfterglowScene
   ├─ CaptionLayer
   ├─ StoryControls
   ├─ LoveNoteDialog
   ├─ AccessibleStoryView
   └─ PlaybackRecovery
```

### Separation of responsibilities

- **Audio controller:** media commands, playback intent, media events, recovery, and one audio element.
- **Clock:** reads audio time and reconciles visual state.
- **Pure resolver:** maps any timestamp to chapter, caption, pose, and interpolation position.
- **Scene timelines:** paused, deterministic GSAP timelines positioned by the clock.
- **Content:** original prose, chapter metadata, typed cues, and track identity.
- **React UI:** controls, semantic text, dialogs, loading/error states, and chapter mounting.
- **Decorative animation:** isolated, nonessential loops that never govern narrative state.

## 9. State model

```text
invitation → loading/ready → starting → playing
                                      ↕
                              paused / buffering
                                      ↓
                                  completed

failure → recovery → retry or silent/manual reading mode
```

Keep playback intent separate from observed media state. A late `playing` event must not override a visitor's subsequent pause. Account for seeking, chapter readiness, and visibility without turning every flag into an unrelated global state.

### State expectations

| State | Visible result | Clock behavior |
| --- | --- | --- |
| Invitation | Letter and controls | No soundtrack-driven narrative progression |
| Loading/ready | Beautiful readiness status, no generic spinner dependency | Do not advance essential visuals |
| Starting | Play request pending | Wait for successful request and confirmed playback |
| Playing | Current scene and caption | Resolve from audio time |
| Paused | Frozen current story moment | Render current time; no independent progression |
| Buffering | Preserved scene and gentle status | Remain tied to actual audio time |
| Completed | Persistent afterglow and replay | Final tableau |
| Recovery | Retry and silent/manual alternative | No silent runaway timeline |

## 10. Audio startup and reliability

Audible autoplay is restricted by browsers. Network and buffering behavior cannot be guaranteed. The reliable product promise is: **music-dependent visuals do not knowingly run ahead of the soundtrack.**

1. Attach approved local audio with `preload="auto"` while the invitation is visible.
2. Treat preload as a hint; mobile browsers may defer fetching.
3. Observe `loadedmetadata`, `canplay`, and `canplaythrough`, but do not equate readiness with guaranteed uninterrupted playback.
4. Ensure essential first-scene artwork is ready before its cinematic reveal.
5. Invoke `audio.play()` directly inside the Open button gesture before asynchronous work can lose user activation.
6. Await the play promise and confirm actual playback via media state/`playing`.
7. Keep the letter/readiness presentation visible while starting.
8. On rejection, offer a new explicit sound-start gesture and silent/manual reading.
9. Do not automatically loop the track or create multiple audio elements on rerender.

### Event handling

| Event or action | Behavior |
| --- | --- |
| `playing` | Reconcile from current time; honor latest visitor intent |
| `waiting` | Preserve the current scene; show “Holding this little moment…” |
| `stalled` | Network warning, not automatic proof playback stopped; buffered audio may continue |
| `pause` | Freeze essential motion at actual time |
| `seeking` / `seeked` | Resolve destination state; do not retain stale cues or depend on earlier callbacks |
| `timeupdate` | Reconcile UI, including when frame loops are not active |
| `ended` | Enter completed and retain afterglow |
| `error` | Offer retry and a non-audio path; no dead end |
| Hidden tab | Default to pause; return paused with Resume and reconcile actual time |
| Replay | Pause, reset time to zero, clear dialogs/discoveries, resolve opening state, then request play from replay gesture |

If a later scene is not ready, use its prepared static fallback or pause with recovery rather than showing an empty stage. Prefetching should make this unusual.

## 11. Synchronization and animation ownership

### Master-clock rules

- `HTMLAudioElement.currentTime` is the source of truth.
- Do not build an independent narrative sequence with `setTimeout` or a free-running GSAP timeline.
- Read time using a lightweight `requestAnimationFrame` loop while actively playing.
- Also reconcile on media events and immediately after seek, pause, resume, or visibility changes.
- Resolve cue membership using start-inclusive/end-exclusive intervals.
- Update React only when meaningful state changes, not every animation frame.
- Position paused GSAP timelines using audio-relative local time.
- Apply the correct state directly after skipped/dropped frames; do not try to replay missed narrative callbacks.

### Deterministic rendering

Every essential scene must be renderable at an arbitrary timestamp without earlier callbacks having fired. This includes character pose, constellation completion, captions, note visibility, and transition state.

- Use explicit initial values rather than relying on whatever styles a previous scene left behind.
- Suppress GSAP callbacks when seeking timelines where appropriate.
- Make caption selection a pure lookup, not a sequence of delayed reveal events.
- Bound scene transitions by cue time so they can be restored after a seek.
- Keep decorative breathing, twinkle, or blink loops separate from essential beats.
- Reduced-motion mode uses the same chapter/caption state with static or minimal transitions.

### Lottie policy

- Verify installed player APIs and actual asset behavior first.
- Essential Lottie beats require supported frame seeking and authored segment/frame mapping.
- Do not free-run a character animation and hope it remains aligned with audio.
- Do not assume internal layers or rig controls are available.
- Provide a static fallback for incompatibility or rendering failure.
- Keep player/WASM resources local if required to avoid unnecessary third-party runtime requests.

### Cleanup

- Scope animations with `gsap.context()` and revert on cleanup.
- Remove media and visibility listeners.
- Cancel frame loops and stop decorative timelines.
- Destroy Lottie instances/resources when no longer needed.
- Avoid duplicate audio, effects, and listeners under React Strict Mode.
- Cancel or disregard outdated async playback/loading responses.

## 12. Typed cue contract

The following is a proposed design contract, not implemented application code. No numeric cue data is invented during planning.

```ts
type SceneId =
  | "encounter"
  | "little-things"
  | "constellation"
  | "confession"
  | "afterglow";

type AnimationId =
  | "shy-glance"
  | "approach"
  | "hold-hands"
  | "embrace"
  | "constellation"
  | "note-reveal";

interface StoryCue {
  id: string;
  start: number; // seconds in the exact approved recording
  end: number;   // exclusive
  sceneId: SceneId;
  text: string;
  animationId?: AnimationId;
}

interface Chapter {
  sceneId: SceneId;
  start: number;
  end: number;
}

interface TrackDefinition {
  src: string;
  assetVersion: string;
  expectedDuration: number;
  chapters: readonly Chapter[];
  cues: readonly StoryCue[];
}
```

Keep track, chapter, and cue metadata in one configuration file. Validate finite values, ordering, valid identifiers, duration bounds, deliberate gaps, and unwanted overlaps. Define the end-of-track state explicitly because the final interval is end-exclusive.

## 13. Proposed folder structure

Apply within the existing application after its location and structure are confirmed; adapt to existing conventions rather than overwriting user work.

```text
little-universe-for-two/
├─ src/
│  ├─ components/
│  │  ├─ Invitation.tsx
│  │  ├─ SceneStage.tsx
│  │  ├─ CaptionLayer.tsx
│  │  ├─ StoryControls.tsx
│  │  ├─ LoveNoteDialog.tsx
│  │  └─ PlaybackRecovery.tsx
│  ├─ scenes/
│  │  ├─ EncounterScene.tsx
│  │  ├─ LittleThingsScene.tsx
│  │  ├─ ConstellationScene.tsx
│  │  ├─ ConfessionScene.tsx
│  │  └─ AfterglowScene.tsx
│  ├─ hooks/
│  │  ├─ useAudioController.ts
│  │  ├─ useAudioClock.ts
│  │  └─ useReducedMotion.ts
│  ├─ lib/
│  │  ├─ resolveStoryTime.ts
│  │  └─ sceneTimelines.ts
│  ├─ content/
│  │  ├─ story.ts
│  │  └─ cueSheet.ts
│  ├─ types/
│  ├─ styles/
│  ├─ App.tsx
│  └─ main.tsx
├─ public/assets/
│  ├─ characters/
│  ├─ backgrounds/
│  ├─ animations/
│  ├─ music/
│  ├─ fonts/
│  └─ licenses/
└─ docs/
   ├─ asset-register.md
   └─ timing-qa.md
```

## 14. Implementation milestones and acceptance criteria

### Milestone 0 — Confirm inputs

- [ ] Locate and inspect the existing project and applicable instructions.
- [ ] Confirm installed versions without reinstalling dependencies.
- [ ] Review existing user files before modifying anything.
- [ ] Approve title, copy, palette, and character route.
- [ ] Select a rights-cleared audio recording and record its identity.
- [ ] Approve the character model sheet and required pose list.
- [ ] Confirm deployment target/base path.

**Acceptance:** No ambiguity about project location, approved creative direction, or rights needed for the first implementation phase. Music-dependent calibration remains blocked until the actual recording is available.

### Milestone 1 — Invitation and visual foundation

- Configure Tailwind v4 Vite plugin/import if absent, using installed APIs.
- Establish palette, typography, responsive stage, and safe-area behavior.
- Build the invitation with real controls, first-scene readiness, and reduced motion.

**Acceptance:** Approved first frame at 320px, portrait mobile, and desktop; visible keyboard focus; no layout jump; no generic system alert; no unlicensed/hotlinked production assets.

### Milestone 2 — Audio controller and deterministic clock

- Implement one persistent audio element and centralized controller.
- Implement pure chapter/caption resolution and typed cue validation.
- Add startup, pause, buffering, seek, replay, visibility, error, and silent/manual behavior.
- Add development timing diagnostics.

**Acceptance:** Actual approved audio controls placeholder/static scene states correctly through all lifecycle events. Playback rejection is recoverable. Seeking never depends on earlier callbacks.

### Milestone 3 — Encounter

- Integrate approved character artwork and garden layers.
- Animate blink, shy glance, flower offer, and approach.
- Calibrate the opening scene against the recording.

**Acceptance:** Character identity is consistent; animation is tasteful; direct seeking restores correct poses; reduced-motion rendering is complete.

### Milestone 4 — Little Things

- Build three cohesive memory-book vignettes.
- Add optional accessible star discoveries and note panels.
- Calibrate prose dwell times and transitions.

**Acceptance:** Copy is readable on narrow phones; discoveries are not required; reading panels pause without unexpected resume; keyboard and touch paths work.

### Milestone 5 — Peak and confession

- Integrate purpose-drawn contact/embrace poses.
- Connect constellation formation to verified musical landmarks.
- Reveal the confession and exact requested final sentence.

**Acceptance:** Peak matches the selected audio landmarks; the constellation is restrained; final copy has sufficient reading time; seeking into the middle produces correct state.

### Milestone 6 — Afterglow and polish

- Add final persistent tableau, replay, sound control, and note exploration.
- Refine scene transitions and mobile/desktop framing.
- Complete semantic reading and motion alternatives.

**Acceptance:** Replay resets audio and visuals together; no surprise looping; all essential content works without sound or motion; final controls remain accessible.

### Milestone 7 — Release verification

- Run available build/type/lint checks.
- Test the running production build and deployed asset paths.
- Complete performance, accessibility, and browser checks.
- Finalize rights register and known limitations.

**Acceptance:** No known blocking console/runtime errors, audio dead ends, inaccessible essential interactions, or unapproved asset usage. Document platforms not actually tested. Additional test packages require approval.

## 15. Performance checklist

- [ ] Invitation renders without waiting for soundtrack download.
- [ ] Essential first-scene art is preloaded.
- [ ] Next-scene assets are fetched ahead of their boundaries, not at the cue itself.
- [ ] Limit simultaneously mounted scenes while preserving deterministic transitions.
- [ ] Compress SVGs without destroying rig identifiers.
- [ ] Lazy-load Lottie only if an approved asset needs it.
- [ ] Avoid full-screen animated filters and excessive SVG/DOM complexity.
- [ ] Prefer transforms/opacity; profile any stroke drawing or masks.
- [ ] Avoid per-frame React rerenders.
- [ ] Verify layout stability, text loading, and illustration aspect ratios.
- [ ] Profile frame times and memory on a lower-powered mobile device.
- [ ] Make asset URLs safe for the configured Vite deployment base.
- [ ] Verify audio MIME types, caching, and byte-range behavior on the actual host.
- [ ] Inspect network requests for unwanted third-party calls.

Target smooth 60fps-friendly motion where the device permits, not a blanket performance guarantee. Set final byte budgets after actual art/audio assets have been measured.

## 16. Accessibility checklist

- [ ] Real semantic controls with descriptive labels and visible focus.
- [ ] Persistent pause, sound, and chapter navigation.
- [ ] Keyboard access to every essential interaction.
- [ ] Generous touch targets and no hover-only content.
- [ ] Support 320px width, safe-area insets, short landscapes, and 200% zoom.
- [ ] Caption contrast verified over every scene.
- [ ] Essential text remains semantic and selectable where practical.
- [ ] Full reading view is available independently of animation.
- [ ] No per-letter screen-reader announcements or constant live-region chatter.
- [ ] Decorative SVGs are hidden from assistive technology.
- [ ] Meaningful illustrations have concise descriptions without duplicating captions unnecessarily.
- [ ] Dialog focus is trapped appropriately and restored on close.
- [ ] Reduced motion removes drift, parallax, and animated drawing without losing story meaning.
- [ ] No forced waiting, flashing effects, or audio-only essential content.
- [ ] Mute is reliable; volume limitations are handled gracefully on iOS.
- [ ] No unexpected resume after reading a note or returning to a tab.

## 17. Browser and runtime QA

Test to the extent available, and record actual coverage:

- [ ] Chrome desktop and Android.
- [ ] Firefox desktop.
- [ ] Safari desktop.
- [ ] Real iOS Safari; desktop emulation is not an equivalent test.
- [ ] Cold cache, slow network, offline startup, and interrupted requests.
- [ ] Missing/unsupported audio and rejected `play()`.
- [ ] Open tapped before preload finishes.
- [ ] Pause at the musical peak, wait, then resume.
- [ ] Seek forward/backward across every scene and caption boundary.
- [ ] Seek/skip into an unbuffered section.
- [ ] Lock/unlock phone; background/restore tab; handle media interruption.
- [ ] Replay repeatedly without duplicate listeners, audio, or animation instances.
- [ ] Reduced motion, muted playback, and manual reading.
- [ ] Keyboard-only navigation and VoiceOver/NVDA where available.
- [ ] Orientation changes, large text, zoom, and narrow viewport.
- [ ] Production build and deployed subdirectory paths.

### Timing diagnostics

A development-only overlay should display:

- Audio `currentTime` and duration.
- Chapter and cue identifiers.
- Playback intent and observed state.
- `readyState`, buffered ranges, and seeking state.
- Target visual time and rendered scene timeline time.
- Recent media lifecycle events.

Log locally only; do not send analytics. Under CPU/network throttling, verify dropped frames reconcile immediately to current audio time instead of accumulating drift. Compare the perceived peak by listening on real devices: output latency and browser time precision prevent a universal frame-perfect audiovisual guarantee.

## 18. Key risks and tradeoffs

| Risk | Mitigation |
| --- | --- |
| Existing application is not in the inspected workspace | Obtain its path before touching application files; do not scaffold a replacement. |
| Character inconsistency or awkward hugs | Approve model sheet and contact poses before full scene animation. |
| Commercial music/lyrics rights block deployment | Use a cleared instrumental with original prose by default. |
| No actual recording means no honest cue timestamps | Lock the audio file before calibration; never invent production timing. |
| Network/autoplay restrictions cause delay | Treat readiness/recovery as designed states; never start essential visuals silently ahead of audio. |
| Optional interactions distract from emotion | Keep them peripheral and replayable after the film. |
| Cinematic presentation excludes users | Provide pause, skip, semantic reading, silent mode, and reduced motion. |
| Lottie adds weight without improving quality | Make it optional; prefer well-authored SVGs when sufficient. |
| Asset replacement invalidates cues or rig structure | Track asset versions and rerun targeted checks after replacement. |
| Overengineering delays polish | Use a reducer, one audio controller, pure time resolution, and scoped scene timelines. |

## 19. Decisions required before coding

1. **Project location:** Where is the installed `little-universe-for-two` folder?
2. **Creative approval:** Confirm title, palette, copy, and the six-scene direction.
3. **Art route:** Bespoke layered SVG characters, or approved stock adaptation with any necessary pose-scope reduction?
4. **Music route:** Commissioned score, vetted stock instrumental, or user-supplied licensed recording?
5. **Approved assets:** Who will supply/create the character sheet, poses, and exact audio file?
6. **Scope:** Confirm optional hidden notes and silent/manual reading mode.
7. **Deployment:** Confirm hosting target and whether a subdirectory base path is needed.

### Recommended baseline

**A Little Universe for Two**, bespoke layered SVG characters, a cleared acoustic/piano instrumental, original romantic prose, optional hidden notes, and deterministic audio-clock-driven GSAP scenes.

### Approval gates

- **Gate A — Plan approval:** Approve or revise this document and confirm project location.
- **Gate B — Asset approval:** Approve character model/pose scope and music rights before their production integration.
- **Gate C — Timing approval:** Calibrate and approve cue sheet against the exact recording before synchronized scene polish.
- **Gate D — Release approval:** Review final browser coverage, rights register, and remaining limitations before public deployment.

**Current implementation notes:** Existing Vite/React/TypeScript starter confirmed in this directory. User authorized implementation and necessary dependency installation. Tailwind v4 and its Vite plugin are installed; other animation packages are deferred until needed. Invitation and silent manual reading preview implemented; decorative eyebrow labels removed per user direction. M2 adds a persistent audio host/controller, typed/validated cues, deterministic timestamp resolution, playback/recovery controls, and development diagnostics. Eight resolver tests plus Chromium synthetic-audio lifecycle checks cover the foundation (see `docs/timing-qa.md`). No approved track is configured, so production remains in manual mode. System font fallbacks are in use pending licensed font files. Music, character poses, deployment target, and synchronized timing remain unapproved. Do not mark recording-dependent M2 acceptance complete until an approved file and calibrated cue sheet have been verified.
