import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveStoryTime, validateTrack } from '../src/lib/resolveStoryTime.ts'
import { sceneIds } from '../src/types/story.ts'
import type { TrackDefinition } from '../src/types/story.ts'

// Synthetic test intervals only; these are not production music cues.
const track: TrackDefinition = {
  src: '/test-only.wav', assetVersion: 'synthetic-test', expectedDuration: 50,
  chapters: sceneIds.map((sceneId, index) => ({ sceneId, start: index * 10, end: (index + 1) * 10 })),
  cues: [{ id: 'hello', sceneId: 'encounter', start: 1, end: 4, text: 'Test caption' }],
}

test('validates a complete cue sheet', () => assert.deepEqual(validateTrack(track), []))
test('uses start-inclusive/end-exclusive boundaries', () => {
  assert.equal(resolveStoryTime(track, 0).chapterIndex, 0)
  assert.equal(resolveStoryTime(track, 9.999).chapterIndex, 0)
  assert.equal(resolveStoryTime(track, 10).chapterIndex, 1)
  assert.equal(resolveStoryTime(track, 1).cue?.id, 'hello')
  assert.equal(resolveStoryTime(track, 4).cue, null)
})
test('seeks directly backwards and forwards without previous callbacks', () => {
  assert.equal(resolveStoryTime(track, 35).sceneId, 'confession')
  assert.equal(resolveStoryTime(track, 2).cue?.id, 'hello')
  assert.equal(resolveStoryTime(track, 22).localTime, 2)
})
test('preserves final tableau at and after the end', () => {
  for (const time of [50, 51, 200]) {
    const result = resolveStoryTime(track, time)
    assert.equal(result.sceneId, 'afterglow')
    assert.equal(result.completed, true)
    assert.equal(result.localTime, 10)
    assert.equal(result.cue, null)
  }
})
test('normalizes invalid or negative clock inputs to the opening', () => {
  for (const time of [-2, NaN, Infinity]) assert.equal(resolveStoryTime(track, time).chapterIndex, 0)
})
test('rejects chapter gaps, overlaps, bad ordering, and duration mismatch', () => {
  for (const start of [9, 11, NaN]) {
    const chapters = track.chapters.map((chapter, index) => index === 1 ? { ...chapter, start } : chapter)
    assert.ok(validateTrack({ ...track, chapters }).length)
  }
  assert.ok(validateTrack({ ...track, expectedDuration: 51 }).length)
  assert.ok(validateTrack({ ...track, chapters: [...track.chapters].reverse() }).length)
})
test('rejects cue overlap, duplicate ids, and out-of-chapter cues', () => {
  assert.ok(validateTrack({ ...track, cues: [...track.cues, ...track.cues] }).length)
  assert.ok(validateTrack({ ...track, cues: [{ ...track.cues[0], end: 11 }] }).length)
  assert.ok(validateTrack({ ...track, cues: [{ ...track.cues[0], start: NaN }] }).length)
})
test('rejects missing source, identity, or chapters', () => {
  assert.ok(validateTrack({ ...track, src: '', assetVersion: '', chapters: [] }).length)
})
