import test from 'node:test'
import assert from 'node:assert/strict'
import { raindrops, rainPose, ripplePose } from '../src/lib/rain.ts'

test('rain replays deterministically and stays within the illustrated scene', () => {
  for (let index = 0; index < raindrops.length; index++) {
    for (const time of [0, .5, 8, 20, 100]) {
      const pose = rainPose(index, time)
      assert.deepEqual(pose, rainPose(index, time))
      assert.ok(pose.y >= 12 && pose.y < 402)
      assert.ok(pose.x >= 0 && pose.x <= 551)
    }
    assert.deepEqual(rainPose(index, NaN), rainPose(index, 0))
  }
})

test('puddle ripples expand with a bounded, fading opacity', () => {
  for (let index = 0; index < 8; index++) {
    for (const time of [0, .2, 1, 9, 24]) {
      const pose = ripplePose(index, time)
      assert.ok(pose.radius >= 2 && pose.radius < 17)
      assert.ok(pose.opacity >= 0 && pose.opacity <= .4)
      assert.deepEqual(pose, ripplePose(index, time))
    }
  }
})
