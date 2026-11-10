import test from 'node:test'
import assert from 'node:assert/strict'
import { raindrops, rainPose, ripplePose, umbrellaDripPose, splashPose } from '../src/lib/rain.ts'

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

test('umbrella runoff stays beside the couple and splash motion remains bounded', () => {
  for (let index = 0; index < 8; index++) {
    for (const time of [0, .2, 1, 5, 20, NaN, -1]) {
      const drip = umbrellaDripPose(index, time)
      assert.ok(drip.y >= 124 && drip.y <= 407)
      assert.ok(drip.x < 190 || drip.x > 430)
      assert.ok(drip.opacity >= 0 && drip.opacity <= .65)
      assert.deepEqual(drip, umbrellaDripPose(index, time))
      const splash = splashPose(index, time)
      assert.ok(splash.height >= 0 && splash.height <= 4)
      assert.ok(splash.opacity >= 0 && splash.opacity <= .5)
    }
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
