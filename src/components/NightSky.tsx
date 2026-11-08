import { useId, type CSSProperties } from 'react'

const stars = (() => {
  let seed = 731
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  const points: { x: number; y: number; size: number; brightness: number }[] = []
  for (let attempt = 0; attempt < 500 && points.length < 52; attempt++) {
    const x = 1 + random() * 98
    const y = 8 + random() * 82
    if (points.some((point) => Math.hypot((point.x - x) * 14.4, (point.y - y) * 3) < 50)) continue
    points.push({ x, y, size: 3 + random() ** 2 * 6, brightness: .45 + random() * .45 })
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
    {stars.map(({ x, y, size, brightness }, index) => <span key={index} className="sky-star" style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      '--star-opacity': brightness,
      animationDuration: `${5 + index % 7}s`, animationDelay: `${-index * 1.37}s`,
    } as CSSProperties}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.2" fill="#fff5de" />
        {index % 3 === 0 && <path d="M10 1C10.8 8.4 11.6 9.2 19 10C11.6 10.8 10.8 11.6 10 19C9.2 11.6 8.4 10.8 1 10C8.4 9.2 9.2 8.4 10 1Z" fill="#f9e7c9" opacity=".8" />}
      </svg>
    </span>)}
  </div>
}
