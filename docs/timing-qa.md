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
