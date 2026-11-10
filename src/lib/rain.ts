// Seeded positions and story-clock motion keep pause, replay, and seeking exact.
export const raindrops = Array.from({ length: 64 }, (_, index) => ({
  x: 53 + (index * 137.51) % 498,
  phase: (index * 73.37) % 390,
  speed: 105 + index % 5 * 23,
  length: 8 + index % 4 * 4,
  opacity: .17 + index % 4 * .09,
}))

export function rainPose(index: number, time: number) {
  const drop = raindrops[index % raindrops.length]
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const y = (clock * drop.speed + drop.phase) % 390
  return { x: drop.x - y * .13, y: y + 12 }
}

export function ripplePose(index: number, time: number) {
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const progress = (clock * .65 + index * .237) % 1
  return { radius: 2 + progress * 15, opacity: (1 - progress) ** 2 * .4 }
}
