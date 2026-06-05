import * as React from "react"
import { cn } from "../../utils/cn"
import { useMediaReady } from "../../hooks/useMediaReady"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

const HERO_VIDEO_SRC = "/videos/Video Inovika 30seg - Web (1).mp4"

export type HeroCta = {
  label: string
  href: string
}

export type HeroGallerySlot = {
  src?: string
  alt?: string
}

export type HeroProps = {
  className?: string
  titleLines?: string[]
  subtitle?: string
  cta?: HeroCta
  galleryPrimary?: HeroGallerySlot
  gallerySecondary?: HeroGallerySlot
  galleryCaption?: string
}

const defaultTitleLines = [
  "PRODUCCIÓN",
  "A LA MEDIDA PARA TUS PROYECTOS",
]

/**
 * Contenedor con border-radius del hero. Coloca la imagen así:
 * <img src="..." alt="" className="absolute inset-0 size-full object-cover" />
 */
const MediaFrame = ({
  className,
  aspectClassName,
  children,
  slotLabel,
}: {
  className?: string
  aspectClassName?: string
  children?: React.ReactNode
  slotLabel?: string
}) => (
  <div
    className={cn("hero-media w-full", aspectClassName, className)}
    data-media-slot={slotLabel}
  >
    {children}
  </div>
)

const Hero = ({
  className,
  titleLines = defaultTitleLines,
  subtitle = "para arquitectos, interioristas, tiendas de cocinas y constructoras",
  cta = { label: "INICIAR PROYECTO", href: "#contacto" },
  galleryPrimary,
  gallerySecondary,
  galleryCaption = "Casa Reserva Real",
}: HeroProps) => {
  const { isMediaReady, onMediaLoad } = useMediaReady(true)

  return (
    <section
      className={cn("w-full py-5 md:py-6", className)}
      aria-label="Presentación"
    >
      <div className="container-layout flex flex-col gap-(--spacing-hero-row)">
        {/* Fila 1 — video + overlay + copy */}
        <div className="hero-media hero-banner relative w-full bg-black">
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={onMediaLoad}
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>

          <div
            className="absolute inset-0 bg-(--color-overlay-hero)"
            aria-hidden="true"
          />

          <div className="hero-banner__content">
            <ScrollReveal
              animation="fade-up"
              shouldAnimate={isMediaReady}
              delay={200}
              className="flex w-full max-w-[662px] flex-col items-center"
            >
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
            </ScrollReveal>
          </div>
        </div>

        {/* Fila 2 — imágenes de galería */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-stretch">
          <ScrollReveal
            animation="fade-right"
            duration={1000}
            className="w-full"
          >
            <MediaFrame
              slotLabel="gallery-primary"
              aspectClassName="aspect-[16/10] min-h-[220px] md:min-h-[280px] lg:min-h-[320px]"
            >
              {galleryPrimary?.src && (
                <img
                  src={galleryPrimary.src}
                  alt={galleryPrimary.alt ?? ""}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
              )}
            </MediaFrame>
          </ScrollReveal>

          <ScrollReveal
            animation="fade-right"
            duration={1000}
            delay={300}
            className="w-full h-full"
          >
            <MediaFrame
              slotLabel="gallery-secondary"
              aspectClassName="aspect-[4/5] min-h-[260px] lg:aspect-auto lg:min-h-0 lg:h-full"
              className="h-full"
            >
              {gallerySecondary?.src && (
                <img
                  src={gallerySecondary.src}
                  alt={gallerySecondary.alt ?? ""}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
              )}
            </MediaFrame>
          </ScrollReveal>
        </div>

        {/* Fila 3 — leyenda */}
        {galleryCaption && (
          <p className="hero-gallery-caption">{galleryCaption}</p>
        )}
      </div>
    </section>
  )
}

export default Hero
