// Seeded positions and story-clock motion keep pause, replay, and seeking exact.
export const raindrops = Array.from({ length: 88 }, (_, index) => ({
  x: 53 + (index * 137.51) % 498,
  phase: (index * 73.37) % 390,
  speed: 105 + index % 5 * 23,
  length: 8 + index % 4 * 4,
  opacity: .17 + index % 4 * .09,
}))

export const rainImpacts = [[83, 418], [114, 418], [469, 412], [510, 412], [177, 421], [397, 420], [222, 426], [352, 428]]

export function umbrellaDripPose(index: number, time: number) {
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const progress = (clock * (.55 + index % 3 * .08) + index * .217) % 1
  const side = index % 2 === 0 ? -1 : 1
  return {
    x: (side < 0 ? 183 : 439) + side * progress * 13,
    y: 124 + progress ** 1.7 * 283,
    opacity: Math.sin(progress * Math.PI) * .65,
    length: 2 + progress * 4,
  }
}

export function splashPose(index: number, time: number) {
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const progress = (clock * .65 + index * .237) % 1
  const burst = Math.min(1, progress / .23)
  return { spread: .3 + burst * .9, height: Math.sin(burst * Math.PI) * 4, opacity: (1 - burst) * .5 }
}

export function rainPose(index: number, time: number) {
  const drop = raindrops[index % raindrops.length]
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const y = (clock * drop.speed + drop.phase) % 390
  return { x: drop.x - y * .13, y: y + 12 }
}

export function ripplePose(index: number, time: number, ring = 0) {
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const progress = (clock * .65 + index * .237 - ring * .16 + 1) % 1
  return { radius: 2 + progress * 15, opacity: (1 - progress) ** 2 * .4 }
}
