import { useId } from 'react'

// The local origin is always the stem junction, never the leaf's bounding box.
export function BotanicalLeaf({ x, y, angle, scale = 1, night = false }: { x: number; y: number; angle: number; scale?: number; night?: boolean }) {
  const id = `leaf-${useId().replace(/:/g, '')}`
  return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <defs>
      <linearGradient id={id} x1="-12" y1="-18" x2="10" y2="-24" gradientUnits="userSpaceOnUse">
        <stop stopColor={night ? '#63765f' : '#91a17a'} />
        <stop offset=".48" stopColor={night ? '#9baa87' : '#c0cba0'} />
        <stop offset="1" stopColor={night ? '#788b6c' : '#a5b68b'} />
      </linearGradient>
    </defs>
    <g className="botanical-leaf">
      <path d="M0 0Q-1-4 0-8" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M0-7C-11-13-14-26-4-41C-2-44 0-46 1-49C3-40 13-32 10-22C9-15 4-10 0-7Z" fill={`url(#${id})`} stroke="currentColor" strokeWidth=".8" />
      <path d="M0-8C-1-21 3-32 1-46" fill="none" stroke="currentColor" strokeWidth=".75" />
      <path d="M0-15Q-6-18-8-25M0-23Q-5-27-5-34M1-19Q6-23 8-29M2-29L5-35" fill="none" stroke="currentColor" strokeWidth=".45" opacity=".42" />
      <path d="M-2-12Q-11-25-3-38" fill="none" stroke="#f0f2cf" strokeWidth=".65" opacity=".45" />
    </g>
  </g>
}
