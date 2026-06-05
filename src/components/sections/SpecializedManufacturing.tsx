import * as React from "react"
import { INSTAGRAM_URL } from "../../constants/links"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

export type SpecializedManufacturingImage = {
  src: string
  alt: string
}

export type SpecializedManufacturingBlock = {
  id: string
  title: string
  subtitle: string
  footer: string
  images: SpecializedManufacturingImage[]
  /** Desktop: texto a la izquierda si true, a la derecha si false */
  textFirst?: boolean
}

export type SpecializedManufacturingCta = {
  label: string
  href: string
}

export type SpecializedManufacturingProps = {
  className?: string
  heading?: string
  blocks?: SpecializedManufacturingBlock[]
  cta?: SpecializedManufacturingCta
}

const defaultBlocks: SpecializedManufacturingBlock[] = [
  {
    id: "kitchens",
    title: "Altas cocinas",
    subtitle:
      "Integración precisa entre diseño, funcionalidad y fabricación.",
    footer: "Puerta Dublín en chapa de encino natural",
    textFirst: true,
    images: [
      {
        src: "/images/specialized-kitchen-1.png",
        alt: "Detalle de cocina con vitrina y madera clara",
      },
      {
        src: "/images/specialized-kitchen-2.png",
        alt: "Cocina con isla y acabados en madera",
      },
    ],
  },
  {
    id: "closets",
    title: "Clósets y vestidores",
    subtitle:
      "Soluciones a la medida que combinan orden, diseño y calidad.",
    footer: "Puertas Hermitage | Luveca en laca blanca mate",
    textFirst: false,
    images: [
      {
        src: "/images/specialized-closets.png",
        alt: "Vestidor con puertas blancas y suelo de madera",
      },
    ],
  },
  {
    id: "doors",
    title: "Puertas de intercomunicación",
    subtitle:
      "Fabricación con continuidad visual y consistencia en acabados.",
    footer: "Puertas con jamba o marco interno",
    textFirst: true,
    images: [
      {
        src: "/images/specialized-doors.png",
        alt: "Puertas de intercomunicación en distintos acabados de madera",
      },
    ],
  },
  {
    id: "more-spaces",
    title: "Más ambientes…",
    subtitle:
      "Muebles de baño, muebles de TV, bares, cavas, escritorios y otros espacios.",
    footer: "Panel ranurado Arauco Roble Mérida",
    textFirst: false,
    images: [
      {
        src: "/images/specialized-tv-unit.png",
        alt: "Mueble de TV con panel de mármol y madera",
      },
      {
        src: "/images/specialized-shelving.png",
        alt: "Estantería empotrada con libros y objetos decorativos",
      },
    ],
  },
]

const BlockText = ({
  title,
  subtitle,
  footer,
  titleId,
}: Pick<SpecializedManufacturingBlock, "title" | "subtitle" | "footer"> & {
  titleId?: string
}) => (
  <div className="flex h-full w-full flex-col gap-2 lg:min-h-(--size-specialized-img-sm) lg:justify-between lg:gap-0">
    <div className="flex flex-col gap-2 lg:gap-3">
      <h3
        id={titleId}
        className="text-subtitle uppercase"
      >
        {title}
      </h3>
      <p className="text-body">
        {subtitle}
      </p>
    </div>
    <ScrollReveal animation="fade-right">
      <p className="text-body-emphasis">
        {footer}
      </p>
    </ScrollReveal>
  </div>
)

const BlockMedia = ({
  images,
}: {
  images: SpecializedManufacturingImage[]
}) => {
  const isWide = images.length === 1

  if (isWide) {
    return (
      <ScrollReveal
        animation="fade-right"
        className="image-container specialized-media-wide"
      >
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="absolute inset-0 size-full object-cover object-center"
          loading="lazy"
        />
      </ScrollReveal>
    )
  }

  return (
    <div className="specialized-media-pair">
      {images.map((image, index) => (
        <ScrollReveal
          key={image.src}
          animation="fade-right"
          delay={index === 1 ? 200 : 0}
          className="image-container specialized-media-square"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 size-full object-cover object-center"
            loading="lazy"
          />
        </ScrollReveal>
      ))}
    </div>
  )
}

const ManufacturingBlock = ({
  block,
}: {
  block: SpecializedManufacturingBlock
}) => {
  const textFirst = block.textFirst ?? true

  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-6 lg:items-stretch lg:gap-10",
        textFirst ? "lg:grid-cols-[4fr_6fr]" : "lg:grid-cols-[6fr_4fr]"
      )}
      aria-labelledby={`specialized-${block.id}-title`}
    >
      {/* Texto primero en móvil; alterna en desktop */}
      <div
        className={cn(
          "order-1 lg:flex lg:h-full",
          textFirst ? "lg:order-1" : "lg:order-2"
        )}
      >
        <BlockText
          titleId={`specialized-${block.id}-title`}
          title={block.title}
          subtitle={block.subtitle}
          footer={block.footer}
        />
      </div>

      {/* Imágenes después del texto en móvil */}
      <div
        className={cn(
          "order-2",
          textFirst ? "lg:order-2" : "lg:order-1"
        )}
      >
        <BlockMedia images={block.images} />
      </div>
    </article>
  )
}

const SpecializedManufacturing = ({
  className,
  heading = "Fabricación especializada para cada espacio",
  blocks = defaultBlocks,
  cta = { label: "VER MÁS DE NUESTRO TRABAJO", href: INSTAGRAM_URL },
}: SpecializedManufacturingProps) => {
  return (
    <section
      id="proyectos"
      className={cn("section-block scroll-target w-full", className)}
      aria-labelledby="specialized-manufacturing-heading"
    >
      <div className="container-layout flex flex-col gap-10 md:gap-14">
        <h2
          id="specialized-manufacturing-heading"
          className="section-title text-center"
        >
          {heading}
        </h2>

        <div className="flex flex-col gap-12 md:gap-16">
          {blocks.map((block) => (
            <ManufacturingBlock key={block.id} block={block} />
          ))}
        </div>

        {cta && (
          <div className="flex justify-center pt-2">
            <Button
              as="a"
              href={cta.href}
              variant="accent"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default SpecializedManufacturing
