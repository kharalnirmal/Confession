import { useId, type CSSProperties } from 'react'

const stars = (() => {
  let seed = 731
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  const points: { x: number; y: number; size: number; brightness: number }[] = []
  for (let attempt = 0; attempt < 1200 && points.length < 150; attempt++) {
    const x = 1 + random() * 98
    const y = 4 + random() * 92
    if (points.some((point) => Math.hypot((point.x - x) * 10, (point.y - y) * 5) < 23)) continue
    points.push({ x, y, size: .8 + random() ** 3 * 1.6, brightness: .25 + random() * .55 })
  }
  return points
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
    {stars.map(({ x, y, size, brightness }, index) => <span key={index} className={`sky-star${index % 9 === 0 ? ' sky-star-shimmer' : ''}`} style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      '--star-opacity': brightness,
      animationDuration: `${8 + index % 7}s`, animationDelay: `${-index * 1.37}s`,
    } as CSSProperties}/>)}
    </div>
  </div>
}
