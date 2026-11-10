import { useId, type CSSProperties } from 'react'
import { constellationField } from '../lib/constellation'

const fireflies = (() => {
  let seed = 1927
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  return Array.from({ length: 44 }, (_, index) => ({
    // Keep the brightest insects around the garden rather than over the copy.
    x: index % 3 === 0 ? 78 + random() * 18 : 4 + random() * 49,
    y: 68 + random() * 28,
    size: 2.2 + random() * 1.8,
    brightness: .45 + random() * .45,
    driftX: 18 + random() * 42,
    driftY: 15 + random() * 35,
    duration: 17 + random() * 17,
    pulse: 4.2 + random() * 5.6,
    delay: -random() * 40,
    hue: 70 + random() * 13,
  }))
})()

export function NightSky() {
  const id = useId().replace(/:/g, '')
  return <div className="night-sky" aria-hidden="true">
    <svg className="sky-moon" viewBox="0 0 100 100">
      <defs>
        <radialGradient id={`${id}-glow`}><stop stopColor="#f8e8bf" stopOpacity=".2" /><stop offset="1" stopColor="#f8e8bf" stopOpacity="0" /></radialGradient>
        <mask id={`${id}-crescent`}><rect width="100" height="100" fill="white" /><circle cx="61" cy="36" r="24" fill="black" /></mask>
      </defs>
      <circle cx="50" cy="50" r="49" fill={`url(#${id}-glow)`} />
      <circle cx="50" cy="50" r="26" fill="#f6e7c4" mask={`url(#${id}-crescent)`} />
    </svg>
    <div className="sky-stars">
    {constellationField.map(({ x, y, radius, opacity }, index) => <span key={index} className={`sky-star${index % 9 === 0 ? ' sky-star-shimmer' : ''}`} style={{
      left: `${x}%`, top: `${y}%`, width: radius * 1.6, height: radius * 1.6,
      '--star-opacity': opacity,
      animationDuration: `${8 + index % 7}s`, animationDelay: `${-index * 1.37}s`,
    } as CSSProperties}/>)}
    </div>
    <div className="sky-fireflies">
      {fireflies.map((fly, index) => <span key={index} className="sky-firefly" style={{
        left: `${fly.x}%`, top: `${fly.y}%`,
        '--fly-size': `${fly.size}px`, '--fly-brightness': fly.brightness,
        '--fly-x': `${fly.driftX}px`, '--fly-y': `${fly.driftY}px`,
        '--fly-duration': `${fly.duration}s`, '--fly-pulse': `${fly.pulse}s`,
        '--fly-delay': `${fly.delay}s`, '--fly-hue': fly.hue,
      } as CSSProperties}><span className="firefly-light" /></span>)}
    </div>
  </div>
}
