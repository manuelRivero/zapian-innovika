/** Presets de animación para ScrollReveal (entrada/salida simétrica vía CSS). */
export const SCROLL_REVEAL_ANIMATIONS = [
  "fade-in",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
] as const

export type ScrollRevealAnimation = (typeof SCROLL_REVEAL_ANIMATIONS)[number]

export function isScrollRevealAnimation(
  value: string
): value is ScrollRevealAnimation {
  return (SCROLL_REVEAL_ANIMATIONS as readonly string[]).includes(value)
}
