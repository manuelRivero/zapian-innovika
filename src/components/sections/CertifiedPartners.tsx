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
    width: 330,
    height: 52,
  },
]

const CertifiedPartners = ({
  className,
  heading = "Aliados certificados",
  logos = defaultLogos,
}: CertifiedPartnersProps) => {
  const marqueeLogos = React.useMemo(
    () => [...logos, ...logos],
    [logos]
  )

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
        className="partners-marquee mt-8 md:mt-10"
        aria-label="Marcas aliadas certificadas"
      >
        <div className="partners-marquee__track">
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
                loading="lazy"
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
