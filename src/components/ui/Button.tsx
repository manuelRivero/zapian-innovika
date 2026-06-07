import * as React from "react"
import { cn } from "../../utils/cn"

const variants = {
  /** CTA principal — burdeos + crema (header CONTACTO) */
  primary:
    "bg-(--color-brand-burgundy) text-(--color-brand-cream) border border-transparent " +
    "hover:bg-(--color-burgundy-700) active:opacity-95",
  /** Píldoras de navegación del header */
  nav:
    "bg-(--color-brand-cream) text-(--color-brand-bronze) border border-transparent " +
    "hover:brightness-[0.97] active:opacity-95",
  accent:
    "bg-(--color-accent-100) text-(--color-text-brand) border border-transparent " +
    "hover:bg-(--color-accent-200) active:opacity-95",
  secondary:
    "bg-(--color-cream-300) text-(--color-text-on-cream) border border-transparent " +
    "hover:bg-(--color-cream-200) active:opacity-95",
  outline:
    "bg-transparent text-(--color-brand-burgundy) border border-(--color-brand-burgundy) " +
    "hover:bg-(--color-burgundy-100) active:opacity-95",
  ghost:
    "bg-transparent text-(--color-brand-burgundy) border border-transparent " +
    "hover:bg-(--color-burgundy-100) active:opacity-95",
} as const

const sizes = {
  /** Píldoras secundarias (nav del header, CTAs accent/nav en secciones) */
  nav: "h-10 min-h-10 px-5 py-2 gap-1.5 text-sm leading-snug",
  sm: "h-8 min-h-8 px-4 text-xs gap-1.5",
  md: "h-10 min-h-10 px-5 py-2 gap-1.5 text-sm leading-snug",
  /** CTA principal (Contacto del header, HABLEMOS, etc.) */
  lg: "h-12 min-h-12 px-7 py-3 gap-2 text-sm leading-snug",
} as const

const shapes = {
  default: "",
  pill: "rounded-full",
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes
export type ButtonShape = keyof typeof shapes

type ButtonOwnProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"]

type PolymorphicProps<C extends React.ElementType> = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "as"> & {
    as?: C
  }

const Spinner = () => (
  <svg
    className="size-4 shrink-0 animate-spin"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.25"
    />
    <path
      d="M14 8a6 6 0 0 0-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

function ButtonInner<C extends React.ElementType = "button">(
  {
    as,
    variant = "primary",
    size = "md",
    shape = "default",
    loading = false,
    disabled,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className,
    type,
    ...props
  }: PolymorphicProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as || "button"
  const isDisabled = Boolean(disabled || loading)
  const isNativeButton = Component === "button"
  const resolvedShape =
    shape === "default" &&
    (variant === "primary" ||
      variant === "nav" ||
      variant === "accent" ||
      variant === "secondary")
      ? "pill"
      : shape

  return (
    <Component
      ref={ref}
      type={isNativeButton ? (type ?? "button") : undefined}
      disabled={isNativeButton ? isDisabled : undefined}
      aria-disabled={!isNativeButton && isDisabled ? true : undefined}
      className={cn(
        "inline-flex items-center justify-center",
        "font-ui text-cta-label",
        "transition-colors duration-150 ease-in-out",
        "cursor-pointer select-none whitespace-nowrap",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-burgundy)",
        variants[variant],
        sizes[size],
        shapes[resolvedShape],
        fullWidth && "w-full",
        isDisabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && (
        <span className={cn(loading && "sr-only")}>{children}</span>
      )}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </Component>
  )
}

const Button = React.forwardRef(ButtonInner) as <
  C extends React.ElementType = "button",
>(
  props: PolymorphicProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null

export default Button
