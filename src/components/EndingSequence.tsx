import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FaGithub, FaHeart, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kharalnirmal', Icon: FaGithub },
  { label: 'Portfolio', href: 'https://nirmalkharal.dev/', Icon: FaHeart },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kharalnirmal/', Icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/nirmalkharal/', Icon: FaInstagram },
]

function SocialLinks() {
  const [active, setActive] = useState<string | null>(null)
  const footer = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!active) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo('.social-caption-label', { opacity: 0, y: reduced ? 0 : 7 }, {
        opacity: 1, y: 0, duration: reduced ? 0 : .25, ease: 'power2.out',
      })
      const path = footer.current?.querySelector<SVGPathElement>('.social-caption-trail')
      const tip = footer.current?.querySelector<SVGCircleElement>('.social-caption-pen')
      if (path && tip) {
        const length = path.getTotalLength()
        const pen = { progress: reduced ? 1 : 0 }
        const draw = () => {
          const point = path.getPointAtLength(pen.progress * length)
          path.style.strokeDashoffset = String(1 - pen.progress)
          tip.setAttribute('cx', String(point.x))
          tip.setAttribute('cy', String(point.y))
        }
        draw()
        const timeline = gsap.timeline()
        timeline.set(tip, { opacity: reduced ? 0 : 1 })
          .to(pen, { progress: 1, duration: reduced ? 0 : .85, ease: 'sine.inOut', onUpdate: draw }, 0)
          .to(tip, { opacity: 0, duration: reduced ? 0 : .2 }, reduced ? 0 : .75)
      }
    }, footer)
    return () => context.revert()
  }, [active])

  const restoreFocus = () => {
    const focused = footer.current?.querySelector<HTMLAnchorElement>('a:focus-visible')
    setActive(focused?.dataset.label ?? null)
  }

  return <footer ref={footer} className="ending-socials">
    <div className="social-caption" aria-hidden="true" data-visible={active !== null}>
      <span className="social-caption-label">{active ?? '\u00a0'}</span>
      <svg className="social-caption-art" viewBox="0 0 180 24" fill="none">
        <path className="social-caption-trail" pathLength="1" strokeDasharray="1" d="M12 16C36 18 58 9 75 14C82 16 87 20 90 21C86 17 77 11 79 6C81 0 87 1 90 6C93 1 99 0 101 6C104 13 94 18 90 21C106 16 114 11 129 12C145 13 155 9 168 10" />
        <circle className="social-caption-pen" r="1.6" cx="12" cy="16" />
      </svg>
    </div>
    <nav className="social-links" aria-label="Find Nirmal online" onMouseLeave={restoreFocus} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setActive(null)
    }}>
      {socialLinks.map(({ label, href, Icon }) => <a key={label} data-label={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} onMouseEnter={() => setActive(label)} onFocus={() => setActive(label)}>
        <Icon aria-hidden="true" focusable="false" />
      </a>)}
    </nav>
  </footer>
}

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
    <SocialLinks />
  </section>
}
