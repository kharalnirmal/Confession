import type { TrackDefinition } from '../types/story'

// Public-release configuration remains empty until rights and timing are approved.
export const approvedTrack: TrackDefinition | null = null

// User-supplied file served by Vite from the project root ONLY during development.
// Deliberately not imported/copied into public/ or the production bundle.
// Waveform-informed preview boundaries, NOT listening-calibrated musical landmarks.
export const previewTrack: TrackDefinition | null = import.meta.env.DEV ? {
  src: `${import.meta.env.BASE_URL}${encodeURIComponent('beabadoobee - Glue Song (Official Music Video).mp3')}`,
  assetVersion: 'sha256:289a5fb3c1889a590f8a6e9489a29639c0417e2cc5b9af1c5862ffd450f30ac4',
  expectedDuration: 136.2546875,
  chapters: [
    { sceneId: 'encounter', start: 0, end: 28 },
    { sceneId: 'little-things', start: 28, end: 64 },
    { sceneId: 'constellation', start: 64, end: 100 },
    { sceneId: 'confession', start: 100, end: 126 },
    { sceneId: 'afterglow', start: 126, end: 136.2546875 },
  ],
  cues: [
    { id: 'hello', sceneId: 'encounter', start: 0, end: 9, text: 'It started with a little hello.' },
    { id: 'paths', sceneId: 'encounter', start: 9, end: 19, text: 'So many paths. Somehow, you.' },
    { id: 'warmer', sceneId: 'encounter', start: 19, end: 28, text: 'And the world felt a little warmer.' },
    { id: 'ordinary', sceneId: 'little-things', start: 28, end: 40, text: 'Ordinary days. My favorite memories.' },
    { id: 'rain', sceneId: 'little-things', start: 40, end: 52, text: 'Even the rainy ones.' },
    { id: 'quiet', sceneId: 'little-things', start: 52, end: 64, text: 'With you, quiet never feels empty.' },
    { id: 'sky', sceneId: 'constellation', start: 64, end: 76, text: 'A whole sky of possibilities.' },
    { id: 'favorite', sceneId: 'constellation', start: 76, end: 88, text: 'Still, you’re my favorite.' },
    { id: 'universe', sceneId: 'constellation', start: 88, end: 100, text: 'My little universe.' },
    { id: 'perfect', sceneId: 'confession', start: 100, end: 111, text: 'Not a perfect story.' },
    { id: 'ours', sceneId: 'confession', start: 111, end: 119, text: 'Just ours.' },
    { id: 'choose', sceneId: 'confession', start: 119, end: 126, text: "In every version of my story, I'd still choose you." },
    { id: 'stay', sceneId: 'afterglow', start: 126, end: 136.2546875, text: 'There’s room for us here.' },
  ],
} : null
