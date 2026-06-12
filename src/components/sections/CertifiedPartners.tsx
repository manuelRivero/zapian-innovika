import * as React from "react"
import { cn } from "../../utils/cn"
import ScrollReveal from "../ui/ScrollReveal"

export type PartnerLogo = {
  id: string
  src: string
  alt: string
  /** Dimensiones nativas del PNG — definen el ancho relativo de cada logo */
  width: number
  height: number
}

export type CertifiedPartnersProps = {
  className?: string
  heading?: string
  logos?: PartnerLogo[]
}

const defaultLogos: PartnerLogo[] = [
  {
    id: "finezza",
    src: "/images/business-1.png",
    alt: "Finezza Cocinas",
    width: 156,
    height: 99,
  },
  {
    id: "taupe",
    src: "/images/business-2.png",
    alt: "Taupé Kitchen Design Studio",
    width: 220,
    height: 70,
  },
  {
    id: "stones-deco",
    src: "/images/business-3.png",
    alt: "Stones & Deco",
    width: 365,
    height: 76,
  },
  {
    id: "mob",
    src: "/images/business-4.png",
    alt: "MOB Casa + Oficina",
    width: 160,
    height: 66,
  },
  {
    id: "casazu",
    src: "/images/business-5.png",
    alt: "Casazu",
    width: 350,
    height: 52,
  },
]

const AUTO_SCROLL_SPEED = 0.8
const DRAG_THRESHOLD_PX = 3

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return reduced
}

const CertifiedPartners = ({
  className,
  heading = "ALIADOS CERTIFICADOS",
  logos = defaultLogos,
}: CertifiedPartnersProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const trackRef = React.useRef<HTMLDivElement>(null)
  const offsetRef = React.useRef(0)
  const loopWidthRef = React.useRef(0)
  const isPointerDownRef = React.useRef(false)
  const isDraggingRef = React.useRef(false)
  const isUserInteractingRef = React.useRef(false)
  const dragStartRef = React.useRef({ x: 0, offset: 0 })
  const [isGrabbing, setIsGrabbing] = React.useState(false)

  const marqueeLogos = React.useMemo(
    () => (prefersReducedMotion ? logos : [...logos, ...logos]),
    [logos, prefersReducedMotion]
  )

  const measureLoopWidth = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return 0

    const duplicate = track.children[logos.length] as HTMLElement | undefined
    const measuredFromDuplicate = duplicate?.offsetLeft ?? 0
    const loopWidth =
      measuredFromDuplicate > 0
        ? measuredFromDuplicate
        : track.scrollWidth / 2

    loopWidthRef.current = loopWidth > 0 ? loopWidth : 0
    return loopWidthRef.current
  }, [logos.length])

  const normalizeOffset = React.useCallback((offset: number) => {
    const loopWidth = loopWidthRef.current || measureLoopWidth()
    if (loopWidth <= 0) return offset

    let normalized = offset

    while (normalized <= -loopWidth) {
      normalized += loopWidth
    }

    while (normalized > 0) {
      normalized -= loopWidth
    }

    return normalized
  }, [measureLoopWidth])

  const applyOffset = React.useCallback(
    (offset: number) => {
      const track = trackRef.current
      if (!track) return offset

      const normalized = normalizeOffset(offset)
      offsetRef.current = normalized
      track.style.transform = `translate3d(${normalized}px, 0, 0)`
      return normalized
    },
    [normalizeOffset]
  )

  React.useEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion) return

    const syncLayout = () => {
      measureLoopWidth()
      applyOffset(offsetRef.current)
    }

    syncLayout()
    applyOffset(0)

    const resizeObserver = new ResizeObserver(syncLayout)
    resizeObserver.observe(track)

    const images = track.querySelectorAll("img")
    const handleImageReady = () => syncLayout()

    images.forEach((image) => {
      if (image.complete) return
      image.addEventListener("load", handleImageReady)
      image.addEventListener("error", handleImageReady)
    })

    let frameId = 0

    const tick = () => {
      if (!isUserInteractingRef.current) {
        applyOffset(offsetRef.current - AUTO_SCROLL_SPEED)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      images.forEach((image) => {
        image.removeEventListener("load", handleImageReady)
        image.removeEventListener("error", handleImageReady)
      })
    }
  }, [applyOffset, measureLoopWidth, prefersReducedMotion])

  React.useEffect(() => {
    if (!prefersReducedMotion) return

    const track = trackRef.current
    if (!track) return

    track.style.transform = ""
    offsetRef.current = 0
  }, [prefersReducedMotion])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return

    const track = trackRef.current
    if (!track) return

    isPointerDownRef.current = true
    isDraggingRef.current = false
    dragStartRef.current = {
      x: event.clientX,
      offset: offsetRef.current,
    }

    track.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return

    const deltaX = event.clientX - dragStartRef.current.x

    if (!isDraggingRef.current && Math.abs(deltaX) < DRAG_THRESHOLD_PX) {
      return
    }

    isDraggingRef.current = true
    isUserInteractingRef.current = true
    setIsGrabbing(true)
    event.preventDefault()

    applyOffset(dragStartRef.current.offset + deltaX)
  }

  const endPointerInteraction = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return

    const track = trackRef.current
    isPointerDownRef.current = false
    isDraggingRef.current = false
    isUserInteractingRef.current = false
    setIsGrabbing(false)

    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <ScrollReveal
      as="section"
      animation="fade-up"
      className={cn(
        "section-block w-full bg-(--color-bg-partners) text-(--color-text-inverse)",
        className
      )}
      aria-labelledby="certified-partners-heading"
    >
      <div className="container-layout flex flex-col gap-8 md:gap-10">
        <h2
          id="certified-partners-heading"
          className="section-title section-title--inverse text-center"
        >
          {heading}
        </h2>
      </div>

      <div
        className={cn(
          "partners-marquee mt-8 md:mt-10",
          prefersReducedMotion && "partners-marquee--static",
          isGrabbing && "partners-marquee--grabbing"
        )}
        aria-label="Marcas aliadas certificadas"
        onPointerDown={prefersReducedMotion ? undefined : handlePointerDown}
        onPointerMove={prefersReducedMotion ? undefined : handlePointerMove}
        onPointerUp={prefersReducedMotion ? undefined : endPointerInteraction}
        onPointerCancel={
          prefersReducedMotion ? undefined : endPointerInteraction
        }
      >
        <div ref={trackRef} className="partners-marquee__track">
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className={cn(
                "partners-marquee__item",
                index >= logos.length && "partners-marquee__item--duplicate"
              )}
              aria-hidden={index >= logos.length}
            >
              <img
                src={logo.src}
                alt={index >= logos.length ? "" : logo.alt}
                width={logo.width}
                height={logo.height}
                className="partners-marquee__logo"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export default CertifiedPartners
