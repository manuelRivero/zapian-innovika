import * as React from "react"
import { cn } from "../../utils/cn"

// ─── Card Root ────────────────────────────────────────────────────────────────
/**
 * @param {"default"|"elevated"|"outline"|"flat"} variant
 * @param {boolean} hoverable  — añade hover shadow y cursor pointer
 * @param {boolean} clickable  — igual que hoverable pero con semántica de botón
 */
const Card = React.forwardRef(function Card(
  {
    variant = "default",
    hoverable = false,
    clickable = false,
    className,
    children,
    ...props
  },
  ref
) {
  const variants = {
    default:  "bg-(--color-bg-primary) border border-(--color-border-default) shadow-(--shadow-sm)",
    elevated: "bg-(--color-bg-primary) shadow-(--shadow-md) border-0",
    outline:  "bg-(--color-bg-primary) border-2 border-(--color-border-default) shadow-none",
    flat:     "bg-(--color-bg-secondary) border-0 shadow-none",
  }

  const interactive = hoverable || clickable

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-(--radius-xl) overflow-hidden",
        variants[variant] ?? variants.default,
        interactive && "transition-shadow duration-200 hover:shadow-(--shadow-md) cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Card.Image ───────────────────────────────────────────────────────────────
const CardImage = function CardImage({ src, alt = "", aspectRatio = "16/9", className, ...props }) {
  return (
    <div
      className={cn("w-full overflow-hidden bg-(--color-neutral-100)", className)}
      style={{ aspectRatio }}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

// ─── Card.Body ────────────────────────────────────────────────────────────────
const CardBody = function CardBody({ className, children, ...props }) {
  return (
    <div
      className={cn("p-4 flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Card.Title ───────────────────────────────────────────────────────────────
const CardTitle = function CardTitle({ className, children, as: Tag = "h3", ...props }) {
  return (
    <Tag
      className={cn(
        "text-xl font-bold text-(--color-text-primary) leading-snug",
        className
      )}
      style={{ letterSpacing: "var(--letter-spacing-tight)" }}
      {...props}
    >
      {children}
    </Tag>
  )
}

// ─── Card.Description ─────────────────────────────────────────────────────────
const CardDescription = function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={cn(
        "text-sm text-(--color-text-secondary) leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// ─── Card.Footer ─────────────────────────────────────────────────────────────
const CardFooter = function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-t border-(--color-border-default) flex items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Compose sub-components ───────────────────────────────────────────────────
Card.Image       = CardImage
Card.Body        = CardBody
Card.Title       = CardTitle
Card.Description = CardDescription
Card.Footer      = CardFooter

export default Card
