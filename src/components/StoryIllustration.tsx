import { useId, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EmbracingPair, SeatedPair, StandingPair } from './Characters'
import { BotanicalLeaf } from './BotanicalLeaf'
import { SakuraTree, SakuraPetals } from './SakuraTree'
import { sakuraPetalPose } from '../lib/sakura'
import type { ResolvedStory } from '../types/story'
import { sceneIds } from '../types/story'

interface Props {
  chapter: number
  motion: boolean
  manual: boolean
  registerRenderer: (renderer: (state: ResolvedStory) => void) => () => void
}

const heartVertices = [[300, 188], [253, 155], [211, 117], [193, 80], [205, 45], [237, 30], [272, 39], [300, 67], [328, 39], [363, 30], [395, 45], [407, 80], [389, 117], [347, 155]]
  .map(([x, y]) => [300 + (x - 300) * .68, y * .68 - 8])
const heartStars = heartVertices.flatMap((point, index) => {
  const next = heartVertices[(index + 1) % heartVertices.length]
  return [point, [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2]]
})
const heartOutline = `${heartStars.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join('')}Z`
const surroundingStars = (() => {
  let seed = 947
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  const points: number[][] = []
  for (let attempt = 0; attempt < 300 && points.length < 27; attempt++) {
    const point = [65 + random() * 470, 8 + random() * 126]
    if ([...heartStars, ...points].some(([x, y]) => Math.hypot(x - point[0], y - point[1]) < 17)) continue
    points.push(point)
  }
  return points
})()

