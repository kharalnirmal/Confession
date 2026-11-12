# Current playback architecture

## Entry points

`src/App.tsx` owns the page sequence: `welcome` → `draft` → `reveal` → `story`.
The story's completion state selects `EndingSequence`. The welcome choice starts
optional background music; silence follows the same visual flow. There is no
message submission, backend, or persistent reply storage.

`MessageOpening` types a fixed draft and advances after a reading pause. Reduced
motion shows the complete draft with a manual continuation. `SpecialReveal` uses
its own visible-page clock and then opens the story automatically.

## Narrative time is not audio time

The active app uses `useStoryPlayback`, not `useAudioController`, to advance its
five chapters. Each line lasts 3.5 seconds, followed by a final two-second hold.
Chapter lengths come from `src/content/story.ts`. The hook updates React state at
line/chapter/completion boundaries and sends local chapter seconds to registered
visual renderers on animation frames.

The clock freezes while paused or while the document is hidden. Frame deltas are
capped at 80ms to avoid a large visual jump after a delayed frame. Restart resets
the clock and pause state. This is deliberate narrative pacing, not calibrated
lyric or beat synchronization.

The persistent `<audio>` in `App` loops as background music. The app pauses it when
the tab is hidden, attempts to resume it when appropriate, and fades its volume at
the ending. A rejected music start reports a quiet fallback without preventing
the visual story. Music failure does not drive chapter selection.

## Rendering

`StoryIllustration` and `SkyConstellation` subscribe to the narrative renderer
registration API. Pure helpers in `src/lib/` derive deterministic character, rain,
petal, and constellation poses from local story seconds. Preserve this property:
pause, replay, and seeking should not depend on previous animation callbacks.
Reduced-motion presentation is controlled through the motion preference passed
from `App` and the CSS motion rules.

## Retained controller and metadata

`useAudioController`, `resolveStoryTime`, `TimingDiagnostics`, and
`tests/audio-controller.html` retain the earlier audio-clock controller and its
synthetic browser harness. They are not the current app's narrative clock.
`src/content/cueSheet.ts` still supplies the soundtrack URL and provisional
recording metadata. Its chapter/cue intervals do not control the active story's
line timings. See [soundtrack notes](music-preview.md) before changing the asset.

## Verification boundaries

`npm test` exercises pure functions and asset contracts, not the full React flow
or native media events. `npm run build` type-checks and bundles the app. Neither
replaces browser checks for autoplay policy, tab visibility, pause/replay, or
reduced motion. [Timing QA](timing-qa.md) contains historical milestone results;
do not treat earlier controller-era results as a current release certification.
