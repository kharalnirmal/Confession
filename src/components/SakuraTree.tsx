import { useId } from 'react'
import { sakuraPetalCount, sakuraPetalPose } from '../lib/sakura'

export function SakuraTree() {
  // Bake the static blossoms once instead of painting 3,672 SVG instances every frame.
  // Editable vector source: docs/artwork/sakura-tree.svg.
  return <image className="garden sakura-tree" aria-hidden="true"
    href={`${import.meta.env.BASE_URL}images/sakura-tree.webp`} x="0" y="-100" width="500" height="550" />
}

export function SakuraPetals() {
  const id = `fall-${useId().replace(/:/g, '')}`
  return <g aria-hidden="true" className="sakura-fall">
    <defs>
      <radialGradient id={`${id}-pink`} cx=".28" cy=".22" r=".9">
        <stop stopColor="#fff8f7"/><stop offset=".4" stopColor="#fbd7e2"/>
        <stop offset=".78" stopColor="#eca6bf"/><stop offset="1" stopColor="#ce799d"/>
      </radialGradient>
    </defs>
    {Array.from({ length: sakuraPetalCount }, (_, index) => {
      const pose = sakuraPetalPose(index, 0)
      return <g key={index} className="sakura-petal" opacity={pose.opacity} transform={`translate(${pose.x} ${pose.y}) rotate(${pose.rotation}) scale(${pose.scaleX} ${pose.scaleY})`}>
        <g transform={`scale(${.58 + index % 3 * .08})`}>
          <path d="M-.3 5.6C-1.9 3.8-5.4 1.6-4.7-2.1C-4.3-4.3-2.3-5.4-.5-4.3L.2-3.5L1.1-4.3C3.1-5.1 5.2-3.3 4.9-1.1C4.6 2 1.5 4.7-.3 5.6Z" fill={`url(#${id}-pink)`} stroke="#d58ba6" strokeWidth=".16"/>
          <path d="M-.3 4.8Q-.9 .5.2-3.1M-.5 2.6Q-2.6 .3-3.4-1.9M-.4 2.1Q2.2-.2 3.3-2" fill="none" stroke="#ca7e9f" strokeWidth=".16" opacity=".5"/>
          <path d="M-3.9-2.2Q-4.3.2-2.5 1.9" fill="none" stroke="#fff8f7" strokeWidth=".45" opacity=".8"/>
        </g>
      </g>
    })}
  </g>
}
