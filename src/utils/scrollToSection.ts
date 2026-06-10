const getScrollOffset = () => {
  const rootStyles = getComputedStyle(document.documentElement)
  const offset = parseFloat(rootStyles.getPropertyValue("--scroll-offset"))

  return Number.isFinite(offset) ? offset : 80
}

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  window.history.replaceState(null, "", "/")
}

export const scrollToSection = (href: string): boolean => {
  if (!href.startsWith("#")) return false

  const id = href.slice(1)
  const target = document.getElementById(id)

  if (!target) return false

  const top =
    target.getBoundingClientRect().top + window.scrollY - getScrollOffset()

  window.scrollTo({ top, behavior: "smooth" })
  window.history.replaceState(null, "", href)
  return true
}
