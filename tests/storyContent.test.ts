import assert from 'node:assert/strict'
import test from 'node:test'
import { chapters } from '../src/content/story.ts'
import { sceneIds } from '../src/types/story.ts'

test('story copy supplies one readable chapter for every rendered scene', () => {
  assert.equal(chapters.length, sceneIds.length)
  assert.equal(new Set(sceneIds).size, sceneIds.length)
  assert.equal(new Set(chapters.map((chapter) => chapter.title)).size, chapters.length)
  for (const [index, chapter] of chapters.entries()) {
    assert.ok(chapter.title.trim().length > 0, `scene ${sceneIds[index]} needs a title`)
    assert.ok(chapter.lines.length > 0, `scene ${sceneIds[index]} needs at least one line`)
    for (const line of chapter.lines) {
      assert.ok(line.trim().length > 0, `scene ${sceneIds[index]} contains an empty caption`)
      assert.equal(line, line.trim(), 'captions should not contain accidental outer whitespace')
    }
  }
})

test('story content contains no raw markup or unexpanded copy placeholders', () => {
  for (const chapter of chapters) {
    for (const text of [chapter.title, ...chapter.lines]) {
      assert.doesNotMatch(text, /<\/?[a-z][^>]*>/i)
      assert.doesNotMatch(text, /\{\{[^}]+\}\}|\b(?:TODO|TBD|lorem ipsum)\b/i)
    }
  }
})
