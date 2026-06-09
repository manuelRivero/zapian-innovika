import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

const HERO_VIDEO_SRC = "/videos/Video Inovika 30seg - Web (1).mp4"

const EXIT_DURATION_MS = 600
const SLIDESHOW_INTERVAL_MS = 5000

export type HeroCta = {
  label: string
  href: string
}

export type HeroGalleryItem = {
  name: string
  photoLarge: string
  photoSmall: string
}

const DEFAULT_GALLERY_ITEMS: HeroGalleryItem[] = [
  {
    name: "Casa Reserva Real",
    photoLarge: "/images/Casa Real 01.png",
    photoSmall: "/images/Casa Real 02.png",
  },
  {
    name: "Bunker Hill Houston",
    photoLarge: "/images/Bunker Hill House 03.png",
    photoSmall: "/images/Bunker Hill House 04.png",
  },
  {
    name: "Mueble de TV para Casa Azul",
    photoLarge: "/images/Mueble TV para casa Azul 07.png",
    photoSmall: "/images/Mueble TV para casa Azul 08.png",
  },
  {
    name: "Cocina Marsala",
    photoLarge: "/images/Cocina Marsala 05.png",
    photoSmall: "/images/Cocina Marsala 06.png",
  },
]

export type HeroProps = {
  className?: string
  titleLines?: string[]
  subtitle?: string
  cta?: HeroCta
  slideshowItems?: HeroGalleryItem[]
}

type GalleryPhase = "entering" | "visible" | "exiting"

const defaultTitleLines = [
  "PRODUCCIÓN",
  "A LA MEDIDA PARA TUS PROYECTOS",
]

const Hero = ({
  className,
  titleLines = defaultTitleLines,
  subtitle = "para arquitectos, interioristas, tiendas de cocinas y constructoras",
  cta = { label: "INICIAR PROYECTO", href: "#contacto" },
  slideshowItems,
}: HeroProps) => {
  const items = React.useMemo(
    () => slideshowItems ?? DEFAULT_GALLERY_ITEMS,
    [slideshowItems]
  )

  const imgLargeRef = React.useRef<HTMLImageElement>(null)
  const imgSmallRef = React.useRef<HTMLImageElement>(null)

  const [displayIndex, setDisplayIndex] = React.useState(0)
  const [phase, setPhase] = React.useState<GalleryPhase>("entering")

  // Precarga todas las imágenes al montar para que el browser las tenga en caché.
  React.useEffect(() => {
    items.forEach(item => {
      [item.photoLarge, item.photoSmall].forEach(src => {
        const img = new Image()
        img.src = src
      })
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Fase entering: espera a que ambos <img> reales estén pintables (onLoad o .complete),
  // luego hace double-rAF para garantizar un paint con opacity:0 antes del fade-in.
  React.useEffect(() => {
    if (phase !== "entering") return
    if (items.length <= 1) { setPhase("visible"); return }

    let cancelled = false
    let r1 = 0, r2 = 0

    const proceed = () => {
      if (cancelled) return
      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => { if (!cancelled) setPhase("visible") })
      })
    }

    const large = imgLargeRef.current
    const small = imgSmallRef.current

    // Si no hay refs o ambas ya están completas, proceder de inmediato
    if (!large || !small || (large.complete && small.complete)) {
      proceed()
      return
    }

    let pending = [large, small].filter(img => !img.complete).length

    const onReady = () => {
      pending -= 1
      if (pending === 0) proceed()
    }

    if (!large.complete) {
      large.addEventListener("load", onReady)
      large.addEventListener("error", onReady)
    }
    if (!small.complete) {
      small.addEventListener("load", onReady)
      small.addEventListener("error", onReady)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
      large.removeEventListener("load", onReady)
      large.removeEventListener("error", onReady)
      small.removeEventListener("load", onReady)
      small.removeEventListener("error", onReady)
    }
  }, [phase, items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fase visible: programa la salida tras el intervalo.
  React.useEffect(() => {
    if (phase !== "visible" || items.length <= 1) return
    const t = setTimeout(() => setPhase("exiting"), SLIDESHOW_INTERVAL_MS)
    return () => clearTimeout(t)
  }, [phase, items.length])

  // Fase exiting: al terminar la animación avanza al siguiente item.
  React.useEffect(() => {
    if (phase !== "exiting") return
    const t = setTimeout(() => {
      setDisplayIndex(i => (i + 1) % items.length)
      setPhase("entering")
    }, EXIT_DURATION_MS)
    return () => clearTimeout(t)
  }, [phase, items.length])

  const current = items[displayIndex]

  return (
    <section
      className={cn("w-full py-5 md:py-6", className)}
      aria-label="Presentación"
    >
      <div className="container-layout flex flex-col gap-(--spacing-hero-row)">
        {/* Fila 1 — video + overlay + copy */}
        <div className="hero-media hero-banner relative w-full">
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>

          <div
            className="absolute inset-0 bg-(--color-overlay-hero)"
            aria-hidden="true"
          />

          <div className="hero-banner__content">
            <div className="flex w-full max-w-[662px] flex-col items-center">
              <h1 className="hero-title m-0 w-full">
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-subtitle m-0 mt-3 w-full max-w-[620px] md:mt-4">
                {subtitle}
              </p>

              <Button
                as="a"
                href={cta.href}
                variant="primary"
                size="lg"
                className="hero-cta text-(--color-brand-cream) hover:text-(--color-brand-cream)"
              >
                {cta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Fila 2 — imágenes de galería (slideshow) */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-stretch">
          {/* Imagen grande */}
          <div
            className="hero-gallery-item w-full"
            data-gallery-phase={phase}
            style={
              {
                "--hero-gallery-enter-delay": "0ms",
                "--hero-gallery-exit-delay": "150ms",
              } as React.CSSProperties
            }
          >
            <div
              className="hero-media aspect-[16/10] min-h-[220px] w-full md:min-h-[280px] lg:min-h-[320px]"
              data-media-slot="gallery-primary"
            >
              <img
                ref={imgLargeRef}
                src={current.photoLarge}
                alt={current.name}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>

          {/* Imagen angosta */}
          <div
            className="hero-gallery-item w-full h-full"
            data-gallery-phase={phase}
            style={
              {
                "--hero-gallery-enter-delay": "300ms",
                "--hero-gallery-exit-delay": "0ms",
              } as React.CSSProperties
            }
          >
            <div
              className="hero-media aspect-[4/5] min-h-[260px] h-full lg:aspect-auto lg:min-h-0"
              data-media-slot="gallery-secondary"
            >
              <img
                ref={imgSmallRef}
                src={current.photoSmall}
                alt={current.name}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Fila 3 — nombre del proyecto */}
        <p
          className="hero-gallery-item hero-gallery-caption"
          data-gallery-phase={phase}
          style={
            {
              "--hero-gallery-enter-delay": "150ms",
              "--hero-gallery-exit-delay": "0ms",
            } as React.CSSProperties
          }
        >
          {current.name}
        </p>
      </div>
    </section>
  )
}

export default Hero
