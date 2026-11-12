import test from 'node:test'
import assert from 'node:assert/strict'
import { constellationField, heartStars, heartOutline, heartCurveSegments, constellationTiming, constellationPose, skyGrid } from '../src/lib/constellation.ts'
import { chapters } from '../src/content/story.ts'

test('background stars fill the entire sky evenly without dense clusters', () => {
  assert.equal(constellationField.length, skyGrid.columns * skyGrid.rows)
  assert.ok(constellationField.length > heartStars.length * 7)
  const cells = new Set<string>()
  for (const star of constellationField) {
    assert.ok(star.x > 0 && star.x < 100 && star.y > 0 && star.y < 100)
    cells.add(`${Math.floor(star.x / 100 * skyGrid.columns)}:${Math.floor(star.y / 100 * skyGrid.rows)}`)
    assert.ok(star.radius >= .4 && star.radius <= 1.65)
  }
  assert.equal(cells.size, skyGrid.columns * skyGrid.rows)
  assert.ok(constellationField.some((star) => star.radius > 1.1))
})

test('smooth heart curves connect every star and close back at the starting star', () => {
  assert.equal(heartCurveSegments.length, heartStars.length)
  for (let index = 0; index < heartCurveSegments.length; index++) {
    const segment = heartCurveSegments[index]
    assert.deepEqual(segment.end, heartStars[(index + 1) % heartStars.length])
    assert.ok([...segment.control1, ...segment.control2].every(Number.isFinite))
  }
  assert.deepEqual(heartCurveSegments.at(-1)?.end, heartStars[0])
  assert.equal((heartOutline.match(/C/g) ?? []).length, heartStars.length)
})

test('the whole heart closes before the constellation chapter ends', () => {
  const { start, duration, glowDuration } = constellationTiming
  const chapterDuration = chapters[2].lines.length * 3.5
  assert.ok(start > 0)
  assert.ok(start + duration + glowDuration < chapterDuration)
  assert.ok(chapterDuration - start - duration - glowDuration >= 2)
  assert.ok(heartOutline.endsWith('Z'), 'the final edge must close the heart')
})

test('heart drawing advances once from the bottom and only glows after closing', () => {
  assert.equal(heartStars[0][1], Math.max(...heartStars.map(([, y]) => y)))
  const { start, duration, glowDuration } = constellationTiming
  assert.deepEqual(constellationPose(0), { progress: 0, glow: 0 })
  assert.deepEqual(constellationPose(NaN), constellationPose(0))
  let previous = 0
  for (let frame = 0; frame <= 700; frame++) {
    const time = frame / 60
    const pose = constellationPose(time)
    assert.ok(pose.progress >= previous && pose.progress <= 1)
    if (time <= start + duration) assert.equal(pose.glow, 0)
    if (pose.glow > 0) assert.equal(pose.progress, 1)
    previous = pose.progress
  }
  assert.deepEqual(constellationPose(start + duration + glowDuration + .01), { progress: 1, glow: 1 })
})

test('heart geometry preserves mirrored lobes and sharp top and bottom cusps', () => {
  const centerX = heartStars[0][0]
  assert.equal(new Set(heartStars.map((point) => point.join(','))).size, heartStars.length)
  for (let index = 1; index < heartStars.length; index++) {
    const mirror = heartStars[heartStars.length - index]
    assert.ok(Math.abs(heartStars[index][0] + mirror[0] - centerX * 2) < 1e-10)
    assert.equal(heartStars[index][1], mirror[1])
  }
  for (const cusp of [0, 7]) {
    assert.deepEqual(heartCurveSegments[cusp].control1, heartStars[cusp])
    const incoming = heartCurveSegments[(cusp + heartStars.length - 1) % heartStars.length]
    assert.deepEqual(incoming.control2, heartStars[cusp])
  }
})

test('constellation timing has exact phase endpoints and a smooth midpoint', () => {
  const { start, duration, glowDuration } = constellationTiming
  assert.deepEqual(constellationPose(start), { progress: 0, glow: 0 })
  assert.deepEqual(constellationPose(start + duration / 2), { progress: .5, glow: 0 })
  assert.deepEqual(constellationPose(start + duration), { progress: 1, glow: 0 })
  assert.ok(Math.abs(constellationPose(start + duration + glowDuration / 2).glow - .5) < 1e-12)
  for (const clock of [-1, -Infinity, Infinity, NaN]) {
    assert.deepEqual(constellationPose(clock), constellationPose(0))
  }
  for (const star of constellationField) {
    assert.ok(star.opacity >= .22 && star.opacity <= .68)
  }
})
