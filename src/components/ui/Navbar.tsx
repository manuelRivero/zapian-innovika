import * as React from "react"
import { SECTION_IDS, sectionHref } from "../../constants/links"
import { cn } from "../../utils/cn"
import { scrollToSection } from "../../utils/scrollToSection"
import Button from "./Button"

const navItems = [
  { label: "Cómo trabajamos", href: sectionHref(SECTION_IDS.comoTrabajamos) },
  { label: "Proyectos", href: sectionHref(SECTION_IDS.proyectos) },
  { label: "Materiales", href: sectionHref(SECTION_IDS.materiales) },
] as const

const contactItem = {
  label: "Contacto",
  href: sectionHref(SECTION_IDS.contacto),
} as const

type NavbarProps = {
  className?: string
}

const BrandLogo = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) => (
  <a
    href="/"
    className="flex shrink-0 items-center no-underline"
    aria-label="Innovika — inicio"
    onClick={onClick}
  >
    <img
      src="/images/logo-innovika.png"
      alt=""
      className="h-9 w-auto"
      width={125}
      height={90}
      decoding="async"
    />
  </a>
)

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    className="size-5"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden="true"
  >
    {open ? (
      <path
        d="M5 5l12 12M5 17L17 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M3 6h16M3 11h16M3 16h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    )}
  </svg>
)

const Navbar = ({ className }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const closeMenu = () => setMenuOpen(false)

  React.useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 4)

      if (menuOpen && Math.abs(currentY - lastY) > 8) {
        closeMenu()
      }

      lastY = currentY
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [menuOpen])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (scrollToSection(href)) {
      event.preventDefault()
      closeMenu()
    }
  }

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", "/")
    closeMenu()
  }

  return (
    <header
      className={cn(
        "site-header",
        scrolled && "site-header--scrolled",
        className
      )}
    >
      <div className="container-layout">
        <nav
          className="grid min-h-[4.5rem] grid-cols-[1fr_auto] items-center gap-4 py-3 lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Navegación principal"
        >
          <BrandLogo onClick={handleLogoClick} />

          <div className="hidden items-center justify-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Button
                key={item.href}
                as="a"
                href={item.href}
                variant="nav"
                size="nav"
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 lg:col-start-3">
            <Button
              as="a"
              href={contactItem.href}
              variant="primary"
              size="lg"
              className="hidden shrink-0 lg:inline-flex"
              onClick={(event) => handleNavClick(event, contactItem.href)}
            >
              {contactItem.label}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "flex size-10 shrink-0 cursor-pointer items-center justify-center lg:hidden",
                "text-(--color-brand-burgundy) transition-colors duration-150"
              )}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div className="bg-(--color-bg-header) lg:hidden">
          <ul className="container-layout m-0 flex list-none flex-col gap-2 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Button
                  as="a"
                  href={item.href}
                  variant="nav"
                  size="nav"
                  fullWidth
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
            <li>
              <Button
                as="a"
                href={contactItem.href}
                variant="primary"
                size="lg"
                fullWidth
                onClick={(event) => handleNavClick(event, contactItem.href)}
              >
                {contactItem.label}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
