import * as React from "react"
import { cn } from "../../utils/cn"

const variants = {
  fuschia: "bg-(--color-bg-brand) text-(--color-fuschia-100)",
  iris:    "bg-(--color-bg-brand-alt) text-(--color-iris-100)",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger:  "bg-red-50 text-red-600",
  neutral: "bg-(--color-neutral-100) text-(--color-text-secondary)",
}

/**
 * Badge — indicador de estado, conteo o categoría.
 * Más pequeño y sin interacción que Chip.
 *
 * @param {"fuschia"|"iris"|"success"|"warning"|"danger"|"neutral"} variant
 * @param {"sm"|"md"} size
 * @param {React.ReactNode} dot — muestra un punto de color antes del texto
 */
const Badge = function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  className,
  ...props
}) {
  const sizes = {
    sm: "h-4 px-1.5 text-[10px] gap-1 rounded-(--radius-sm)",
    md: "h-5 px-2 text-xs gap-1 rounded-(--radius-sm)",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold shrink-0",
        variants[variant] ?? variants.neutral,
        sizes[size] ?? sizes.md,
        className
      )}
      style={{ letterSpacing: "var(--letter-spacing-tight)" }}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      )}
      {children}
    </span>
  )
}

export default Badge
