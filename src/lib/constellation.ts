export const heartStars = [[300, 188], [253, 155], [211, 117], [193, 80], [205, 45], [237, 30], [272, 39], [300, 67], [328, 39], [363, 30], [395, 45], [407, 80], [389, 117], [347, 155]]
  .map(([x, y]) => [300 + (x - 300) * .68, y * .68 - 18])

// Closed cubic curves pass through every star; retain the heart's two cusps.
export const heartCurveSegments = heartStars.map((point, index) => {
  const count = heartStars.length
  const previous = heartStars[(index + count - 1) % count]
  const next = heartStars[(index + 1) % count]
  const following = heartStars[(index + 2) % count]
  const nextIndex = (index + 1) % count
  const outgoing = index === 0 || index === 7 ? 0 : .14
  const incoming = nextIndex === 0 || nextIndex === 7 ? 0 : .14
  return {
    control1: point.map((value, axis) => value + (next[axis] - previous[axis]) * outgoing),
    control2: next.map((value, axis) => value - (following[axis] - point[axis]) * incoming),
    end: next,
  }
})
export const heartOutline = `M${heartStars[0].join(' ')}${heartCurveSegments.map(({ control1, control2, end }) => `C${[...control1, ...control2, ...end].join(' ')}`).join('')}Z`
export const constellationTiming = { start: .7, duration: 6.6, glowDuration: 1 }

export function constellationPose(time: number) {
  const clock = Number.isFinite(time) ? Math.max(0, time) : 0
  const { start, duration, glowDuration } = constellationTiming
  const clamp = (value: number) => Math.max(0, Math.min(1, value))
  const smooth = (value: number) => value ** 3 * (value * (value * 6 - 15) + 10)
  const progress = smooth(clamp((clock - start) / duration))
  const glow = smooth(clamp((clock - start - duration) / glowDuration))
  return { progress, glow }
}

export const skyGrid = { columns: 32, rows: 12 }
export const constellationField = (() => {
  let seed = 4813
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  const stars: { x: number; y: number; radius: number; opacity: number }[] = []
  // One jittered point per cell: random-looking, but no dense patches or empty sides.
  for (let row = 0; row < skyGrid.rows; row++) {
    for (let column = 0; column < skyGrid.columns; column++) {
      const x = (column + .15 + random() * .7) / skyGrid.columns * 100
      const y = (row + .15 + random() * .7) / skyGrid.rows * 100
      const radius = .4 + random() ** 2 * .7 + (random() < .06 ? .55 : 0)
      stars.push({ x, y, radius, opacity: .22 + random() * .46 })
    }
  }
  return stars
})()
