/** Story-clock driven motion: pause, replay and seeking produce the same pose. */
export function characterMotion(time: number) {
  const seconds = Number.isFinite(time) ? Math.max(0, time) : 0
  const blink = (offset: number) => {
    const phase = (seconds + offset) % 5.7
    // A quick close and slower opening, with an open-eyed initial tableau.
    const elapsed = phase - 3.1
    if (elapsed < 0 || elapsed > .23) return 1
    if (elapsed < .08) return 1 - .94 * Math.sin(elapsed / .08 * Math.PI / 2)
    return .06 + .94 * (1 - Math.cos((elapsed - .08) / .15 * Math.PI)) / 2
  }
  return {
    womanBlink: blink(0),
    manBlink: blink(1.63),
    // Shared rig keeps held hands together and feet anchored to the ground.
    breathScale: 1 + (1 - Math.cos(seconds * Math.PI * 2 / 4.8)) * .0009,
    womanGlance: Math.sin(seconds * Math.PI * 2 / 8.2) * .45,
    manGlance: -Math.sin(seconds * Math.PI * 2 / 9.1) * .35,
  }
}

/** Local shoulder angles only: no walking or changes to the original limb shapes. */
export function flowerGesture(time: number) {
  const seconds = Number.isFinite(time) ? Math.max(0, time) : 0
  const ease = (start: number, duration: number) => {
    const progress = Math.max(0, Math.min(1, (seconds - start) / duration))
    return (1 - Math.cos(progress * Math.PI)) / 2
  }
  return {
    givingAngle: (-12 * (1 - ease(.5, 1.5)) - 6 * ease(3, .9)) || 0,
    receivingAngle: 7 * (1 - ease(1.1, 1.2)),
    received: seconds >= 2.6,
  }
}
