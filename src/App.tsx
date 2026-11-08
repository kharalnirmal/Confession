import { useEffect, useRef, useState } from 'react'
import { Envelope } from './components/Envelope'
import { chapters } from './content/story'
import { approvedTrack } from './content/cueSheet'
import { useAudioController } from './hooks/useAudioController'
import { TimingDiagnostics } from './components/TimingDiagnostics'
import './App.css'

function App() {
  const [manualChapter, setChapter] = useState<number | null>(null)
  const [mode, setMode] = useState<'manual' | 'audio'>('manual')
  const [soundPreferred, setSoundPreferred] = useState(true)
  const { audioRef, diagnosticRef, ...audio } = useAudioController(approvedTrack)
  const chapter = mode === 'manual' ? manualChapter : audio.hasStarted && audio.resolved ? audio.resolved.chapterIndex : null
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const openButton = useRef<HTMLButtonElement>(null)
  const readingButton = useRef<HTMLButtonElement>(null)
  const letterTrigger = useRef<HTMLButtonElement | null>(null)
  const current = chapter === null ? null : chapters[chapter]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotion(!preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  function navigate(next: number | null) {
    if (mode === 'audio' && next !== null) {
      audio.seekChapter(next)
      return
    }
    audio.pause()
    setMode('manual')
    setChapter(next)
    requestAnimationFrame(() => {
      if (next === null) openButton.current?.focus()
      else heading.current?.focus()
    })
  }

  function openStory() {
    if (audio.available && soundPreferred) {
      setMode('audio')
      audio.play(true)
    } else navigate(0)
  }

  function readWithoutSound() {
    const destination = audio.resolved?.chapterIndex ?? 0
    audio.pause()
    setMode('manual')
    setChapter(destination)
    requestAnimationFrame(() => heading.current?.focus())
  }

  return (
    <div className="experience" data-motion={motion ? 'full' : 'reduced'}>
      <audio ref={audioRef} src={audio.available ? approvedTrack?.src : undefined} preload="auto" aria-hidden="true" />
      <a className="skip-link" href="#story">Skip to story</a>
      <header className="site-header">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); navigate(null) }} aria-label="A Little Universe for Two — home">
          <span className="brand-star" aria-hidden="true">✧</span>
          <span>a little universe <i>for two</i></span>
        </a>
        <button className="motion-button" aria-pressed={!motion} onClick={() => setMotion(!motion)}>
          <span aria-hidden="true">{motion ? '◌' : '○'}</span>
          {motion ? 'Gentle motion' : 'Reduced motion'}
        </button>
      </header>

      <main id="story" className={current ? 'story-main reading-preview' : 'story-main'}>
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <span className="sky-mark mark-one" aria-hidden="true">✧</span>
        <span className="sky-mark mark-two" aria-hidden="true">✦</span>
        <span className="sky-mark mark-three" aria-hidden="true">✧</span>
        <span className="sky-mark mark-four" aria-hidden="true">·</span>
        <span className="sky-mark mark-five" aria-hidden="true">✦</span>

        {current ? (
          <section className="chapter-panel" aria-labelledby="chapter-title">
            <div className="chapter-emblem" aria-hidden="true">✧<span>♡</span>✧</div>
            <h1 id="chapter-title" ref={heading} tabIndex={-1}>{current.title}</h1>
            <p className="chapter-copy">{mode === 'audio' ? audio.resolved?.cue?.text ?? current.text : current.text}</p>
            {current.lastLine && <p className="last-line">{current.lastLine}</p>}
            <nav className="chapter-navigation" aria-label="Story chapters">
              <button className="text-button" onClick={() => navigate(chapter === 0 ? null : chapter! - 1)}>← {chapter === 0 ? 'The invitation' : 'Previous'}</button>
              <button className="primary-button" onClick={() => { if (mode === 'audio' && chapter === chapters.length - 1) audio.play(true); else navigate(chapter === chapters.length - 1 ? null : chapter! + 1) }}>{chapter === chapters.length - 1 ? mode === 'audio' ? 'Replay our story' : 'Back to the beginning' : mode === 'audio' ? 'Next chapter' : 'Turn the page'} <span aria-hidden="true">→</span></button>
            </nav>
            {mode === 'manual' && <p className="preview-note">A quiet reading preview. Illustrated scenes and music are still to come.</p>}
          </section>
        ) : (
          <section className="invitation" aria-labelledby="invitation-title">
            <h1 id="invitation-title">A little universe<br /><em>for two.</em></h1>
            <p className="intro-copy">Some stories begin with a grand adventure.<br />Ours begins with a little hello.</p>
            <div className="envelope-wrap"><Envelope /><span className="envelope-caption">a little something, just for you</span></div>
            <button ref={openButton} className="primary-button open-button" disabled={mode === 'audio' && ['starting', 'buffering'].includes(audio.status)} onClick={openStory}><span aria-hidden="true">♡</span> Open Our Story <span aria-hidden="true">→</span></button>
            {audio.available ? <button className="text-button sound-preference" aria-pressed={soundPreferred} onClick={() => setSoundPreferred(!soundPreferred)}>{soundPreferred ? '♫ With music' : 'Read without sound'}</button> : <p className="sound-note"><span aria-hidden="true">♫</span> Reading mode · music is not available yet</p>}
            <button ref={readingButton} className="text-button reading-link" onClick={(event) => { letterTrigger.current = event.currentTarget; audio.pause(); dialog.current?.showModal() }}>Or, read it like a letter <span aria-hidden="true">↗</span></button>
          </section>
        )}
        <div className="bottom-flower flower-left" aria-hidden="true"><Botanical /></div>
        <div className="bottom-flower flower-right" aria-hidden="true"><Botanical /></div>
      </main>

      {mode === 'audio' && <section className="playback-panel" aria-label="Story playback">
        <p className="playback-status" role="status">{audio.error || (audio.status === 'starting' ? 'Gathering a little starlight…' : audio.status === 'buffering' ? 'Holding this little moment…' : audio.status === 'paused' ? 'A little moment, paused.' : audio.status === 'completed' ? 'Stay as long as you like.' : '')}</p>
        <div className="playback-actions">
          <button className="text-button" onClick={() => { if (['playing', 'starting', 'buffering'].includes(audio.status)) audio.pause(); else audio.play(audio.status === 'completed') }}>{['playing', 'starting', 'buffering'].includes(audio.status) ? 'Pause' : audio.status === 'recovery' ? 'Retry music' : audio.status === 'completed' ? 'Replay' : 'Resume'}</button>
          <button className="text-button" aria-pressed={audio.muted} onClick={audio.toggleMute}>{audio.muted ? 'Sound on' : 'Sound off'}</button>
          <label className="volume-control">Volume<input type="range" min="0" max="1" step="0.05" value={audio.volume} onChange={(event) => audio.changeVolume(Number(event.target.value))} /></label>
          <button className="text-button" onClick={(event) => { letterTrigger.current = event.currentTarget; audio.pause(); dialog.current?.showModal() }}>Read the letter</button>
          <button className="text-button" onClick={readWithoutSound}>Continue without sound</button>
        </div>
        <nav className="audio-chapters" aria-label="Jump to chapter">{chapters.map((item, index) => <button key={item.title} className="text-button" aria-current={chapter === index ? 'step' : undefined} onClick={() => audio.seekChapter(index)}>{item.title}</button>)}</nav>
        <p className="volume-hint">On iPhone and iPad, use your device’s volume buttons.</p>
      </section>}
      {import.meta.env.DEV && new URLSearchParams(window.location.search).has('debug') && <TimingDiagnostics source={diagnosticRef} />}

      <footer className="site-footer"><span className="footer-heart" aria-hidden="true">♡</span></footer>

      <dialog ref={dialog} className="letter-dialog" aria-labelledby="letter-title" onClose={() => { (letterTrigger.current ?? heading.current)?.focus() }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="letter-content">
          <button className="close-button" onClick={() => dialog.current?.close()} aria-label="Close the letter" autoFocus>×</button>
          <h2 id="letter-title">A little universe for two.</h2>
          {chapters.map((item) => <section key={item.title}><h3>{item.title}</h3><p>{item.text}</p>{item.lastLine && <p className="last-line">{item.lastLine}</p>}</section>)}
          <p className="letter-signoff">With love, in all the little ways.</p>
        </div>
      </dialog>
    </div>
  )
}

function Botanical() {
  return <svg viewBox="0 0 180 230" fill="none"><g stroke="currentColor" strokeWidth="1.2"><path d="M36 230C87 182 62 107 124 29M65 193C53 161 29 158 18 130C51 130 68 152 65 193ZM79 147C108 151 129 132 140 110C107 108 91 121 79 147ZM91 103C73 89 69 67 77 45C98 59 101 81 91 103ZM108 63C132 68 151 55 159 36C137 32 120 43 108 63Z"/><path d="M124 29C105 31 99 17 105 8C116 2 126 12 124 29ZM124 29C120 8 138 0 145 8C152 19 138 32 124 29Z"/></g></svg>
}

export default App
