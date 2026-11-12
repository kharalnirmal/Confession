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

test('all rain effects normalize non-finite and negative story clocks', () => {
  for (let index = 0; index < 8; index++) {
    for (const time of [-1, -Infinity, Infinity, NaN]) {
      assert.deepEqual(rainPose(index, time), rainPose(index, 0))
      assert.deepEqual(umbrellaDripPose(index, time), umbrellaDripPose(index, 0))
      assert.deepEqual(splashPose(index, time), splashPose(index, 0))
      for (let ring = 0; ring < 3; ring++) {
        assert.deepEqual(ripplePose(index, time, ring), ripplePose(index, 0, ring))
      }
    }
  }
})

test('drop indices wrap and each falling drop repeats after its own cycle', () => {
  for (let index = 0; index < raindrops.length; index++) {
    const time = .371
    assert.deepEqual(rainPose(index + raindrops.length, time), rainPose(index, time))
    const cycle = 390 / raindrops[index].speed
    const first = rainPose(index, time)
    const repeated = rainPose(index, time + cycle)
    assert.ok(Math.abs(first.x - repeated.x) < 1e-9)
    assert.ok(Math.abs(first.y - repeated.y) < 1e-9)
  }
})

test('concentric ripple rings stay finite and staggered throughout a full cycle', () => {
  for (let index = 0; index < 8; index++) {
    for (let step = 0; step <= 100; step++) {
      const rings = [0, 1, 2].map((ring) => ripplePose(index, step / 65, ring))
      for (const pose of rings) {
        assert.ok(Number.isFinite(pose.radius) && pose.radius >= 2 && pose.radius < 17)
        assert.ok(Number.isFinite(pose.opacity) && pose.opacity >= 0 && pose.opacity <= .4)
      }
      assert.equal(new Set(rings.map((pose) => pose.radius)).size, 3)
    }
  }
})
