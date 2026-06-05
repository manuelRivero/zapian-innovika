import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

export type MaterialSlide = {
  id: string
  label: string
  labelLines?: string[]
  src: string
  alt: string
}

export type MaterialsCta = {
  label: string
  href: string
}

export type MaterialsProps = {
  className?: string
  title?: string
  slides?: MaterialSlide[]
  cta?: MaterialsCta
}

const defaultSlides: MaterialSlide[] = [
  {
    id: "hpl",
    label: "HPL",
    src: "/images/material-hpl.png",
    alt: "Laminado HPL en aplicación interior",
  },
  {
    id: "lite-super-mate",
    label: "Lite super mate",
    labelLines: ["Lite super", "mate"],
    src: "/images/material-lite-super-mate.png",
    alt: "Acabado lite super mate",
  },
  {
    id: "lite-texturas",
    label: "Lite texturas",
    labelLines: ["Lite", "texturas"],
    src: "/images/material-lite-texturas.png",
    alt: "Acabado lite con texturas",
  },
  {
    id: "melamina",
    label: "Melamina",
    src: "/images/material-melamina.png",
    alt: "Melamina en mobiliario a medida",
  },
  {
    id: "altos-brillos",
    label: "Altos brillos",
    labelLines: ["Altos", "brillos"],
    src: "/images/material-altos-brillos.png",
    alt: "Acabado de altos brillos en mobiliario",
  },
  {
    id: "aluminio",
    label: "Aluminio",
    src: "/images/material-aluminio.png",
    alt: "Perfiles y acabados en aluminio",
  },
  {
    id: "laca",
    label: "Laca",
    src: "/images/material-laca.png",
    alt: "Superficie lacada en mobiliario",
  },
  {
    id: "chapa-madera",
    label: "Chapa de madera",
    labelLines: ["Chapa de", "madera"],
    src: "/images/material-chapa-madera.png",
    alt: "Chapa de madera natural",
  },
]

const MaterialCard = ({ slide }: { slide: MaterialSlide }) => {
  const lines = slide.labelLines ?? [slide.label]

  return (
    <div className="materials-carousel-slide group">
      <div className="materials-carousel-card">
        <img src={slide.src} alt={slide.alt} loading="lazy" />
        <div
          className={cn(
            "materials-carousel-card__overlay",
            "opacity-100 transition-opacity duration-300 ease-in-out",
            "lg:opacity-0 lg:group-hover:opacity-100"
          )}
        >
          <p className="materials-carousel-card__label">
            {lines.map((line, index) => (
              <React.Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

const Materials = ({
  className,
  title = "Materiales y acabados",
  slides = defaultSlides,
  cta = {
    label: "CONSULTAR MATERIALES DISPONIBLES",
    href: "/documents/materiales.pdf",
  },
}: MaterialsProps) => {
  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin]
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <ScrollReveal
      as="section"
      animation="fade-up"
      className={cn("section-block scroll-target w-full overflow-hidden", className)}
      aria-labelledby="materials-title"
      id="materiales"
    >
      <div className="container-layout flex flex-col gap-8 md:gap-10">
        <h2
          id="materials-title"
          className="section-title text-center"
        >
          {title}
        </h2>

        <div className="materials-carousel">
          <div className="materials-carousel-viewport" ref={emblaRef}>
            <div className="materials-carousel-track">
              {slides.map((slide) => (
                <MaterialCard key={slide.id} slide={slide} />
              ))}
            </div>
          </div>

          {scrollSnaps.length > 1 && (
            <div
              className="materials-carousel-dots"
              role="tablist"
              aria-label="Slides del carousel de materiales"
            >
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Ir al material ${index + 1}`}
                  className={cn(
                    "materials-carousel-dot",
                    index === selectedIndex && "materials-carousel-dot--active"
                  )}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>

        {cta && (
          <div className="flex justify-center pt-2">
            <Button
              as="a"
              href={cta.href}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </ScrollReveal>
  )
}

export default Materials
