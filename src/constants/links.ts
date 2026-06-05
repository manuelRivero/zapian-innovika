export const WHATSAPP_URL = "https://wa.link/hvyype"

export const PHONE_DISPLAY = "33 3552 0580"

export const PHONE_WHATSAPP_URL = "https://wa.me/523335520580"

export const ADDRESS =
  "Av. Paseo del Nte. 5605, Guadalajara, Technology Park"

export const ADDRESS_MAPS_URL =
  "https://www.google.com/maps/place/Innovika/@20.728525,-103.4972451,17z/data=!3m1!4b1!4m6!3m5!1s0x8428aecb00b8b7eb:0x231e274555020960!8m2!3d20.728525!4d-103.4972451!16s%2Fg%2F1v1kq5bl?hl=es&entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"

export const INSTAGRAM_URL = "https://www.instagram.com/innovika/"

export const SECTION_IDS = {
  comoTrabajamos: "como-trabajamos",
  proyectos: "proyectos",
  materiales: "materiales",
  contacto: "contacto",
} as const

export const sectionHref = (id: string) => `#${id}` as const
