import * as React from "react"
import { cn } from "../../utils/cn"

/**
 * Input — campo de texto con soporte para label, hint, error, iconos y estados.
 *
 * @param {"md"|"lg"} size
 * @param {string} label
 * @param {string} hint          — texto de ayuda debajo del input
 * @param {string} error         — mensaje de error (sobreescribe hint)
 * @param {React.ReactNode} leftIcon
 * @param {React.ReactNode} rightIcon
 * @param {boolean} fullWidth
 */
const Input = React.forwardRef(function Input(
  {
    size = "md",
    label,
    hint,
    error,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled = false,
    id,
    className,
    ...props
  },
  ref
) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
  const hasError = !!error

  const sizeStyles = {
    md: { wrapper: "h-10", input: "text-sm px-3", icon: "w-4 h-4" },
    lg: { wrapper: "h-12", input: "text-base px-4", icon: "w-5 h-5" },
  }
  const s = sizeStyles[size] ?? sizeStyles.md

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", className)}>

      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-(--color-text-primary)"
          style={{ letterSpacing: "var(--letter-spacing-tight)" }}
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className={cn("relative flex items-center", s.wrapper, fullWidth && "w-full")}>

        {/* Left icon */}
        {leftIcon && (
          <span className={cn(
            "absolute left-3 pointer-events-none text-(--color-text-tertiary)",
            s.icon
          )}>
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            "w-full h-full rounded-(--radius-md) font-sans",
            "bg-(--color-bg-primary) text-(--color-text-primary)",
            "border transition-colors duration-150 outline-none",
            s.input,
            // padding for icons
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            // border states
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-(--color-border-default) " +
                "focus:border-(--color-fuschia-100) focus:ring-2 focus:ring-(--color-fuschia-100)/20 " +
                "hover:border-(--color-border-strong)",
            disabled && "opacity-50 cursor-not-allowed bg-(--color-neutral-100)",
          )}
          style={{ letterSpacing: "var(--letter-spacing-tight)" }}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && (
          <span className={cn(
            "absolute right-3 pointer-events-none text-(--color-text-tertiary)",
            s.icon
          )}>
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error / Hint */}
      {(error || hint) && (
        <p
          id={error ? `${inputId}-error` : `${inputId}-hint`}
          className={cn(
            "text-xs",
            error ? "text-red-500" : "text-(--color-text-tertiary)"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
})

export default Input
