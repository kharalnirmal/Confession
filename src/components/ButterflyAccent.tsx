import { useId } from 'react'

export function ButterflyAccent({ side }: { side: 'left' | 'right' }) {
  const id = useId().replace(/:/g, '')
  return <span className={`welcome-butterfly welcome-butterfly-${side}`} aria-hidden="true">
    <svg viewBox="0 0 120 100" fill="none" focusable="false">
      <defs>
        <linearGradient id={`${id}-wing`} x1="20" y1="15" x2="86" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e9c9d9"/><stop offset=".55" stopColor="#c99fbd"/><stop offset="1" stopColor="#a394ba"/>
        </linearGradient>
      </defs>
      <g className="butterfly-wing butterfly-wing-left" fill={`url(#${id}-wing)`} stroke="#a681a0" strokeWidth=".8">
        <path d="M59 53C44 19 17 9 13 27C9 44 29 57 54 58C31 54 21 68 31 79C42 91 56 72 59 53Z"/>
        <path d="M55 51Q34 31 22 29M53 62Q40 67 36 75" stroke="#fff7f0" strokeOpacity=".65"/>
        <circle cx="22" cy="35" r="2" fill="#fff5e9" stroke="none"/>
      </g>
      <g className="butterfly-wing butterfly-wing-right" fill={`url(#${id}-wing)`} stroke="#a681a0" strokeWidth=".8">
        <path d="M61 53C76 19 103 9 107 27C111 44 91 57 66 58C89 54 99 68 89 79C78 91 64 72 61 53Z"/>
        <path d="M65 51Q86 31 98 29M67 62Q80 67 84 75" stroke="#fff7f0" strokeOpacity=".65"/>
        <circle cx="98" cy="35" r="2" fill="#fff5e9" stroke="none"/>
      </g>
      <path d="M60 45Q57 56 60 70Q63 56 60 45Z" fill="#806079"/>
      <path d="M59 46Q52 35 49 38M61 46Q68 35 71 38" stroke="#806079" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  </span>
}
