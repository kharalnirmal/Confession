import { useEffect, useRef, useState } from 'react'
import { MessageOpening, SpecialReveal } from './components/MessageOpening'
import { FloralFrame } from './components/FloralFrame'
import { NightSky } from './components/NightSky'
import { SkyConstellation } from './components/SkyConstellation'
import { ButterflyAccent } from './components/ButterflyAccent'
import { EndingSequence } from './components/EndingSequence'
import { StoryIllustration } from './components/StoryIllustration'
import { chapters } from './content/story'
import { soundtrack } from './content/cueSheet'
import { useStoryPlayback } from './hooks/useStoryPlayback'
import './App.css'

const track = soundtrack
type Page = 'welcome' | 'draft' | 'reveal' | 'story'

function App() {
  const [page, setPage] = useState<Page>('welcome')
  const [withMusic, setWithMusic] = useState(false)
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [messageStatus, setMessageStatus] = useState('')
  const audio = useRef<HTMLAudioElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const story = useStoryPlayback(page === 'story')
  const finished = page === 'story' && story.completed

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotion(!preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])
  useEffect(() => { title.current?.focus({ preventScroll: true }) }, [page, finished])
  useEffect(() => {
    const element = audio.current
    if (!element) return
    const update = () => {
      if (document.hidden) element.pause()
      else if (page !== 'welcome' && (finished || !story.paused) && withMusic) void element.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [page, finished, story.paused, withMusic])
  useEffect(() => {
    const element = audio.current
    if (!finished || !element) return
    const volume = element.volume
    const start = performance.now()
    let frame = 0
    const fade = (now: number) => {
      const progress = Math.min(1, (now - start) / 2200)
      const eased = progress * progress * (3 - 2 * progress)
      element.volume = volume + (.24 - volume) * eased
      if (progress < 1) frame = requestAnimationFrame(fade)
    }
    frame = requestAnimationFrame(fade)
    return () => cancelAnimationFrame(frame)
  }, [finished])

  function chooseMusic(enabled: boolean) {
    setWithMusic(enabled)
    if (enabled && audio.current && track) {
      audio.current.volume = 0.45
      void audio.current.play().then(() => setMessageStatus('')).catch(() => setMessageStatus('Music couldn’t start. Your story will continue quietly.'))
    }
    setPage('draft')
  }
  function startStory() {
    story.restart()
    setMessageStatus('')
    setPage('story')
    if (audio.current && withMusic && track) {
      audio.current.volume = .45
      if (finished) audio.current.currentTime = 0
      void audio.current.play().catch(() => {})
    }
  }

  return <div className="experience" data-scene={page === 'story' ? story.chapter : 'invitation'} data-page={finished ? 'ending' : page} data-motion={motion ? 'full' : 'reduced'} data-playing={page === 'story' && !story.paused}>
    <audio ref={audio} src={track.src} preload="metadata" loop aria-hidden="true" onError={() => setMessageStatus('Music couldn’t load. You can still enjoy the story without it.')} />
    <FloralFrame />
    {page === 'story' && story.chapter >= 2 && <NightSky />}
    <main id="story" className={page === 'story' && !finished ? 'story-main cinematic' : 'story-main'}>
      {page === 'welcome' && <section className="welcome-panel" aria-labelledby="welcome-title">
        <span className="welcome-heart" aria-hidden="true">♡</span>
        <div className="welcome-heading">
          <ButterflyAccent side="left" />
          <h1 id="welcome-title" ref={title} tabIndex={-1}>A little moment.<br /><em>Just for you.</em></h1>
          <ButterflyAccent side="right" />
        </div>
        <p className="music-question">With music, or without?</p>
        <div className="music-choices">
          <button className="primary-button" onClick={() => chooseMusic(true)} disabled={!track}><span aria-hidden="true">♫</span> With music</button>
          <button className="secondary-button" onClick={() => chooseMusic(false)}>Without music</button>
        </div>
        {!track && <p className="message-hint">Music isn’t available in this version.</p>}
      </section>}
      {page === 'draft' && <MessageOpening motion={motion} onContinue={() => setPage('reveal')} />}
      {page === 'reveal' && <SpecialReveal onOpen={startStory} />}
      {page === 'story' && !finished && <section className="chapter-panel" data-closing={story.closing} aria-label={chapters[story.chapter].title}>
        <div className="illustration-space" key={story.chapter}>
          {story.chapter >= 2 && <SkyConstellation chapter={story.chapter} motion={motion} registerRenderer={story.registerRenderer} />}
          {story.chapter > 0 && motion && <div className="scene-previous" aria-hidden="true"><StoryIllustration chapter={story.chapter - 1} motion={false} manual registerRenderer={story.registerRenderer} /></div>}
          <div className="scene-current"><StoryIllustration chapter={story.chapter} motion={motion} manual={false} registerRenderer={story.registerRenderer} /></div>
        </div>
        <div className="caption-space"><p className="chapter-copy" key={`${story.chapter}-${story.line}`}>{chapters[story.chapter].lines[story.line]}</p></div>
      </section>}
      {finished && <EndingSequence onReplay={startStory} />}
      {messageStatus && <p className="message-status" role="status">{messageStatus}</p>}
    </main>
    {page === 'story' && !finished && <button className="pause-button" aria-label={story.paused ? 'Resume story' : 'Pause story'} onClick={() => { story.togglePause(); if (!story.paused) audio.current?.pause(); else if (withMusic) void audio.current?.play().catch(() => {}) }}>{story.paused ? '▷' : 'Ⅱ'}</button>}
  </div>
}

export default App
