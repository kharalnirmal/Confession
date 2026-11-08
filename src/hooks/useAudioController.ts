import { useCallback, useEffect, useRef, useState } from 'react'
import { resolveStoryTime, validateTrack } from '../lib/resolveStoryTime'
import type { ResolvedStory, TrackDefinition } from '../types/story'

type PlaybackStatus = 'invitation' | 'starting' | 'playing' | 'paused' | 'buffering' | 'completed' | 'recovery'
type PlaybackIntent = 'play' | 'pause'
export interface AudioDiagnostics {
  currentTime: number
  duration: number
  localTime: number
  scene: string
  cue: string
  intent: PlaybackIntent
  observed: PlaybackStatus
  readyState: number
  seeking: boolean
  buffered: string
  events: string[]
}

export function useAudioController(track: TrackDefinition | null) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const intent = useRef<PlaybackIntent>('pause')
  const requestId = useRef(0)
  const frame = useRef(0)
  const active = useRef(false)
  const semantic = useRef('')
  const [hasStarted, setHasStarted] = useState(false)
  const [status, setStatus] = useState<PlaybackStatus>('invitation')
  const [error, setError] = useState('')
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [resolved, setResolved] = useState<ResolvedStory | null>(null)
  const diagnosticRef = useRef<AudioDiagnostics>({ currentTime: 0, duration: 0, localTime: 0, scene: 'invitation', cue: 'none', intent: 'pause', observed: 'invitation', readyState: 0, seeking: false, buffered: '', events: [] })
  const validationErrors = track ? validateTrack(track) : []
  const available = track !== null && validationErrors.length === 0

  const updateStatus = useCallback((next: PlaybackStatus) => {
    diagnosticRef.current.observed = next
    setStatus(next)
  }, [])

  const reconcile = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !track || !available) return
    const next = resolveStoryTime(track, audio.currentTime)
    // Scene timelines can read localTime directly; React only handles semantic changes.
    const key = `${next.chapterIndex}:${next.cue?.id ?? ''}:${next.completed}`
    if (key !== semantic.current) {
      semantic.current = key
      setResolved(next)
    }
    const ranges = Array.from({ length: audio.buffered.length }, (_, index) => `${audio.buffered.start(index).toFixed(1)}–${audio.buffered.end(index).toFixed(1)}`)
    Object.assign(diagnosticRef.current, { currentTime: audio.currentTime, duration: audio.duration, localTime: next.localTime, scene: next.sceneId, cue: next.cue?.id ?? 'none', intent: intent.current, readyState: audio.readyState, seeking: audio.seeking, buffered: ranges.join(', ') || 'none' })
  }, [track, available])

  const pause = useCallback(() => {
    intent.current = 'pause'
    diagnosticRef.current.intent = 'pause'
    requestId.current++
    audioRef.current?.pause()
    cancelAnimationFrame(frame.current)
    if (active.current) updateStatus('paused')
    reconcile()
  }, [reconcile, updateStatus])

  const play = useCallback((restart = false) => {
    const audio = audioRef.current
    if (!audio || !track || !available) return
    const id = ++requestId.current
    active.current = true
    intent.current = 'play'
    diagnosticRef.current.intent = 'play'
    setError('')
    if (restart || audio.ended) {
      setHasStarted(false)
      diagnosticRef.current.events = []
      audio.pause()
      audio.currentTime = 0
    }
    if (audio.error) audio.load()
    updateStatus('starting')
    // Invoke synchronously in the user's gesture. Never wait for loading first.
    void audio.play().then(() => {
      if (requestId.current !== id || intent.current !== 'play') {
        if (intent.current === 'pause') audio.pause()
        return
      }
      reconcile()
      // 'playing' owns visual startup, not resolution of this promise.
    }).catch(() => {
      if (requestId.current !== id) return
      intent.current = 'pause'
      diagnosticRef.current.intent = 'pause'
      audio.pause()
      setError('The music couldn’t start. Try again, or read our story without sound.')
      updateStatus('recovery')
    })
  }, [track, available, reconcile, updateStatus])

  const seekChapter = useCallback((index: number) => {
    const audio = audioRef.current
    const chapter = track?.chapters[index]
    if (!audio || !chapter || !available) return
    try {
      audio.currentTime = chapter.start
      reconcile()
      if (intent.current === 'pause') updateStatus('paused')
    } catch {
      pause()
      setError('That chapter isn’t ready yet. Try again or continue in reading mode.')
      updateStatus('recovery')
    }
  }, [track, available, reconcile, pause, updateStatus])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !available || !track) return
    audio.volume = 0.7
    let disposed = false
    const tick = () => {
      if (disposed) return
      reconcile()
      if (intent.current === 'play' && !audio.paused && !audio.ended) frame.current = requestAnimationFrame(tick)
    }
    const record = (event: Event) => {
      const logs = diagnosticRef.current.events
      logs.push(`${event.type} @ ${audio.currentTime.toFixed(2)}`)
      if (logs.length > 8) logs.shift()
      reconcile()
      switch (event.type) {
        case 'loadedmetadata':
          if (!Number.isFinite(audio.duration) || Math.abs(audio.duration - track.expectedDuration) > 0.25) {
            pause()
            setError('This recording doesn’t match the approved timing. Please use the reading edition.')
            updateStatus('recovery')
          }
          break
        case 'playing':
          if (intent.current !== 'play') { audio.pause(); break }
          if (!Number.isFinite(audio.duration) || Math.abs(audio.duration - track.expectedDuration) > 0.25) {
            pause()
            setError('This recording doesn’t match the approved timing. Please use the reading edition.')
            updateStatus('recovery')
            break
          }
          setHasStarted(true)
          updateStatus('playing')
          cancelAnimationFrame(frame.current)
          frame.current = requestAnimationFrame(tick)
          break
        case 'waiting':
          if (intent.current === 'play') updateStatus('buffering')
          break
        case 'pause':
          cancelAnimationFrame(frame.current)
          if (active.current && !audio.ended && diagnosticRef.current.observed !== 'recovery' && diagnosticRef.current.observed !== 'starting') {
            intent.current = 'pause'
            diagnosticRef.current.intent = 'pause'
            updateStatus('paused')
          }
          break
        case 'ended':
          intent.current = 'pause'
          diagnosticRef.current.intent = 'pause'
          cancelAnimationFrame(frame.current)
          updateStatus('completed')
          break
        case 'error':
          pause()
          setError('The music couldn’t load. Retry, or keep the moment in reading mode.')
          updateStatus('recovery')
          break
      }
    }
    const events = ['loadedmetadata', 'canplay', 'playing', 'waiting', 'stalled', 'pause', 'seeking', 'seeked', 'timeupdate', 'ended', 'error']
    events.forEach((name) => audio.addEventListener(name, record))
    const visibility = () => { if (document.hidden) pause() }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      disposed = true
      intent.current = 'pause'
      // This is a request-generation counter, not a DOM ref; invalidate pending promises.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestId.current++
      cancelAnimationFrame(frame.current)
      events.forEach((name) => audio.removeEventListener(name, record))
      document.removeEventListener('visibilitychange', visibility)
      audio.pause()
    }
  }, [available, track, reconcile, pause, updateStatus])

  function toggleMute() {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(audioRef.current.muted)
  }

  function changeVolume(value: number) {
    if (!audioRef.current) return
    const bounded = Math.min(1, Math.max(0, value))
    audioRef.current.volume = bounded
    setVolume(bounded)
  }

  return { audioRef, available, validationErrors, hasStarted, status, error, resolved, muted, volume, diagnosticRef, play, pause, seekChapter, toggleMute, changeVolume }
}
