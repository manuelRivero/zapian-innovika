import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

export type HeroGallerySlot = {
  /** Ruta de la imagen cuando la agregues manualmente */
  src?: string
  alt?: string
}

export type HeroCta = {
  label: string
  href: string
}

export type HeroProps = {
  className?: string
  /** Líneas del título (sans, mayúsculas). Por defecto 3 líneas como en el diseño. */
  titleLines?: string[]
  subtitle?: string
  cta?: HeroCta
  /** Ruta del video de fondo (mp4/webm). Déjalo vacío hasta colocar el archivo. */
  videoSrc?: string
  videoPoster?: string
  galleryPrimary?: HeroGallerySlot
  gallerySecondary?: HeroGallerySlot
  galleryCaption?: string
}

const defaultTitleLines = [
  "PRODUCCIÓN",
  "A LA MEDIDA PARA",
  "TUS PROYECTOS",
]

/**
 * Contenedor con border-radius del hero. Coloca la imagen o video así:
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
  videoSrc,
  videoPoster,
  galleryPrimary,
  gallerySecondary,
  galleryCaption = "",
}: HeroProps) => {
  return (
    <section
      className={cn("w-full py-5 md:py-6", className)}
      aria-label="Presentación"
    >
      <div className="container-layout flex flex-col gap-(--spacing-hero-row)">
        {/* Fila 1 — imagen/video + overlay + copy (Figma: 1212×658) */}
        <div className="hero-media hero-banner relative w-full">
          {videoSrc ? (
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={videoPoster}
              aria-hidden="true"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <>
              {/*
                Video de fondo — descomenta y ajusta la ruta:
                <video
                  className="absolute inset-0 size-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/videos/hero-poster.jpg"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              */}
              {videoPoster ? (
                <img
                  src={videoPoster}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  aria-hidden="true"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-(--color-neutral-600)"
                  aria-hidden="true"
                />
              )}
            </>
          )}

          <div
            className="absolute inset-0 bg-(--color-overlay-hero)"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center px-6 py-12 text-center md:px-10 md:py-12">
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

        {/* Fila 2 — imágenes (2:1 → columna en móvil) */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-stretch">
            <MediaFrame
              slotLabel="gallery-primary"
              aspectClassName="aspect-[16/10] min-h-[220px] md:min-h-[280px] lg:min-h-[320px]"
            >
              {galleryPrimary?.src ? (
                <img
                  src={galleryPrimary.src}
                  alt={galleryPrimary.alt ?? ""}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
              ) : (
                /*
                  Imagen principal (≈70% del ancho en desktop):
                  <img
                    src="/images/hero-gallery-1.jpg"
                    alt="Descripción"
                    className="absolute inset-0 size-full object-cover"
                  />
                */
                null
              )}
            </MediaFrame>

            <MediaFrame
              slotLabel="gallery-secondary"
              aspectClassName="aspect-[4/5] min-h-[260px] lg:aspect-auto lg:min-h-0 lg:h-full"
              className="h-full"
            >
              {gallerySecondary?.src ? (
                <img
                  src={gallerySecondary.src}
                  alt={gallerySecondary.alt ?? ""}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
              ) : (
                /*
                  Imagen secundaria (≈30% del ancho en desktop):
                  <img
                    src="/images/hero-gallery-2.jpg"
                    alt="Descripción"
                    className="absolute inset-0 size-full object-cover"
                  />
                */
                null
              )}
            </MediaFrame>
        </div>

        {/* Fila 3 — leyenda */}
        {galleryCaption && (
          <p className="m-0 font-serif text-base text-(--color-text-primary)">
            {galleryCaption}
          </p>
        )}
      </div>
    </section>
  )
}

export default Hero
