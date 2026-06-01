import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

export type MaterialSlide = {
  id: string
  label: string
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
    id: "altos-brillos",
    label: "Altos brillos",
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
    src: "/images/material-chapa-madera.png",
    alt: "Chapa de madera natural",
  },
  {
    id: "hpl",
    label: "HPL",
    src: "/images/material-hpl.png",
    alt: "Laminado HPL en aplicación interior",
  },
  {
    id: "lite-super-mate",
    label: "Lite super mate",
    src: "/images/material-lite-super-mate.png",
    alt: "Acabado lite super mate",
  },
  {
    id: "lite-texturas",
    label: "Lite texturas",
    src: "/images/material-lite-texturas.png",
    alt: "Acabado lite con texturas",
  },
  {
    id: "melamina",
    label: "Melamina",
    src: "/images/material-melamina.png",
    alt: "Melamina en mobiliario a medida",
  },
]

const MaterialCard = ({ slide }: { slide: MaterialSlide }) => (
  <div className="materials-carousel-slide group">
    <div className="materials-carousel-card">
      <img src={slide.src} alt={slide.alt} loading="lazy" />
      <div
        className={cn(
          "absolute inset-0 flex items-end justify-center",
          "bg-(--color-overlay-hero)",
          "opacity-100 transition-opacity duration-300 ease-in-out",
          "lg:opacity-0 lg:group-hover:opacity-100"
        )}
        aria-hidden={false}
      >
        <p className="font-inter m-0 px-4 pb-6 text-center text-lg text-white md:text-xl">
          {slide.label}
        </p>
      </div>
    </div>
  </div>
)

const Materials = ({
  className,
  title = "Materiales y acabados",
  slides = defaultSlides,
  cta = { label: "CONSULTAR MATERIALES DISPONIBLES", href: "#materiales" },
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
    <section
      className={cn("section-block w-full overflow-hidden scroll-mt-20", className)}
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
            <Button as="a" href={cta.href} variant="primary" size="lg">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Materials
