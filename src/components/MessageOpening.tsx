import { useEffect, useRef, useState } from 'react'

const draft = 'Hey, my love.\n\nYou’re my favorite person.\nMy soft place to land.\n\nI wanted to say I love you…\nbut a text wasn’t enough.'
const typingSpeed = 52
const typingDuration = draft.length * typingSpeed
const readingPause = 2400
const exitDuration = 350

export function MessageOpening({ motion, onContinue }: { motion: boolean; onContinue: () => void }) {
  const [length, setLength] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const elapsed = useRef(0)
  const continueRef = useRef(onContinue)
  useEffect(() => { continueRef.current = onContinue }, [onContinue])

  useEffect(() => {
    let frame = 0
    let previous: number | undefined
    let previousLength = -1
    let exiting = false
    const tick = (now: number) => {
      if (!document.hidden && previous !== undefined) elapsed.current += Math.min(now - previous, 64)
      previous = now
      const count = motion ? Math.min(draft.length, Math.floor(elapsed.current / typingSpeed)) : draft.length
      if (count !== previousLength) { setLength(count); previousLength = count }
      // Reduced-motion visitors advance at their own pace, with the complete draft.
      if (!motion) { setLeaving(false); return }
      if (elapsed.current >= typingDuration + readingPause && !exiting) { setLeaving(true); exiting = true }
      if (elapsed.current >= typingDuration + readingPause + exitDuration) continueRef.current()
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [motion])

  return <section className="message-opening unsent-opening" data-leaving={leaving} aria-labelledby="message-title">
    <h1 id="message-title" className="sr-only">A message I almost sent</h1>
    <div className="unsent-composer">
      <div className="draft-recipient"><span className="recipient-avatar" aria-hidden="true">♡</span><strong className="recipient-name">My Love <span role="img" aria-label="heart">❤️</span></strong></div>
      <p className="sr-only">Unsent draft: {draft}</p>
      <div className="draft-text" aria-hidden="true">{draft.slice(0, length)}<span className="typing-caret" /></div>
    </div>
    {!motion && <button className="primary-button reduced-continue" onClick={onContinue}>There’s something more →</button>}
  </section>
}

export function SpecialReveal({ onOpen }: { onOpen: () => void }) {
  const [special, setSpecial] = useState(false)
  const callback = useRef(onOpen)
  useEffect(() => { callback.current = onOpen }, [onOpen])
  useEffect(() => {
    let frame = 0
    let elapsed = 0
    let previous: number | undefined
    const tick = (now: number) => {
      if (!document.hidden && previous !== undefined) elapsed += Math.min(now - previous, 80)
      previous = now
      if (elapsed >= 1900) setSpecial(true)
      if (elapsed >= 5300) callback.current()
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <section className="special-reveal" aria-labelledby="special-title">
    <h1 id="special-title" className={special ? 'special-message' : 'wait-message'} key={String(special)}>{special ? <>Here is something<br /><em>special for you.</em></> : <>So<span className="wait-dots">…</span></>}</h1>
  </section>
}
