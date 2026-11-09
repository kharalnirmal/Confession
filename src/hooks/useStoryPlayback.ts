import { useCallback, useEffect, useRef, useState } from 'react'
import { chapters } from '../content/story'
import { sceneIds, type ResolvedStory } from '../types/story'

const secondsPerLine = 3.5
const boundaries = chapters.map((_, index) => chapters.slice(0, index).reduce((total, chapter) => total + chapter.lines.length * secondsPerLine, 0))
const finalHold = 2
const duration = chapters.reduce((total, chapter) => total + chapter.lines.length * secondsPerLine, 0) + finalHold

export function useStoryPlayback(active: boolean) {
  const clock = useRef(0)
  const renderer = useRef<((state: ResolvedStory) => void) | null>(null)
  const [paused, setPaused] = useState(false)
  const [run, setRun] = useState(0)
  const [position, setPosition] = useState({ chapter: 0, line: 0, completed: false, closing: false })
  const lastPosition = useRef(position)
  const sample = useCallback(() => {
    const chapter = Math.max(0, boundaries.findLastIndex((start) => clock.current >= start))
    const localTime = clock.current - boundaries[chapter]
    const line = Math.min(chapters[chapter].lines.length - 1, Math.floor(localTime / secondsPerLine))
    const completed = clock.current >= duration
    const closing = clock.current >= duration - .75
    const previous = lastPosition.current
    if (previous.chapter !== chapter || previous.line !== line || previous.completed !== completed || previous.closing !== closing) {
      const next = { chapter, line, completed, closing }
      lastPosition.current = next
      setPosition(next)
    }
    renderer.current?.({ sceneId: sceneIds[chapter], chapterIndex: chapter, cue: null, localTime, completed })
  }, [])
  useEffect(() => {
    if (!active || paused) return
    let frame = 0
    let previous: number | undefined
    const tick = (now: number) => {
      if (!document.hidden && previous !== undefined) clock.current = Math.min(duration, clock.current + Math.min(now - previous, 80) / 1000)
      previous = now
      sample()
      if (clock.current < duration) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, paused, sample, run])
  const registerRenderer = useCallback((next: (state: ResolvedStory) => void) => {
    renderer.current = next
    return () => { if (renderer.current === next) renderer.current = null }
  }, [])
  function seek(chapter: number) { clock.current = boundaries[Math.max(0, Math.min(chapters.length - 1, chapter))]; sample() }
  function restart() { clock.current = 0; setPaused(false); setRun((value) => value + 1); sample() }
  return { ...position, paused, registerRenderer, seek, restart, togglePause: () => setPaused((value) => !value) }
}
