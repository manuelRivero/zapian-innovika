import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

export type CtaBannerCta = {
  label: string
  href: string
}

export type CtaBannerProps = {
  className?: string
  title?: string
  subtitle?: string
  imageSrc?: string
  imageAlt?: string
  cta?: CtaBannerCta
}

const CtaBanner = ({
  className,
  title = "Empieza a fabricar con un aliado confiable",
  subtitle =
    "Trabaja con un sistema de producción que te da mayor control, claridad y respaldo.",
  imageSrc = "/images/banner.png",
  imageAlt = "Planta de producción de carpintería industrial",
  cta = { label: "HABLEMOS DE TU PROYECTO", href: "#contacto" },
}: CtaBannerProps) => {
  return (
    <section
      className={cn("section-block w-full", className)}
      aria-labelledby="cta-banner-heading"
    >
      <div className="container-layout">
        <div className="cta-banner">
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 size-full object-cover object-center"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />

          <div className="cta-banner__overlay" aria-hidden="true" />

          <div className="cta-banner__content">
            <h2
              id="cta-banner-heading"
              className="section-title section-title--inverse section-title--with-subtitle max-w-3xl text-center"
            >
              {title}
            </h2>

            <p className="section-lead section-lead--inverse mt-2 max-w-2xl text-center md:mt-3">
              {subtitle}
            </p>

            {cta && (
              <Button
                as="a"
                href={cta.href}
                variant="nav"
                size="lg"
                className="mt-6 md:mt-8"
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
