import { useId, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EmbracingPair, SeatedPair, StandingPair } from './Characters'
import { BotanicalLeaf } from './BotanicalLeaf'
import type { ResolvedStory } from '../types/story'
import { sceneIds } from '../types/story'

interface Props {
  chapter: number
  motion: boolean
  manual: boolean
  registerRenderer: (renderer: (state: ResolvedStory) => void) => () => void
}

const stars = [[95, 80], [160, 115], [220, 25], [285, 55], [360, 28], [430, 80], [505, 65], [463, 190], [115, 210], [330, 125], [60, 148], [540, 145]]

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
        timeline.fromTo('.constellation-line', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 2.2, ease: 'none' }, 0.25)
          .fromTo('.constellation-star', { opacity: 0.1 }, { opacity: 1, stagger: 0.12, duration: 0.2 }, 0.2)
      } else if (chapter === 3) {
        timeline.fromTo('.embrace', { x: 8 }, { x: 0, duration: 0.7, ease: 'power2.out' }, 0)
          .fromTo('.hug-arms', { rotation: -4, svgOrigin: '300 260' }, { rotation: 0, duration: 0.55, ease: 'sine.out' }, 0.2)
      } else timeline.fromTo('.seated-pair', { opacity: 0.4 }, { opacity: 1, duration: 0.65 }, 0)

      const eyeGroups = gsap.utils.toArray<SVGElement>('.woman-eyes, .man-eyes', stage.current)
      const eyes = eyeGroups.map((element) => { gsap.set(element, { transformOrigin: 'center' }); return gsap.quickSetter(element, 'scaleY') })
      gsap.set('.woman-expression, .man-expression', { transformOrigin: '50% 75%' })
      const womanGlance = gsap.quickSetter('.woman-expression', 'rotation', 'deg')
      const manGlance = gsap.quickSetter('.man-expression', 'rotation', 'deg')
      const breathing = gsap.utils.toArray<SVGElement>('.person-a, .person-b, .embrace, .seated-pair', stage.current).map((element) => gsap.quickSetter(element, 'y'))
      const ambientStars = gsap.utils.toArray<SVGElement>('.ambient-star', stage.current)
      const twinkles = ambientStars.map((element) => gsap.quickSetter(element, 'opacity'))
      const rain = gsap.utils.toArray<SVGElement>('.rain-streak', stage.current)
      const umbrellaSway = chapter === 1 ? gsap.quickSetter('.umbrella-couple', 'rotation', 'deg') : null
      if (umbrellaSway) gsap.set('.umbrella-couple', { svgOrigin: '310 410' })
      const render = (state: ResolvedStory) => {
        if (state.sceneId !== sceneIds[chapter]) return
        const time = state.localTime * 1.3
        // Real seconds, not chapter-wide progress: gestures finish in ~0.5–2 seconds.
        timeline.time(Math.min(time, timeline.duration()), true)
        eyes.forEach((set, index) => {
          const phase = (time + index * 1.9) % 4.2
          set(phase < 0.14 ? Math.max(0.08, Math.abs(phase - 0.07) / 0.07) : 1)
        })
        womanGlance(Math.sin(time * .85) * .7)
        manGlance(Math.sin(time * .85 + .8) * -.6)
        breathing.forEach((set) => set(Math.sin(time * 1.5) * .55))
        twinkles.forEach((set, index) => set(0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 3.2 + index * 1.7))))
        rain.forEach((element, index) => element.setAttribute('transform', `translate(0 ${(time * 115 + index * 23) % 180 - 90})`))
        umbrellaSway?.(Math.sin(time * 1.5) * 0.65)
      }
      if (manual || !motion) timeline.progress(1, true)
      else disconnect = registerRenderer(render)
    }, stage)
    return () => { disconnect?.(); context.revert() }
  }, [chapter, motion, manual, registerRenderer])

  const night = chapter >= 2
  return <svg ref={stage} className="story-illustration" viewBox="40 0 520 450" role="img" aria-label={[
    'A man in a peach shirt gently offers a pink flower to a woman in a lavender dress.',
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
      <radialGradient id={`${id}-moon-glow`}><stop stopColor="#f8e8bf" stopOpacity=".15"/><stop offset="1" stopColor="#f8e8bf" stopOpacity="0"/></radialGradient>
      <mask id={`${id}-moon-mask`}><rect x="425" y="35" width="85" height="85" fill="white"/><circle cx="474" cy="62" r="23" fill="black"/></mask>
    </defs>
    <ellipse cx="300" cy="230" rx="245" ry="220" fill={`url(#${id}-glow)`}/>
    {night && <>
      <g className="moon"><circle cx="461" cy="76" r="53" fill={`url(#${id}-moon-glow)`}/><circle cx="461" cy="76" r="23" fill="#f6e7c4" mask={`url(#${id}-moon-mask)`}/></g>
      <g fill="#ead2a2">{stars.map(([x, y], index) => index % 4 === 0 ? <path className="ambient-star" key={index} d={`M${x} ${y - 3.5}Q${x + .6} ${y - .6} ${x + 3} ${y}Q${x + .6} ${y + .6} ${x} ${y + 3.5}Q${x - .6} ${y + .6} ${x - 3} ${y}Q${x - .6} ${y - .6} ${x} ${y - 3.5}Z`} opacity=".7"/> : <circle className="ambient-star" key={index} cx={x} cy={y} r={index % 3 === 0 ? 1.5 : .9} opacity=".7"/>)}</g>
    </>}
    <path className="scene-ground" d="M-10000 411H45Q155 375 300 402Q427 380 555 411H10000V448H-10000Z" fill={`url(#${id}-ground)`}/>
    <ellipse cx="300" cy="414" rx="125" ry="9" fill={night ? '#142238' : '#a7a58c'} opacity=".16"/>
    {chapter === 0 && <g className="garden" strokeLinecap="round">
      <path d="M102 411Q116 306 106 204L120 190Q119 307 126 411Z" fill="#9c8771"/>
      <path d="M114 286Q84 243 69 207M114 246Q148 207 162 174M111 225Q94 174 113 137" stroke="#9c8771" strokeWidth="8" fill="none"/>
      <path d="M52 231C17 213 20 172 43 157C25 126 47 92 79 96C87 61 129 57 149 85C179 71 208 101 194 128C226 153 209 189 182 192C182 226 144 244 122 227C101 251 72 249 52 231Z" fill="#a3b08d"/>
      <path d="M48 170C36 142 63 115 89 124C95 92 137 85 151 116C181 107 199 136 185 157C208 183 177 211 152 195C136 226 101 219 91 202C68 215 42 197 48 170Z" fill="#b5bf9b"/>
      <g fill="#c8cfab" opacity=".8"><ellipse cx="77" cy="145" rx="18" ry="9" transform="rotate(-30 77 145)"/><ellipse cx="132" cy="116" rx="18" ry="10" transform="rotate(25 132 116)"/><ellipse cx="165" cy="173" rx="17" ry="9" transform="rotate(-25 165 173)"/></g>
      <path d="M114 408L112 245M112 270L94 250" stroke="#c1ab8d" strokeWidth="2" fill="none"/>
      <path d="M138 423Q232 393 300 425T466 427" fill="none" stroke="#c8a66c" strokeWidth="1.3"/>
    </g>}
    {chapter === 1 && <g className="rain" stroke="#9ba8b9" strokeWidth="2" strokeLinecap="round" opacity=".65">{[[100,155],[145,220],[460,150],[495,230],[75,285],[465,320],[120,90],[490,70]].map(([x,y],index)=><path className="rain-streak" key={index} d={`M${x} ${y}l-5 18`}/>)}</g>}
    {chapter >= 2 && <g className="constellation" transform="translate(0 -30)" fill="none" stroke="#e0bd80" strokeWidth="1.6">
      <path className="constellation-line" pathLength="1" strokeDasharray="1" d="M300 170L248 130L229 94L246 67L277 70L300 95L324 70L355 67L373 94L353 130Z"/>
      {[[300,170],[248,130],[229,94],[246,67],[277,70],[300,95],[324,70],[355,67],[373,94],[353,130]].map(([x,y],index)=><circle className="constellation-star" key={index} cx={x} cy={y} r="3" fill="#f3ddb4" stroke="none"/>)}
    </g>}
    <g style={{ '--dress-fill': `url(#${id}-dress)`, '--shirt-fill': `url(#${id}-shirt)` } as React.CSSProperties}>
      {chapter <= 2 ? <StandingPair chapter={chapter}/> : chapter === 3 ? <EmbracingPair/> : <SeatedPair/>}
    </g>
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
