import * as React from "react"
import { cn } from "../../utils/cn"

const variants = {
  fuschia: "bg-(--color-bg-brand) text-(--color-fuschia-100) border border-(--color-fuschia-60)",
  iris:    "bg-(--color-bg-brand-alt) text-(--color-iris-100) border border-(--color-iris-60)",
  neutral: "bg-(--color-neutral-100) text-(--color-text-secondary) border border-(--color-border-default)",
  solid:   "bg-(--color-fuschia-100) text-(--color-text-inverse) border border-transparent",
}

const sizes = {
  sm: "h-6 px-2 text-xs gap-1 rounded-(--radius-full)",
  md: "h-8 px-3 text-sm gap-1.5 rounded-(--radius-full)",
  lg: "h-10 px-4 text-base gap-2 rounded-(--radius-full)",
}

/**
 * Chip / Tag — para categorías, filtros, estados y etiquetas.
 *
 * @param {"fuschia"|"iris"|"neutral"|"solid"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} interactive  — añade cursor pointer y hover state
 * @param {boolean} selected     — estado activo (toggle)
 * @param {Function} onDismiss   — si se pasa, muestra botón ×
 * @param {React.ReactNode} icon — icono a la izquierda
 */
const Chip = React.forwardRef(function Chip(
  {
    variant = "neutral",
    size = "md",
    interactive = false,
    selected = false,
    onDismiss,
    icon,
    children,
    className,
    onClick,
    ...props
  },
  ref
) {
  const isInteractive = interactive || !!onClick

  return (
    <span
      ref={ref}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => e.key === "Enter" && onClick?.(e) : undefined}
      className={cn(
        "inline-flex items-center justify-center font-medium shrink-0",
        "transition-all duration-150",
        variants[selected ? "solid" : variant] ?? variants.neutral,
        sizes[size] ?? sizes.md,
        isInteractive && "cursor-pointer hover:opacity-80 active:opacity-70",
        className
      )}
      style={{ letterSpacing: "var(--letter-spacing-tight)" }}
      {...props}
    >
      {icon && <span className="shrink-0 leading-none">{icon}</span>}
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDismiss(e) }}
          className="shrink-0 ml-0.5 opacity-60 hover:opacity-100 cursor-pointer leading-none"
          aria-label="Eliminar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </span>
  )
})

export default Chip
