import * as React from "react"
import { SECTION_IDS, sectionHref } from "../../constants/links"
import { cn } from "../../utils/cn"
import { scrollToSection } from "../../utils/scrollToSection"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

export type CarpinteriaMedidaCta = {
  label: string
  href: string
}

export type CarpinteriaMedidaProps = {
  className?: string
  title?: string
  subtitle?: string
  tag?: string
  imageSrc?: string
  imageAlt?: string
  /** Encabezado de la columna de texto (mismo nivel que bloques en Fabricación especializada) */
  blockTitle?: string
  /** Contenido de la columna derecha (nodo Figma 5388:916) */
  children?: React.ReactNode
  cta?: CarpinteriaMedidaCta
}

const defaultBody = (
  <>
    <p className="text-body">
      Te ayudamos a ejecutar cada proyecto con claridad y respaldo técnico.
    </p>
    <p className="text-body">
      Fabricamos mobiliario residencial a la medida para profesionales que
      necesitan procesos confiables, visibilidad del avance y cumplimiento en
      tiempos.
    </p>
    <p className="text-body">
      Acompañamos cada proyecto con control de producción y soporte antes,
      durante y después de cada entrega.
    </p>
  </>
)

const CarpinteriaMedida = ({
  className,
  title = "Somos carpintería industrial a la medida",
  subtitle = "Convertimos diseño en producto terminado",
  tag = "CONOCE CÓMO TRABAJAMOS",
  imageSrc = "/images/carpinteria-a-medida.png",
  imageAlt = "Cocina con mobiliario a medida en madera y mármol",
  blockTitle = "Innovika es tu aliado en fabricación.",
  children = defaultBody,
  cta = { label: "HABLEMOS", href: "https://wa.link/7q5lio" },
}: CarpinteriaMedidaProps) => {
  const processSectionHref = sectionHref(SECTION_IDS.comoTrabajamos)

  const handleProcessScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (scrollToSection(href)) {
      event.preventDefault()
    }
  }

  return (
    <ScrollReveal
      as="section"
      animation="fade-up"
      className={cn("section-block w-full", className)}
      aria-labelledby="carpinteria-medida-title"
    >
      <div className="container-layout flex flex-col gap-8 md:gap-[60px]">
        <header className="flex flex-col items-center gap-3 text-center md:gap-5">
          <h2
            id="carpinteria-medida-title"
            className="section-title section-title--with-subtitle max-w-4xl text-center"
          >
            {title}
          </h2>

          <p className="section-lead mt-2 text-center">
            {subtitle}
          </p>

          {tag && (
            <Button
              as="a"
              href={processSectionHref}
              variant="accent"
              size="lg"
              className="mt-2 md:mt-8 lg:mt-[90px]"
              onClick={(event) => handleProcessScroll(event, processSectionHref)}
            >
              {tag}
            </Button>
          )}
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="image-container lg:h-[422px] h-auto w-full ">
            {imageSrc && <img style={{ objectFit: "cover", width:"100%", height:"100%" }} src={imageSrc} alt={imageAlt} loading="lazy" />}
          </div>

          <div className="flex flex-col gap-5">
            {blockTitle && (
              <h3 className="text-subtitle text-subtitle--brand">
                {blockTitle}
              </h3>
            )}
            <div className="flex flex-col gap-4">{children}</div>
          </div>
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
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </ScrollReveal>
  )
}

export default CarpinteriaMedida
