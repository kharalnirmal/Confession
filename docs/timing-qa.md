# Milestone 1 verification

- `npm run build`: passed.
- `npm run lint`: passed.
- Chromium via agent-browser: invitation visually reviewed at 1440×1000 and 320×740.
- 320px document horizontal overflow check: none. Short/narrow pages scroll vertically as needed.
- Manual chapter navigation reaches confession (including the exact final line), afterglow, and invitation.
- Native letter dialog opens; Escape closes it and returns focus to the reading button.
- Motion toggle switches to the reduced-motion presentation.
- Browser page error log: empty during these checks.
- `npm audit --omit=dev`: zero vulnerabilities; installation reported ten moderate development-dependency vulnerabilities. No force fixes applied.

## Pending

This is an invitation and manual reading milestone, not the synchronized film. No soundtrack, audio timeline, character animation, hidden-note discoveries, or production timing is present. Fonts currently use system fallbacks. Track rights, character approval, and deployment base remain pending.

Not tested: real mobile devices, Safari, Firefox, assistive technology, automated contrast audit, 200% zoom, slow-network media behavior, or a deployed production build. No claim of release readiness.

## Milestone 2 — controller foundation

- Removed decorative uppercase eyebrow labels from invitation, chapters, letter, header, and footer.
- One persistent audio element, typed track/cue definitions, pure timestamp resolver, and cue validation implemented.
- No approved soundtrack is configured. `src/content/cueSheet.ts` deliberately exports `null`; the main application remains in manual reading mode.
- Future track source must use the Vite deployment base. Record its actual asset version/checksum and calibrate all chapter/cue boundaries before enabling it.
- Audio mode provides pause/resume, mute, volume, chapter seeking, retry, replay, letter access, and silent/manual recovery.
- `?debug` exposes development-only timing diagnostics. Sampling affects diagnostics only, never narrative progression. Future scene timelines should use the controller's diagnostic/local audio time, not stale React snapshots.
- `npm test`: eight Node built-in resolver/validation tests; no new test dependencies.

### Browser controller checks

Development harness: `/tests/audio-controller.html`. It generates a five-second silent WAV in memory with explicitly synthetic test intervals; it is not imported by the application or shipped in the production bundle.

Verified in Chromium under React Strict Mode:
- Exactly one audio element.
- Play/pause and seek to confession/back to opening.
- Native mute and volume values update.
- Track end retains afterglow; replay resets to encounter.
- Forced `NotAllowedError` enters recovery with retry guidance.
- Pending play → pause → late promise resolution/`playing` remains paused, without revealing the story.
- Simulated `waiting` preserves encounter and shows buffering.
- Hidden-document event pauses; restoring visibility does not restart playback.
- Simulated wrong-duration recording enters recovery.
- No page errors during these checks.

These are controller checks using synthetic silence/events, not approval of real-world music synchronization. Real audio, listening-based calibration, output latency, actual network stalls, mobile interruptions, deployed byte-range support, and physical devices remain unverified. M2's recording-dependent acceptance gate is still open.

## Mobile illustrated preview (supersedes the earlier no-track/no-art status)

- User requested a simpler mobile experience and supplied a recording. Local-development playback is now connected to that exact file; public-release soundtrack remains disabled.
- Five cohesive inline SVG scenes replace the generic heart placeholder. One mounted scene, one short visible caption, one compact control strip. Full chapter selection, volume, motion preference, and reading alternatives live in the options dialog.
- The MP3 uses metadata-only preload, is not duplicated/re-encoded, and is excluded from the production bundle. No Lottie, images, web fonts, particles, or additional icon package is needed.
- Paused GSAP timelines are positioned directly by the audio controller. Buffer ranges are sampled on media events, not every animation frame. React updates only at semantic cue/chapter/state changes.
- Chromium verified the actual file's native duration against configuration and validated its preview cue sheet without errors.
- Phone layouts visually checked at 390×844 and 320×568. No horizontal overflow across all five scenes at 320px.
- Direct paused seeks at 15, 46, 83, 115, 130, 83, and 0 seconds restore correct scenes/captions without earlier callbacks. Both visits to 83 seconds restore the identical partial constellation dash offset (`0.379085`).
- Reduced motion renders a complete static constellation at chapter start. Opening options pauses audio; chapter selection/closing does not resume it.
- axe-core options-dialog audit: zero violations. Initial night-scene audit found insufficient contrast in the small chapter total; opacity was increased to fix it. Gradient-backed invitation text requires manual contrast review (automated incomplete results are not a full accessibility pass).
- Timings are waveform-informed preview decisions, not listening-calibrated beat synchronization. Real-device Safari/Android, full performance profiling, screen readers, and public-deployment music rights remain open.

## Revised message opening and character animation

- User rejected the original simplified figures and slow movement. Replaced them with a more detailed woman/man pair, larger in frame, and a properly drawn umbrella grip over the shaft.
- Wordmark replaced by a heart home control. It pauses playback and resets the message opening. First-chapter back navigation now explicitly returns to messages.
- New opening: typed incoming message → editable reply + Send → typed response → large special-person reveal → explicit gesture starts the soundtrack/story. Replies remain in component memory only; nothing is stored or sent over a network. Skip/read alternatives remain available.
- Typing is outside the musical narrative and stops on unmount. Reduced motion reveals full text immediately. Character-by-character visual spans are hidden from assistive technology; semantic full messages remain available.
- Essential GSAP timelines now use local seconds, not chapter-wide normalized progress. Approach takes ~1.2 seconds, flower offer ~0.55 seconds, umbrella entrance ~0.9 seconds, constellation ~2.2 seconds, embrace ~1 second.
- Blink, small head glances, rain, star twinkle, and whole-rig umbrella sway are deterministic functions of audio time. Pausing freezes them; reduced motion/manual reading uses static completed poses.
- Chromium checked the edited-send/typed-response/reveal/start flow at 390×844, plus paused direct seeks across all chapters.
- Umbrella shaft/gripping-hand screen-coordinate drift: zero at 28.5, 31, and a repeated 31 seconds.
- Constellation dash offset: `0.659091` at 65 seconds; `0` at 67 seconds (the old chapter-wide dash-offset test above is historical, superseded by this faster animation).
- No horizontal overflow in these 390px scene checks; further narrow/landscape review follows during polish. Artwork remains subject to user visual approval.

## Opening correction — unsent draft, not a chat

- Replaced the conversation/reply flow per the user's clarification. One fixed-size, transparent message composer types a draft; its Send control remains disabled. No message is submitted or sent.
- After typing, the draft pauses briefly, fades out, and automatically reveals “I wanted to do something special. For my special person.” The soundtrack still waits for the explicit “This is for you” gesture.
- Removed chat bubbles, expanding text backgrounds, reply input, delivery ticks, and the extra “What is it?” step.
- Opening options/letter pauses the draft clock. Hidden tabs do not advance it. Reduced motion displays the full draft and offers manual Continue instead of an automatic transition.
- Chromium at 320×568 sampled the composer throughout typing from 0 to 99 characters: dimensions stayed exactly 296×366px. No chat bubbles remained, and audio stayed paused until the explicit start gesture.
- Full reduced-motion draft fits without text clipping (`clientHeight` and `scrollHeight` both 232px); no horizontal document overflow. Send remains disabled.
- Build and lint pass after this correction.
