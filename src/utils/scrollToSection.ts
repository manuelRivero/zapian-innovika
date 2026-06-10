const SCROLL_GAP_PX = 50

const getScrollOffset = (): number => {
  const header = document.querySelector<HTMLElement>(".site-header")

  if (header) {
    return header.getBoundingClientRect().height + SCROLL_GAP_PX
  }

  return 80
}

const findScrollAnchor = (target: HTMLElement): HTMLElement => {
  if (target.classList.contains("scroll-target")) {
    return target
  }

  const title = target.querySelector<HTMLElement>(".section-title.scroll-target")

  if (title) {
    return title
  }

  const heading = target.querySelector<HTMLElement>(".section-title, h2[id]")

  return heading ?? target
}

const performScrollToSection = (href: string): boolean => {
  if (!href.startsWith("#")) return false

  const id = href.slice(1)
  const target = document.getElementById(id)

  if (!target) return false

  const scrollAnchor = findScrollAnchor(target)
  const top =
    scrollAnchor.getBoundingClientRect().top + window.scrollY - getScrollOffset()

  window.scrollTo({ top, behavior: "smooth" })
  window.history.replaceState(null, "", href)
  return true
}

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  window.history.replaceState(null, "", "/")
}

type ScrollToSectionOptions = {
  /** Espera un frame de layout (p. ej. tras cerrar el menú móvil). */
  defer?: boolean
}

export const scrollToSection = (
  href: string,
  options?: ScrollToSectionOptions
): boolean => {
  if (!href.startsWith("#")) return false

  if (options?.defer) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performScrollToSection(href)
      })
    })
    return true
  }

  return performScrollToSection(href)
}
