import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type { AudioDiagnostics } from '../hooks/useAudioController'

export function TimingDiagnostics({ source }: { source: RefObject<AudioDiagnostics> }) {
  const [snapshot, setSnapshot] = useState(source.current)
  useEffect(() => {
    const timer = window.setInterval(() => setSnapshot({ ...source.current, events: [...source.current.events] }), 250)
    return () => window.clearInterval(timer)
  }, [source])
  return <details className="timing-diagnostics"><summary>Timing diagnostics</summary><pre>{JSON.stringify(snapshot, null, 2)}</pre></details>
}
