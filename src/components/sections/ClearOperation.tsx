import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

export type ClearOperationCta = {
  label: string
  href: string
}

export type ClearOperationProps = {
  className?: string
  title?: string
  subtitle?: string
  items?: string[]
  imageSrc?: string
  imageAlt?: string
  cta?: ClearOperationCta
}

const defaultItems = [
  "Reduces errores y retrabajos",
  "Tienes visibilidad en cada etapa del proyecto",
  "Respaldas tu reputación con el cliente final",
  "Escala de la mano de Innovika",
]

const ClearOperation = ({
  className,
  title = "Operación clara",
  subtitle = "Ejecución confiable",
  items = defaultItems,
  imageSrc = "/images/clear-operation.png",
  imageAlt = "Operarios en planta de producción de carpintería industrial",
  cta = { label: "SOLICITAR COTIZACIÓN", href: "#contacto" },
}: ClearOperationProps) => {
  return (
    <section
      className={cn("section-block w-full", className)}
      aria-labelledby="clear-operation-title"
    >
      <div className="container-layout flex flex-col gap-8 md:gap-10">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Imagen — primero en móvil, columna derecha en desktop */}
          <ScrollReveal
            animation="fade-up"
            className="image-container order-1 min-h-[280px] w-full lg:order-2 lg:min-h-[520px]"
          >
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 size-full object-cover object-center"
                loading="lazy"
              />
            )}
          </ScrollReveal>

          {/* Tarjeta — segunda en móvil, columna izquierda en desktop */}
          <div className="order-2 flex lg:order-1">
            <div className="flex w-full flex-col rounded-(--radius-hero) bg-(--color-cream-50) px-6 py-8 md:px-10 md:py-10">
              <h2
                id="clear-operation-title"
                className="section-title section-title--with-subtitle"
              >
                {title}
              </h2>

              <p className="section-lead section-lead--muted mt-2">
                {subtitle}
              </p>

              <ul className="m-0 mt-5 flex list-none flex-col gap-0 p-0 md:mt-6">
                {items.map((item, index) => (
                  <ScrollReveal
                    key={item}
                    as="li"
                    animation="fade-up"
                    delay={index * 200}
                  >
                    <hr className="m-0 border-0 border-t border-(--color-neutral-700)/35" />
                    <p className="text-body py-3 md:py-3.5">
                      {item}
                    </p>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {cta && (
          <div className="flex justify-center">
            <Button as="a" href={cta.href} variant="primary" size="lg">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ClearOperation
