import assert from 'node:assert/strict'
import test from 'node:test'
import { characterMotion, flowerGesture } from '../src/lib/characterMotion.ts'

test('character motion replays and seeks deterministically', () => {
  const pose = characterMotion(3.18)
  assert.notDeepEqual(characterMotion(6), pose)
  assert.deepEqual(characterMotion(3.18), pose)
  assert.equal(characterMotion(0).breathScale, 1)
  assert.equal(characterMotion(0).womanBlink, 1)
  assert.equal(characterMotion(0).manBlink, 1)
})

test('breathing and glances remain subtle, with independent blinks', () => {
  for (let time = 0; time < 60; time += .01) {
    const pose = characterMotion(time)
    assert.ok(pose.breathScale >= 1 && pose.breathScale <= 1.0018)
    assert.ok(Math.abs(pose.womanGlance) <= .45)
    assert.ok(Math.abs(pose.manGlance) <= .35)
    assert.ok(pose.womanBlink >= .059 && pose.womanBlink <= 1)
    assert.ok(pose.manBlink >= .059 && pose.manBlink <= 1)
  }
  assert.ok(characterMotion(3.18).womanBlink < .1)
  assert.equal(characterMotion(3.18).manBlink, 1)
})

test('invalid character clocks resolve to the resting pose', () => {
  for (const time of [-1, NaN, Infinity]) {
    assert.deepEqual(characterMotion(time), characterMotion(0))
  }
})

test('flower transfers only after both hands reach the original contact pose', () => {
  assert.equal(flowerGesture(0).givingAngle, -12)
  assert.equal(flowerGesture(0).received, false)
  assert.deepEqual(flowerGesture(2.6), { givingAngle: 0, receivingAngle: 0, received: true })
  assert.equal(flowerGesture(2.599).received, false)
  assert.equal(flowerGesture(4).givingAngle, -6)
  assert.deepEqual(flowerGesture(4), flowerGesture(10))
})

test('flower gesture is deterministic, bounded and handles invalid clocks', () => {
  for (let time = 0; time < 10; time += .01) {
    const gesture = flowerGesture(time)
    assert.ok(gesture.givingAngle >= -12 && gesture.givingAngle <= 0)
    assert.ok(gesture.receivingAngle >= 0 && gesture.receivingAngle <= 7)
    assert.deepEqual(flowerGesture(time), gesture)
  }
  for (const time of [-1, NaN, Infinity]) assert.deepEqual(flowerGesture(time), flowerGesture(0))
})

test('blink closes and opens continuously at the authored phase boundaries', () => {
  const epsilon = 1e-7
  for (const [key, offset] of [['womanBlink', 0], ['manBlink', 1.63]] as const) {
    assert.equal(characterMotion(3.1 - offset - epsilon)[key], 1)
    assert.ok(Math.abs(characterMotion(3.18 - offset)[key] - .06) < 1e-12)
    assert.equal(characterMotion(3.33 - offset + epsilon)[key], 1)
    for (const boundary of [3.1, 3.18, 3.33]) {
      const before = characterMotion(boundary - offset - epsilon)[key]
      const after = characterMotion(boundary - offset + epsilon)[key]
      assert.ok(Math.abs(after - before) < .00001, `${key} jumps at ${boundary}`)
    }
    assert.ok(Math.abs(characterMotion(3.18 - offset)[key] - characterMotion(3.18 - offset + 5.7)[key]) < 1e-12)
  }
})

test('flower handoff keeps the contact pose through the receiving interval', () => {
  for (const time of [2.3, 2.5, 2.599, 2.6, 2.9, 3]) {
    const pose = flowerGesture(time)
    assert.equal(pose.givingAngle, 0)
    assert.equal(pose.receivingAngle, 0)
    assert.equal(pose.received, time >= 2.6)
  }
  assert.deepEqual(flowerGesture(-Infinity), flowerGesture(0))
  assert.deepEqual(characterMotion(-Infinity), characterMotion(0))
})
