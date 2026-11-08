import { useEffect, useRef, useState } from 'react'

export function EndingSequence({ onReplay }: { onReplay: () => void }) {
  const [phase, setPhase] = useState<'love' | 'leaving' | 'replay'>('love')
  const [done, setDone] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let frame = 0
    let elapsed = 0
    let previous: number | undefined
    let leaving = false
    const tick = (now: number) => {
      if (!document.hidden && previous !== undefined) elapsed += Math.min(now - previous, 80)
      previous = now
      if (elapsed >= 3200 && !leaving) { leaving = true; setPhase('leaving') }
      if (elapsed >= 3900) setPhase('replay')
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => { if (phase !== 'leaving') heading.current?.focus({ preventScroll: true }) }, [phase])

  if (phase !== 'replay') return <section className="special-reveal final-love" data-leaving={phase === 'leaving'} aria-labelledby="love-title">
    <h1 id="love-title" className="special-message" ref={heading} tabIndex={-1}>I’ll always<br /><em>love you.</em></h1>
  </section>

  return <section className="ending-panel" aria-labelledby="ending-title">
    <h1 id="ending-title" ref={heading} tabIndex={-1}>Want to <em>repeat?</em></h1>
    <div className="replay-space">{done ? <p className="personal-signoff">Always yours.</p> : <div className="ending-actions"><button className="primary-button" onClick={onReplay}>Yes</button><button className="secondary-button" onClick={() => setDone(true)}>No</button></div>}</div>
    <p className="dm-invitation">DM me what you liked most.</p>
  </section>
}