export function StoryIllustration({ chapter, motion, manual, registerRenderer }: Props) {
  const stage = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, '')
  useLayoutEffect(() => {
    let disconnect: (() => void) | undefined
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })
      if (chapter === 0) {
        timeline.fromTo('.person-a', { x: -26 }, { x: 0, duration: 1.1, ease: 'sine.inOut' }, 0)
          .fromTo('.person-b', { x: 26 }, { x: 0, duration: 1.1, ease: 'sine.inOut' }, 0.1)
          .fromTo('.giving-arm', { rotation: -22, svgOrigin: '326 232' }, { rotation: 0, duration: .8, ease: 'sine.inOut' }, .8)
          .fromTo('.receiving-arm', { rotation: 10, svgOrigin: '278 245' }, { rotation: 0, duration: .7, ease: 'sine.inOut' }, 1.1)
      } else if (chapter === 1) {
        // Couple, shaft, canopy, and gripping hand move as ONE rig. Contact cannot drift.
        timeline.fromTo('.umbrella-couple', { x: 24 }, { x: 0, duration: 0.9, ease: 'power2.out' }, 0)
      } else if (chapter === 2) {
        // Stars stay in place; the line visits their exact coordinates in order.
        timeline.fromTo('.constellation-line', { attr: { 'stroke-dashoffset': 1 }, opacity: 0 }, {
          attr: { 'stroke-dashoffset': 0 }, opacity: 1, duration: 9, ease: 'none',
        }, 1.8)
      } else if (chapter === 3) {
        timeline.fromTo('.embrace', { x: 8 }, { x: 0, duration: 0.7, ease: 'power2.out' }, 0)
          .fromTo('.hug-arms', { rotation: -4, svgOrigin: '300 260' }, { rotation: 0, duration: 0.55, ease: 'sine.out' }, 0.2)
      } else timeline.fromTo('.seated-pair', { opacity: 0.4 }, { opacity: 1, duration: 0.65 }, 0)

      const eyeGroups = gsap.utils.toArray<SVGElement>('.woman-eyes, .man-eyes', stage.current)
      const eyes = eyeGroups.map((element) => {
        gsap.set(element, { transformOrigin: 'center' })
        return { set: gsap.quickSetter(element, 'scaleY'), scale: 1 }
      })
      gsap.set('.woman-expression, .man-expression', { transformOrigin: '50% 75%' })
      const womanGlance = gsap.quickSetter('.woman-expression', 'rotation', 'deg')
      const manGlance = gsap.quickSetter('.man-expression', 'rotation', 'deg')
      const breathing = gsap.utils.toArray<SVGElement>('.person-a, .person-b, .embrace, .seated-pair', stage.current).map((element) => gsap.quickSetter(element, 'y'))
      const rain = gsap.utils.toArray<SVGElement>('.rain-streak', stage.current)
      const petals = gsap.utils.toArray<SVGElement>('.sakura-petal', stage.current)
      const umbrellaSway = chapter === 1 ? gsap.quickSetter('.umbrella-couple', 'rotation', 'deg') : null
      if (umbrellaSway) gsap.set('.umbrella-couple', { svgOrigin: '310 410' })
      let lastTimelineTime = -1
      const render = (state: ResolvedStory) => {
        if (state.sceneId !== sceneIds[chapter]) return
        const time = state.localTime * 1.3
        // Real seconds, not chapter-wide progress: gestures finish in ~0.5–2 seconds.
        const timelineTime = Math.min(time, timeline.duration())
        if (timelineTime !== lastTimelineTime) {
          timeline.time(timelineTime, true)
          lastTimelineTime = timelineTime
        }
        eyes.forEach((eye, index) => {
          const phase = (time + index * 1.9) % 4.2
          const scale = phase < 0.14 ? Math.max(0.08, Math.abs(phase - 0.07) / 0.07) : 1
          if (scale !== eye.scale) { eye.set(scale); eye.scale = scale }
        })
        womanGlance(Math.sin(time * .85) * .7)
        manGlance(Math.sin(time * .85 + .8) * -.6)
        breathing.forEach((set) => set(Math.sin(time * 1.5) * .55))
        rain.forEach((element, index) => element.setAttribute('transform', `translate(0 ${(time * 115 + index * 23) % 180 - 90})`))
        umbrellaSway?.(Math.sin(time * 1.5) * 0.65)
        petals.forEach((element, index) => {
          const pose = sakuraPetalPose(index, state.localTime)
          element.setAttribute('transform', `translate(${pose.x} ${pose.y}) rotate(${pose.rotation}) scale(${pose.scaleX} ${pose.scaleY})`)
          element.setAttribute('opacity', String(pose.opacity))
        })
      }
      if (manual || !motion) timeline.progress(1, true)
      else disconnect = registerRenderer(render)
    }, stage)
    return () => { disconnect?.(); context.revert() }
  }, [chapter, motion, manual, registerRenderer])

  const night = chapter >= 2
  return <svg ref={stage} className="story-illustration" viewBox="40 0 520 450" role="img" aria-label={[
    'Beneath a detailed pink sakura tree, a man offers a flower to a woman as cherry blossom petals drift over the couple.',
    'The man grips an umbrella shaft with his left hand, sheltering himself and the woman beside him.',
    'The woman and man hold hands under a bright heart-shaped constellation.',
    'The woman and man lean into a close embrace, arms wrapped around each other.',
    'The couple sit close together on a garden bench, feet on the ground and hands resting together in their laps.',
  ][chapter]}>
    <defs>
      <linearGradient id={`${id}-dress`}><stop stopColor="#bba3c3"/><stop offset=".55" stopColor="#a88eae"/><stop offset="1" stopColor="#887098"/></linearGradient>
      <linearGradient id={`${id}-shirt`}><stop stopColor="#ecc0a0"/><stop offset=".6" stopColor="#dda180"/><stop offset="1" stopColor="#bd8069"/></linearGradient>
      <radialGradient id={`${id}-glow`}><stop stopColor={night ? '#657096' : '#e7d4de'} stopOpacity=".4"/><stop offset="1" stopColor={night ? '#283650' : '#fff8ef'} stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-ground`} x2="0" y2="1"><stop stopColor={night ? '#4d5870' : '#c5c6aa'} stopOpacity=".5"/><stop offset="1" stopColor={night ? '#283650' : '#fff8ef'} stopOpacity="0"/></linearGradient>
      <radialGradient id={`${id}-star-glow`}><stop stopColor="#fff7dc" stopOpacity=".75"/><stop offset=".25" stopColor="#f5d598" stopOpacity=".3"/><stop offset="1" stopColor="#f5d598" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="300" cy="230" rx="245" ry="220" fill={`url(#${id}-glow)`}/>
    {night && <g aria-hidden="true">
      {surroundingStars.map(([x, y], index) => <g key={index}>
        <circle cx={x} cy={y} r={4 + index % 4} fill={`url(#${id}-star-glow)`} opacity=".55" />
        <circle cx={x} cy={y} r={[.8, 1.3, .65, 1.6, 1][index % 5]} fill="#fff1d6" opacity={.5 + index % 4 * .12} />
        {index % 5 === 0 && <path d={`M${x - 2.5} ${y}h5M${x} ${y - 3}v6`} stroke="#fff1d6" strokeWidth=".65" strokeLinecap="round" opacity=".6" />}
      </g>)}
    </g>}
    <path className="scene-ground" d="M-10000 411H45Q155 375 300 402Q427 380 555 411H10000V448H-10000Z" fill={`url(#${id}-ground)`}/>
    <ellipse cx="300" cy="414" rx="125" ry="9" fill={night ? '#142238' : '#a7a58c'} opacity=".16"/>
    {chapter === 0 && <SakuraTree/>}
    {chapter === 1 && <g className="rain" stroke="#9ba8b9" strokeWidth="2" strokeLinecap="round" opacity=".65">{[[100,155],[145,220],[460,150],[495,230],[75,285],[465,320],[120,90],[490,70]].map(([x,y],index)=><path className="rain-streak" key={index} d={`M${x} ${y}l-5 18`}/>)}</g>}
    {chapter >= 2 && <g className="constellation" fill="none" stroke="#e0bd80" strokeWidth="1.6">
      <path className="constellation-line" pathLength="1" strokeDasharray="1" d={heartOutline} stroke="#ead0a1" strokeOpacity=".85" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {heartStars.map(([x,y],index)=><g className="constellation-star" key={index} stroke="none">
        <circle cx={x} cy={y} r={index % 2 ? 4 : 7} fill={`url(#${id}-star-glow)`}/>
        {index % 2 === 0 && <path d={`M${x} ${y - 2.8}Q${x + .5} ${y - .5} ${x + 2.4} ${y}Q${x + .5} ${y + .5} ${x} ${y + 2.8}Q${x - .5} ${y + .5} ${x - 2.4} ${y}Q${x - .5} ${y - .5} ${x} ${y - 2.8}Z`} fill="#ffe9b9"/>}
        <circle cx={x} cy={y} r={index % 2 ? .75 : 1} fill="#fffaf0"/>
      </g>)}
    </g>}
    <g style={{ '--dress-fill': `url(#${id}-dress)`, '--shirt-fill': `url(#${id}-shirt)` } as React.CSSProperties}>
      {chapter <= 2 ? <StandingPair chapter={chapter}/> : chapter === 3 ? <EmbracingPair/> : <SeatedPair/>}
    </g>
    {chapter === 0 && <SakuraPetals/>}
    <g color={night ? '#849077' : '#899775'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {[{ x: 134, y: 415, side: 'left' }, { x: 461, y: 417, side: 'right' }].map(({ x, y, side }) => <g key={side} transform={`translate(${x} ${y})`}>
        <g className={`ground-sprig ground-sprig-${side}`}>
          <path d="M0 0Q-2-19-9-33Q-12-42-15-47M0 0Q2-15 9-23Q12-28 16-31" />
          <BotanicalLeaf x={-15} y={-47} angle={-29} scale={.46} night={night} />
          <BotanicalLeaf x={16} y={-31} angle={38} scale={.45} night={night} />
          <BotanicalLeaf x={-9} y={-33} angle={-66} scale={.34} night={night} />
          <BotanicalLeaf x={9} y={-23} angle={72} scale={.32} night={night} />
        </g>
      </g>)}
    </g>
  </svg>
}
