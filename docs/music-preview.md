# Soundtrack packaging

## Production asset
- Packaged at the user's request as `public/music/glue-song.m4a`.
- AAC-LC, 64 kbps stereo, 44.1 kHz, with fast-start metadata for streaming.
- 1,109,333 bytes, approximately 48% smaller than the supplied original.
- SHA-256: `dd0b29d33d38ff745d0d5e5fc1cd523ab5a82ed4b4737b8882897af5d4d3a73d`.
- `soundtrack` in `src/content/cueSheet.ts` uses Vite's `BASE_URL` for both development and production. Vite copies the file into `dist/music/` on build. Deploy the entire `dist/` directory.
- This technical packaging does not establish permission to publicly host or synchronize the recording; the deployer must obtain the appropriate rights.

## File identity
- Supplied by the user: `beabadoobee - Glue Song (Official Music Video).mp3` (project root).
- Title/artist from filename: Glue Song — beabadoobee. Not independently verified against a publisher delivery.
- Size: 2,122,169 bytes.
- SHA-256: `289a5fb3c1889a590f8a6e9489a29639c0417e2cc5b9af1c5862ffd450f30ac4`.
- Decoded in Chromium Web Audio: 136.2546875 seconds, 48 kHz, stereo.
- Native media duration: 136.254694 seconds.
- Original retained unchanged; the deployment derivative is compressed without trimming.

## Rights boundary
This is a user-supplied commercial recording, not a cleared stock track. Hosting/synchronization permissions have not been supplied. The user requested production packaging; that is not a declaration that public deployment is permitted. The original root file remains ignored by Git.

The old development-only track guard has been removed. The same compressed file is now selected in all build modes, using a base-safe URL.

## Provisional timing
Five-second RMS waveform windows were inspected. Energy is higher through the middle, with a pronounced fade near 130 seconds. This is not a listening review, BPM/phrase analysis, or verification of a musical peak.

Preview chapter boundaries: 0 / 28 / 64 / 100 / 126 / 136.2546875 seconds. These are explicitly **provisional composition boundaries**, not approved musical landmarks. Cue text is original prose, not transcribed lyrics. Listen on actual devices and adjust before claiming synchronized musical polish.

The current application uses `useStoryPlayback` as its narrative clock and the persistent audio element as background music. The cue-sheet boundaries are retained metadata, not a claim of lyric synchronization.
