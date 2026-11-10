import { useId, useLayoutEffect, useRef } from 'react'
import { heartStars, heartOutline, constellationTiming, constellationPose } from '../lib/constellation'
import type { ResolvedStory } from '../types/story'

interface Props {
  chapter: number
  motion: boolean
  registerRenderer: (renderer: (state: ResolvedStory) => void) => () => void
}

export function SkyConstellation({ chapter, motion, registerRenderer }: Props) {
  const sky = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, '')

  useLayoutEffect(() => {
    const line = sky.current?.querySelector<SVGPathElement>('.constellation-line')
    const aura = sky.current?.querySelector<SVGPathElement>('.constellation-aura')
    const halos = sky.current?.querySelectorAll<SVGCircleElement>('.constellation-star-halo')
    if (!line || !aura || !halos) return
    // Stroke and dash share SVG units, so resizing cannot create a wrapping gap.
    const length = line.getTotalLength()
    const { start, duration, glowDuration } = constellationTiming
    const end = start + duration + glowDuration
    let lastTime = -1
    const draw = (time: number) => {
      const current = Math.min(time, end)
      if (current === lastTime) return
      lastTime = current
      const { progress, glow } = constellationPose(current)
      line.setAttribute('opacity', progress === 0 ? '0' : '1')
      line.setAttribute('stroke-dasharray', progress === 1 ? 'none' : `${length} ${length}`)
      line.setAttribute('stroke-dashoffset', String(length * (1 - progress)))
      aura.setAttribute('opacity', String(glow * .12))
      halos.forEach((halo) => halo.setAttribute('opacity', String(glow * .55)))
    }
    draw(!motion || chapter > 2 ? end : 0)
    if (motion && chapter === 2) return registerRenderer((state) => {
      if (state.chapterIndex === 2) draw(state.localTime)
    })
  }, [chapter, motion, registerRenderer])

  // Share the characters' coordinate system so alignment scales naturally.
  return <svg ref={sky} className="sky-constellation" viewBox="40 0 520 450" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={`${id}-halo`}><stop stopColor="#fff2cd" stopOpacity=".8"/><stop offset="1" stopColor="#f5d598" stopOpacity="0"/></radialGradient>
    </defs>
    <g transform="translate(0 -26)">
    <path className="constellation-aura" d={heartOutline} fill="none" stroke="#f5d598" strokeWidth="4" opacity="0" strokeLinejoin="round" strokeLinecap="round"/>
    <path className="constellation-line" d={heartOutline} fill="none" stroke="#f2dbad" strokeOpacity=".8" strokeWidth="1.15" opacity="0" strokeLinejoin="round" strokeLinecap="round"/>
    {heartStars.map(([x, y], index) => <g key={index}>
      <circle className="constellation-star-halo" cx={x} cy={y} r="4" fill={`url(#${id}-halo)`} opacity="0"/>
      <circle cx={x} cy={y} r={.6 + index % 4 * .12} fill="#eee9dc" opacity={.36 + index % 5 * .06}/>
    </g>)}
    </g>
  </svg>
}
