import * as React from "react"
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
    title: "1. Diseño y definición",
    description:
      "Recibimos tu diseño y validamos especificaciones técnicas.",
  },
  {
    id: "planning",
    title: "2. Planeación y cotización",
    description: "Definimos tiempos, costos y alcances de producción.",
  },
  {
    id: "production",
    title: "3. Producción a la medida",
    description: "Fabricación con control de calidad en cada etapa.",
  },
  {
    id: "delivery",
    title: "4. Entrega y soporte",
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
      aria-labelledby="process-steps-heading"
    >
      <div className="container-layout flex flex-col gap-10 md:gap-12">
        <h2
          id="process-steps-heading"
          className="section-title text-center"
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
