import { sceneIds } from '../types/story.ts'
import type { ResolvedStory, TrackDefinition } from '../types/story.ts'

export function validateTrack(track: TrackDefinition): string[] {
  const errors: string[] = []
  if (!track.src.trim() || !track.assetVersion.trim()) errors.push('Track source and asset version are required.')
  if (!Number.isFinite(track.expectedDuration) || track.expectedDuration <= 0) errors.push('Track duration must be positive and finite.')
  if (track.chapters.length !== sceneIds.length) errors.push('Every story chapter is required.')
  track.chapters.forEach((chapter, index) => {
    if (chapter.sceneId !== sceneIds[index]) errors.push(`Chapter ${index} has an invalid scene or order.`)
    if (!Number.isFinite(chapter.start) || !Number.isFinite(chapter.end) || chapter.start < 0 || chapter.end <= chapter.start || chapter.end > track.expectedDuration) errors.push(`Chapter ${index} has invalid bounds.`)
    if (chapter.start !== (index === 0 ? 0 : track.chapters[index - 1].end)) errors.push(`Chapter ${index} must meet its preceding boundary without gaps or overlaps.`)
  })
  if (track.chapters.at(-1)?.end !== track.expectedDuration) errors.push('Chapters must cover the complete recording.')
  const ids = new Set<string>()
  track.cues.forEach((cue, index) => {
    const chapter = track.chapters.find((item) => item.sceneId === cue.sceneId)
    if (!cue.id.trim() || ids.has(cue.id)) errors.push(`Cue ${index} needs a unique identifier.`)
    ids.add(cue.id)
    if (!cue.text.trim()) errors.push(`Cue ${index} needs text.`)
    if (!Number.isFinite(cue.start) || !Number.isFinite(cue.end) || cue.end <= cue.start || !chapter || cue.start < chapter.start || cue.end > chapter.end) errors.push(`Cue ${index} is outside its chapter.`)
    if (index > 0 && cue.start < track.cues[index - 1].end) errors.push(`Cue ${index} overlaps or is out of order.`)
  })
  // Caption gaps are intentional: the scene's semantic chapter copy remains visible.
  return errors
}

// Call with validated metadata. Intervals are start-inclusive and end-exclusive.
export function resolveStoryTime(track: TrackDefinition, seconds: number): ResolvedStory {
  const time = Number.isFinite(seconds) ? Math.max(0, seconds) : 0
  const completed = time >= track.expectedDuration
  const chapterIndex = completed ? track.chapters.length - 1 : track.chapters.findIndex((chapter) => time >= chapter.start && time < chapter.end)
  const chapter = track.chapters[chapterIndex]
  if (!chapter) throw new Error('No chapter at this time. Validate the cue sheet before playback.')
  return {
    sceneId: chapter.sceneId,
    chapterIndex,
    cue: completed ? null : track.cues.find((cue) => time >= cue.start && time < cue.end) ?? null,
    localTime: Math.min(time, chapter.end) - chapter.start,
    completed,
  }
}
