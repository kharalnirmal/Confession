import { useId, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EmbracingPair, SeatedPair, StandingPair } from './Characters'
import { BotanicalLeaf } from './BotanicalLeaf'
import { SakuraTree, SakuraPetals } from './SakuraTree'
import { sakuraPetalPose } from '../lib/sakura'
import { characterMotion, flowerGesture } from '../lib/characterMotion'
import { rainPose, ripplePose, splashPose, umbrellaDripPose } from '../lib/rain'
import { RainGarden } from './RainGarden'
import type { ResolvedStory } from '../types/story'
import { sceneIds } from '../types/story'

interface Props {
  chapter: number
  motion: boolean
  manual: boolean
  registerRenderer: (renderer: (state: ResolvedStory) => void) => () => void
}

export function StoryIllustration({ chapter, motion, manual, registerRenderer }: Props) {
  const stage = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, '')
  useLayoutEffect(() => {
    let disconnect: (() => void) | undefined
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })
      if (chapter === 1) {
        // Couple, shaft, canopy, and gripping hand move as ONE rig. Contact cannot drift.
        timeline.fromTo('.umbrella-couple', { opacity: .7 }, { opacity: 1, duration: 1.2, ease: 'sine.inOut' }, 0)
      } else if (chapter === 3) {
        timeline.fromTo('.embrace', { opacity: .7 }, { opacity: 1, duration: 1.2, ease: 'sine.inOut' }, 0)
      } else if (chapter === 4) timeline.fromTo('.seated-figures', { opacity: .7 }, { opacity: 1, duration: 1.2, ease: 'sine.inOut' }, 0)

      const eyeGroups = gsap.utils.toArray<SVGElement>('.woman-eyes, .man-eyes', stage.current)
      const eyes = eyeGroups.map((element) => ({ element, scale: 1 }))
      const womanHead = stage.current?.querySelector('.woman-expression')
      const manHead = stage.current?.querySelector('.man-expression')
      const breathing = gsap.utils.toArray<SVGElement>('.couple-standing, .embrace, .seated-figures', stage.current)
      const givingArm = stage.current?.querySelector('.giving-arm')
      const receivingArm = stage.current?.querySelector('.receiving-arm')
      const offeredFlower = stage.current?.querySelector('.offered-flower')
      const receivedFlower = stage.current?.querySelector('.received-flower')
      const renderFlower = (time: number) => {
        const gesture = flowerGesture(time)
        // Native local pivots keep shoulders fixed under the overlaid torso.
        givingArm?.setAttribute('transform', `rotate(${gesture.givingAngle} 334 232)`)
        receivingArm?.setAttribute('transform', `rotate(${gesture.receivingAngle} 273 245)`)
        // Switch ownership only when both hands have reached the identical flower pose.
        offeredFlower?.setAttribute('opacity', gesture.received ? '0' : '1')
        receivedFlower?.setAttribute('opacity', gesture.received ? '1' : '0')
      }
      const rain = gsap.utils.toArray<SVGElement>('.rain-streak', stage.current)
      const ripples = gsap.utils.toArray<SVGEllipseElement>('.rain-ripple', stage.current)
      const splashes = gsap.utils.toArray<SVGElement>('.rain-splash', stage.current)
      const drips = gsap.utils.toArray<SVGElement>('.umbrella-drip', stage.current)
      const petals = gsap.utils.toArray<SVGElement>('.sakura-petal', stage.current)
      let lastTimelineTime = -1
      const render = (state: ResolvedStory) => {
        if (state.sceneId !== sceneIds[chapter]) return
        const time = state.localTime
        const pose = characterMotion(time)
        if (chapter === 0) renderFlower(time)
        // Real seconds, not chapter-wide progress: gestures finish in ~0.5–2 seconds.
        const timelineTime = Math.min(time, timeline.duration())
        if (timelineTime !== lastTimelineTime) {
          timeline.time(timelineTime, true)
          lastTimelineTime = timelineTime
        }
        eyes.forEach((eye, index) => {
          const scale = chapter === 3 ? 1 : index === 0 ? pose.womanBlink : pose.manBlink
          if (scale !== eye.scale) {
            eye.element.setAttribute('transform', `translate(0 35) scale(1 ${scale}) translate(0 -35)`)
            eye.scale = scale
          }
        })
        womanHead?.setAttribute('transform', `rotate(${pose.womanGlance} 0 55)`)
        manHead?.setAttribute('transform', `rotate(${pose.manGlance} 0 55)`)
        breathing.forEach((element) => element.setAttribute('transform', `translate(300 415) scale(1 ${pose.breathScale}) translate(-300 -415)`))
        rain.forEach((element, index) => {
          const drop = rainPose(index, time)
          element.setAttribute('transform', `translate(${drop.x} ${drop.y})`)
        })
        ripples.forEach((element, index) => {
          const ripple = ripplePose(Math.floor(index / 2), time, index % 2)
          element.setAttribute('rx', String(ripple.radius))
          element.setAttribute('ry', String(ripple.radius * .23))
          element.setAttribute('opacity', String(ripple.opacity))
        })
        splashes.forEach((element, index) => {
          const splash = splashPose(index, time)
          element.setAttribute('transform', `translate(0 ${-splash.height}) scale(${splash.spread} 1)`)
          element.setAttribute('opacity', String(splash.opacity))
        })
        drips.forEach((element, index) => {
          const drip = umbrellaDripPose(index, time)
          element.setAttribute('transform', `translate(${drip.x} ${drip.y})`)
          element.setAttribute('d', `M0 0v${drip.length}`)
          element.setAttribute('opacity', String(drip.opacity))
        })
        petals.forEach((element, index) => {
          const pose = sakuraPetalPose(index, state.localTime)
          element.setAttribute('transform', `translate(${pose.x} ${pose.y}) rotate(${pose.rotation}) scale(${pose.scaleX} ${pose.scaleY})`)
          element.setAttribute('opacity', String(pose.opacity))
        })
      }
      // Reset the local rig on effect reruns as well as on fresh mounts.
      eyes.forEach(({ element }) => element.removeAttribute('transform'))
      womanHead?.removeAttribute('transform')
      manHead?.removeAttribute('transform')
      breathing.forEach((element) => element.removeAttribute('transform'))
      // Clear previous gesture transforms on hot refresh; keep the original resting pose.
      stage.current?.querySelectorAll('.person-b, .giving-arm, .receiving-arm, .man-leg-back, .man-leg-front').forEach((element) => element.removeAttribute('transform'))
      if (chapter === 0) renderFlower(manual || !motion ? 4 : 0)
      if (manual || !motion) timeline.progress(1, true)
      else disconnect = registerRenderer(render)
    }, stage)
    return () => { disconnect?.(); context.revert() }
  }, [chapter, motion, manual, registerRenderer])

  const night = chapter >= 2
  return <svg ref={stage} className="story-illustration" viewBox="40 0 520 450" role="img" aria-label={[
    'Beneath a pink sakura tree, a man holds out a flower to a woman as cherry blossom petals drift around them.',
    'The couple shelter beneath an umbrella as rain drips from its edges into reflective puddles with soft ripples and tiny splashes.',
    'The woman and man hold hands in the warm light of a garden lamp beneath a heart-shaped constellation.',
    'Beside the same glowing garden lamp, the woman and man lean into a close embrace, arms wrapped around each other.',
    'The couple sit close together on a garden bench in warm lamplight, feet on the ground and hands resting together in their laps.',
  ][chapter]}>
    <defs>
      <linearGradient id={`${id}-dress`}><stop stopColor="#bba3c3"/><stop offset=".55" stopColor="#a88eae"/><stop offset="1" stopColor="#887098"/></linearGradient>
      <linearGradient id={`${id}-shirt`}><stop stopColor="#ecc0a0"/><stop offset=".6" stopColor="#dda180"/><stop offset="1" stopColor="#bd8069"/></linearGradient>
      <radialGradient id={`${id}-glow`}><stop stopColor={night ? '#657096' : '#e7d4de'} stopOpacity=".4"/><stop offset="1" stopColor={night ? '#283650' : '#fff8ef'} stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-ground`} x2="0" y2="1"><stop stopColor={night ? '#4d5870' : '#c5c6aa'} stopOpacity=".5"/><stop offset="1" stopColor={night ? '#283650' : '#fff8ef'} stopOpacity="0"/></linearGradient>
      <radialGradient id={`${id}-lamp-halo`}><stop stopColor="#ffe4aa" stopOpacity=".45"/><stop offset=".28" stopColor="#f5ca83" stopOpacity=".16"/><stop offset="1" stopColor="#f5ca83" stopOpacity="0"/></radialGradient>
      <radialGradient id={`${id}-shared-light`}><stop stopColor="#f4cf95" stopOpacity=".2"/><stop offset=".6" stopColor="#efc18a" stopOpacity=".09"/><stop offset="1" stopColor="#efc18a" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-lantern-glass`} x2="0" y2="1"><stop stopColor="#ffeac0"/><stop offset=".55" stopColor="#ffdb91"/><stop offset="1" stopColor="#dca464"/></linearGradient>
      <radialGradient id={`${id}-rain-mist`}><stop stopColor="#b9c7cd" stopOpacity=".4"/><stop offset="1" stopColor="#c4cbd0" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-puddle`} x2="0" y2="1"><stop stopColor="#9bafbf" stopOpacity=".38"/><stop offset=".5" stopColor="#c9d2db" stopOpacity=".32"/><stop offset="1" stopColor="#b2a9c6" stopOpacity=".18"/></linearGradient>
      <mask id={`${id}-rain-shelter`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="450">
        <rect width="600" height="450" fill="white"/>
        <path d="M182 123Q196 29 310 31Q422 31 440 123L404 426H143Z" fill="black"/>
      </mask>
    </defs>
    <ellipse cx="300" cy="230" rx="245" ry="220" fill={`url(#${id}-glow)`}/>
    <path className="scene-ground" d="M-10000 411H45Q155 375 300 402Q427 380 555 411H10000V448H-10000Z" fill={`url(#${id}-ground)`}/>
    <ellipse cx="300" cy="414" rx="125" ry="9" fill={night ? '#142238' : '#a7a58c'} opacity=".16"/>
    {night && <g className="garden-lamp" aria-hidden="true">
      {/* The light is steady and shared by both characters, including in reduced motion. */}
      <ellipse cx="353" cy="292" rx="171" ry="155" fill={`url(#${id}-shared-light)`}/>
      <ellipse cx="336" cy="411" rx="151" ry="22" fill={`url(#${id}-lamp-halo)`}/>
      <circle cx="417" cy="149" r="87" fill={`url(#${id}-lamp-halo)`}/>
      <ellipse cx="442" cy="416" rx="25" ry="4" fill="#142238" opacity=".3"/>
      <path d="M441 175V406" stroke="#1d2938" strokeWidth="7" strokeLinecap="round"/>
      <path d="M439 178V402" stroke="#9f8b72" strokeWidth="1.3" opacity=".7"/>
      <path d="M430 413L433 404H449L452 413Z" fill="#24303e" stroke="#7e786b" strokeWidth="1"/>
      <g transform="translate(0 -38)">
      <path d="M441 215V170Q441 151 425 151H417" fill="none" stroke="#263241" strokeWidth="5" strokeLinecap="round"/>
      <path d="M440 168Q438 154 426 153" fill="none" stroke="#a18b6e" strokeWidth="1.2"/>
      <path d="M417 151V163" stroke="#a18b6e" strokeWidth="2"/>
      <path d="M403 175H431L428 203Q417 209 406 203Z" fill={`url(#${id}-lantern-glass)`}/>
      <path d="M400 175L409 165H425L434 175ZM405 204H429L425 210H409Z" fill="#303643" stroke="#b69a72" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M403 175L406 203M431 175L428 203M417 176V206" stroke="#80694f" strokeWidth="1.6" fill="none"/>
      <path d="M409 180L410 198" stroke="#fff7dc" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
      </g>
    </g>}
    {chapter === 0 && <SakuraTree/>}
    {chapter === 1 && <RainGarden id={id}/>}
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
