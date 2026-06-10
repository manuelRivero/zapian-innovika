import * as React from "react"
import { SECTION_IDS } from "../../constants/links"
import { cn } from "../../utils/cn"
import ScrollReveal from "../ui/ScrollReveal"

export type ProcessStep = {
  id: string
  title: string
  description: string
}

export type ProcessStepsProps = {
  className?: string
  heading?: string
  steps?: ProcessStep[]
}

const defaultSteps: ProcessStep[] = [
  {
    id: "design",
    title: "1. DISEÑO Y DEFINICIÓN",
    description:
      "Recibimos tu diseño y validamos especificaciones técnicas.",
  },
  {
    id: "planning",
    title: "2. PLANEACIÓN Y COTIZACIÓN",
    description: "Definimos tiempos, costos y alcances de producción.",
  },
  {
    id: "production",
    title: "3. PRODUCCIÓN A LA MEDIDA",
    description: "Fabricación con control de calidad en cada etapa.",
  },
  {
    id: "delivery",
    title: "4. ENTREGA Y SOPORTE",
    description:
      "Coordinamos la entrega y el acompañamiento en postventa.",
  },
]

const ProcessSteps = ({
  className,
  heading = "Un proceso claro, de principio a fin",
  steps = defaultSteps,
}: ProcessStepsProps) => {
  return (
    <ScrollReveal
      as="section"
      animation="fade-up"
      className={cn("section-block w-full", className)}
      aria-labelledby={SECTION_IDS.comoTrabajamos}
    >
      <div className="container-layout flex flex-col gap-10 md:gap-12">
        <h2
          id={SECTION_IDS.comoTrabajamos}
          className="section-title scroll-target text-center"
        >
          {heading}
        </h2>

        <ol className="process-steps-grid m-0 list-none p-0">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                "process-step",
                index > 0 && "process-step--divider"
              )}
            >
              <h3 className="text-subtitle">
                {step.title}
              </h3>
              <p className="text-body">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </ScrollReveal>
  )
}

export default ProcessSteps
