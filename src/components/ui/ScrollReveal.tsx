import * as React from "react"
import { cn } from "../../utils/cn"
import {
  type ScrollRevealAnimation,
  isScrollRevealAnimation,
} from "./scrollRevealAnimations"

export type { ScrollRevealAnimation } from "./scrollRevealAnimations"

export type ScrollRevealProps = {
  children: React.ReactNode
  /** Preset: fade + desplazamiento en X o Y. */
  animation?: ScrollRevealAnimation
  className?: string
  as?: React.ElementType
  /** Umbral de visibilidad (0–1). Por defecto 0.15. */
  threshold?: number
  /** Margen del root de Intersection Observer (ej. "0px 0px -10% 0px"). */
  rootMargin?: string
  /** Duración de la transición en milisegundos. Por defecto 600. */
  duration?: number
  /** Retardo antes de la transición de entrada, en milisegundos. Opcional; por defecto 0. */
  delay?: number
  /** Distancia del desplazamiento en px (presets con movimiento). */
  distance?: number
  /** Desactiva la animación (p. ej. contenido estático). */
  disabled?: boolean
  /**
   * Cuando es false, el contenido permanece oculto y no se observa el viewport.
   * Útil para esperar onLoad de imágenes/medios. Por defecto true.
   */
  shouldAnimate?: boolean
} & Omit<React.HTMLAttributes<HTMLElement>, "children">

const DEFAULT_THRESHOLD = 0.15
const DEFAULT_ROOT_MARGIN = "0px 0px -8% 0px"
const DEFAULT_DURATION = 600
const DEFAULT_DISTANCE = 28

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return reduced
}

const ScrollReveal = ({
  children,
  animation = "fade-up",
  className,
  as: Component = "div",
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
  duration = DEFAULT_DURATION,
  delay = 0,
  distance = DEFAULT_DISTANCE,
  disabled = false,
  shouldAnimate = true,
  style,
  ...rest
}: ScrollRevealProps) => {
  const ref = React.useRef<HTMLElement>(null)
  const [armed, setArmed] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const variant = isScrollRevealAnimation(animation) ? animation : "fade-up"
  const isActive = !disabled && !prefersReducedMotion

  React.useEffect(() => {
    if (!isActive) {
      setArmed(false)
      setVisible(false)
      return
    }

    if (!shouldAnimate) {
      setArmed(true)
      setVisible(false)
      return
    }

    const node = ref.current
    if (!node) return

    setArmed(true)
    setVisible(false)

    let cancelled = false
    let rafOuter = 0
    let rafInner = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!cancelled) {
          setVisible(entry.isIntersecting)
        }
      },
      { threshold, rootMargin }
    )

    // Dos frames: el elemento ya en viewport recibe isIntersecting al instante
    // y, si observamos en el mismo tick que armed, React pinta visible sin transición.
    rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(() => {
        if (!cancelled && ref.current) {
          observer.observe(ref.current)
        }
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafOuter)
      cancelAnimationFrame(rafInner)
      observer.disconnect()
    }
  }, [isActive, shouldAnimate, threshold, rootMargin])

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(isActive
      ? {
          ["--scroll-reveal-duration" as string]: `${duration}ms`,
          ["--scroll-reveal-delay" as string]: `${delay}ms`,
          ["--scroll-reveal-distance" as string]: `${distance}px`,
        }
      : {}),
  }

  return (
    <Component
      ref={ref}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        isActive && armed && "scroll-reveal--armed",
        isActive && visible && "scroll-reveal--visible",
        className
      )}
      style={mergedStyle}
      data-scroll-reveal={variant}
      data-scroll-reveal-visible={isActive ? visible : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default ScrollReveal
