export const sakuraPetalCount = 8

// Story-clock driven so falling petals pause and replay with the couple.
export function sakuraPetalPose(index: number, time: number) {
  const duration = 9 + index % 6 * .8
  const progress = ((time / duration + index * .61803398875) % 1 + 1) % 1
  const startX = 190 + index * 47 % 176
  const startY = 35 + index * 19 % 70
  const landingX = 220 + index * 31 % 180
  return {
    x: startX + (landingX - startX) * progress + Math.sin(progress * Math.PI * 3 + index) * 11,
    y: startY + (420 - startY) * progress ** 1.1,
    rotation: index * 43 + progress * (index % 2 ? 115 : -95) + Math.sin(progress * Math.PI * 5 + index) * 26,
    scaleX: .22 + Math.abs(Math.cos(progress * Math.PI * 4 + index)) * .78,
    scaleY: .86 + Math.sin(progress * Math.PI * 3 + index) * .12,
    opacity: Math.min(1, progress * 12, (1 - progress) * 9) * .85,
  }
}
