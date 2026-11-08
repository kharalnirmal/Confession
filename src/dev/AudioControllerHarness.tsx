// Explicit development-only browser harness. Not imported by the application.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useAudioController } from '../hooks/useAudioController'
import { TimingDiagnostics } from '../components/TimingDiagnostics'
import { sceneIds } from '../types/story'
import type { TrackDefinition } from '../types/story'

function silentFixture() {
  const samples = 8000 * 5
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)
  const text = (offset: number, value: string) => [...value].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)))
  text(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); text(8, 'WAVE'); text(12, 'fmt ')
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true)
  view.setUint32(24, 8000, true); view.setUint32(28, 16000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true)
  text(36, 'data'); view.setUint32(40, samples * 2, true)
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }))
}

const track: TrackDefinition = {
  src: silentFixture(), assetVersion: 'synthetic-silent-browser-test-only', expectedDuration: 5,
  chapters: sceneIds.map((sceneId, index) => ({ sceneId, start: index, end: index + 1 })),
  cues: [{ id: 'test-opening', sceneId: 'encounter', start: 0, end: 1, text: 'Synthetic test caption' }],
}

export function Harness() {
  const { audioRef, diagnosticRef, ...controller } = useAudioController(track)
  return <main>
    <h1>Audio controller harness — synthetic silence, not a soundtrack</h1>
    <audio ref={audioRef} src={track.src} preload="auto" />
    <p id="status">{controller.status}</p><p id="scene">{controller.resolved?.sceneId}</p>
    <p id="error">{controller.error}</p><p id="started">{String(controller.hasStarted)}</p>
    <button id="play" onClick={() => controller.play()}>Play</button>
    <button id="pause" onClick={controller.pause}>Pause</button>
    <button id="replay" onClick={() => controller.play(true)}>Replay</button>
    <button id="forward" onClick={() => controller.seekChapter(3)}>Seek confession</button>
    <button id="back" onClick={() => controller.seekChapter(0)}>Seek opening</button>
    <button id="mute" onClick={controller.toggleMute}>Toggle sound</button>
    <button id="volume" onClick={() => controller.changeVolume(0.3)}>Set volume</button>
    <TimingDiagnostics source={diagnosticRef} />
  </main>
}

if (import.meta.env.DEV) createRoot(document.getElementById('root')!).render(<StrictMode><Harness /></StrictMode>)
