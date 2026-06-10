import * as React from "react"
import {
  ADDRESS,
  ADDRESS_MAPS_URL,
  PHONE_DISPLAY,
  PHONE_WHATSAPP_URL,
} from "../../constants/links"
import { cn } from "../../utils/cn"

export type FooterSocialLink = {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

export type FooterContactItem = {
  id: string
  label: string
  value: string
  href?: string
}

export type FooterProps = {
  className?: string
  logoSrc?: string
  logoAlt?: string
  contactItems?: FooterContactItem[]
  addressLabel?: string
  address?: string
  addressHref?: string
  socialLinks?: FooterSocialLink[]
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
    <path d="M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.5c0-2.2 1.3-3.5 3.4-3.5.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36V8.5Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
    <path d="M8.5 5.5h7A3 3 0 0 1 18.5 8.5v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Zm0 2A1 1 0 0 0 7.5 8.5v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-7Zm7.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Z" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
    <path d="M15.75 5.5c.55 1.15 1.45 2 2.75 2.2v2.55a5.2 5.2 0 0 1-2.75-.75v5.45a4.45 4.45 0 1 1-4.45-4.45c.25 0 .5.02.75.07v2.65a1.85 1.85 0 1 0 1.3 1.77V5.5h1.4Z" />
  </svg>
)

const defaultContactItems: FooterContactItem[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: PHONE_WHATSAPP_URL,
  },
  {
    id: "email",
    label: "Correo",
    value: "hola@innovika.com.mx",
    href: "mailto:hola@innovika.com.mx",
  },
]

const defaultSocialLinks: FooterSocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/espaciosbyinnovika/",
    icon: <FacebookIcon />,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/innovika",
    icon: <InstagramIcon />,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@innovika.mx",
    icon: <TikTokIcon />,
  },
]

const Footer = ({
  className,
  logoSrc = "/images/logo-innovika-full.png",
  logoAlt = "Innovika — Aliado de tus proyectos",
  contactItems = defaultContactItems,
  addressLabel = "Dirección",
  address = ADDRESS,
  addressHref = ADDRESS_MAPS_URL,
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "section-block w-full bg-(--color-bg-dark) text-(--color-text-inverse)",
        className
      )}
    >
      <div className="container-layout">
        <div className="footer-grid">
          <div className="footer-brand">
            <img
              src={logoSrc}
              alt={logoAlt}
              width={190}
              height={37}
              className="footer-brand__logo"
              loading="lazy"
              decoding="async"
            />
            <p className="footer-value">
              Cobertura en México
              <br />
              y Estados Unidos.
            </p>
          </div>

          <div className="footer-contact">
            {contactItems.map((item) => (
              <div key={item.id} className="footer-block">
                <p className="footer-label">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="footer-value footer-value--link">
                    {item.value}
                  </a>
                ) : (
                  <p className="footer-value">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="footer-location">
            <div className="footer-block">
              <p className="footer-label">{addressLabel}</p>
              <a
                href={addressHref}
                className="footer-value footer-value--address footer-value--link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </div>

            <ul className="footer-social m-0 list-none p-0">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="footer-social__link"
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
