import assert from 'node:assert/strict'
import test from 'node:test'
import { sakuraPetalCount, sakuraPetalPose } from '../src/lib/sakura.ts'

test('keeps the falling petals sparse', () => {
  assert.equal(sakuraPetalCount, 8)
})

test('petals replay and pause deterministically on the story clock', () => {
  const initial = sakuraPetalPose(3, 2)
  assert.notDeepEqual(sakuraPetalPose(3, 4), initial)
  assert.deepEqual(sakuraPetalPose(3, 2), initial)
})

test('all petal paths stay within the scene with bounded opacity and flutter', () => {
  for (let index = 0; index < sakuraPetalCount; index++) {
    for (let time = 0; time < 60; time += .25) {
      const pose = sakuraPetalPose(index, time)
      assert.ok(pose.x >= 100 && pose.x <= 420)
      assert.ok(pose.y >= 35 && pose.y <= 420)
      assert.ok(pose.opacity >= 0 && pose.opacity <= .85)
      assert.ok(pose.scaleX >= .22 && pose.scaleX <= 1)
      assert.ok(pose.scaleY >= .74 && pose.scaleY <= .98)
    }
  }
})

test('petals descend from the canopy toward the couple', () => {
  const start = sakuraPetalPose(0, .5)
  const end = sakuraPetalPose(0, 8.8)
  assert.ok(end.y > start.y)
  assert.ok(end.x > start.x)
  assert.ok(end.x >= 200 && end.x <= 400)
})
