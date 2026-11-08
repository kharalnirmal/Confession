import { useEffect, useRef, useState } from 'react'
import { Envelope } from './components/Envelope'
import { chapters } from './content/story'
import './App.css'

function App() {
  const [chapter, setChapter] = useState<number | null>(null)
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const openButton = useRef<HTMLButtonElement>(null)
  const readingButton = useRef<HTMLButtonElement>(null)
  const current = chapter === null ? null : chapters[chapter]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotion(!preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  function navigate(next: number | null) {
    setChapter(next)
    requestAnimationFrame(() => {
      if (next === null) openButton.current?.focus()
      else heading.current?.focus()
    })
  }

  return (
    <div className="experience" data-motion={motion ? 'full' : 'reduced'}>
      <a className="skip-link" href="#story">Skip to story</a>
      <header className="site-header">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); navigate(null) }} aria-label="A Little Universe for Two — home">
          <span className="brand-star" aria-hidden="true">✧</span>
          <span>a little universe <i>for two</i></span>
        </a>
        <span className="header-note">A LETTER. A LITTLE MAGIC. US.</span>
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
            <p className="eyebrow">THE READING EDITION · {String(chapter! + 1).padStart(2, '0')} / 05</p>
            <div className="chapter-emblem" aria-hidden="true">✧<span>♡</span>✧</div>
            <h1 id="chapter-title" ref={heading} tabIndex={-1}>{current.title}</h1>
            <p className="chapter-copy">{current.text}</p>
            {current.lastLine && <p className="last-line">{current.lastLine}</p>}
            <nav className="chapter-navigation" aria-label="Story chapters">
              <button className="text-button" onClick={() => navigate(chapter === 0 ? null : chapter! - 1)}>← {chapter === 0 ? 'The invitation' : 'Previous'}</button>
              <button className="primary-button" onClick={() => navigate(chapter === chapters.length - 1 ? null : chapter! + 1)}>{chapter === chapters.length - 1 ? 'Back to the beginning' : 'Turn the page'} <span aria-hidden="true">→</span></button>
            </nav>
            <p className="preview-note">A quiet reading preview. Illustrated scenes and music are still to come.</p>
          </section>
        ) : (
          <section className="invitation" aria-labelledby="invitation-title">
            <p className="eyebrow">A SMALL STORY. AN INFINITE KIND OF LOVE.</p>
            <h1 id="invitation-title">A little universe<br /><em>for two.</em></h1>
            <p className="intro-copy">Some stories begin with a grand adventure.<br />Ours begins with a little hello.</p>
            <div className="envelope-wrap"><Envelope /><span className="envelope-caption">a little something, just for you</span></div>
            <button ref={openButton} className="primary-button open-button" onClick={() => navigate(0)}><span aria-hidden="true">♡</span> Open Our Story <span aria-hidden="true">→</span></button>
            <p className="sound-note"><span aria-hidden="true">♫</span> A quiet beginning · sound-free reading preview</p>
            <button ref={readingButton} className="text-button reading-link" onClick={() => dialog.current?.showModal()}>Or, read it like a letter <span aria-hidden="true">↗</span></button>
          </section>
        )}
        <div className="bottom-flower flower-left" aria-hidden="true"><Botanical /></div>
        <div className="bottom-flower flower-right" aria-hidden="true"><Botanical /></div>
      </main>

      <footer className="site-footer"><span>MADE OF LITTLE MOMENTS</span><span className="footer-heart" aria-hidden="true">♡</span><span>AND A WHOLE LOT OF YOU</span></footer>

      <dialog ref={dialog} className="letter-dialog" aria-labelledby="letter-title" onClose={() => readingButton.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="letter-content">
          <button className="close-button" onClick={() => dialog.current?.close()} aria-label="Close the letter" autoFocus>×</button>
          <p className="eyebrow">THE WHOLE STORY, AT YOUR PACE</p>
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
