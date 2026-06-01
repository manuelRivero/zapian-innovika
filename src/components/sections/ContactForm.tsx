import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

export type ProjectTypeOption = {
  value: string
  label: string
}

export type DesignStatusOption = {
  value: string
  label: string
}

export type ContactFormData = {
  name: string
  phone: string
  projectType: string
  hasDesign: string
  message: string
}

export type ContactFormProps = {
  className?: string
  heading?: string
  projectTypeOptions?: ProjectTypeOption[]
  designStatusOptions?: DesignStatusOption[]
  submitLabel?: string
  onSubmit?: (data: ContactFormData) => void
}

const defaultProjectTypeOptions: ProjectTypeOption[] = [
  { value: "cocina", label: "Cocina" },
  { value: "closet", label: "Clóset" },
  { value: "mueble-bano", label: "Mueble de baño" },
  { value: "puertas-intercomunicacion", label: "Puertas de intercomunicación" },
  { value: "proyecto-completo", label: "Proyecto completo" },
  { value: "otro", label: "Otro" },
]

const defaultDesignStatusOptions: DesignStatusOption[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "en-proceso", label: "En proceso" },
]

const initialFormState: ContactFormData = {
  name: "",
  phone: "",
  projectType: "",
  hasDesign: "",
  message: "",
}

const ContactForm = ({
  className,
  heading = "Cuéntanos sobre tu proyecto",
  projectTypeOptions = defaultProjectTypeOptions,
  designStatusOptions = defaultDesignStatusOptions,
  submitLabel = "ENVIAR",
  onSubmit,
}: ContactFormProps) => {
  const [form, setForm] = React.useState<ContactFormData>(initialFormState)

  const updateField =
    (field: keyof ContactFormData) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(form)
  }

  return (
    <section
      id="contacto"
      className={cn("section-block w-full scroll-mt-20", className)}
      aria-labelledby="contact-form-heading"
    >
      <div className="container-layout">
        <h2
          id="contact-form-heading"
          className="section-title text-center"
        >
          {heading}
        </h2>

        <form
          className="contact-form mx-auto w-full max-w-3xl"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="contact-form__row">
            <label htmlFor="contact-name" className="contact-form__label">
              Nombre
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={updateField("name")}
              placeholder="Nombre completo"
              className="contact-form__field"
            />
          </div>

          <div className="contact-form__row">
            <label htmlFor="contact-phone" className="contact-form__label">
              Teléfono (WhatsApp)
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={updateField("phone")}
              placeholder="00 000 000"
              className="contact-form__field"
            />
          </div>

          <div className="contact-form__row">
            <label htmlFor="contact-project-type" className="contact-form__label">
              Tipo de proyecto
            </label>
            <div className="contact-form__select-wrap">
              <select
                id="contact-project-type"
                name="projectType"
                required
                value={form.projectType}
                onChange={updateField("projectType")}
                className="contact-form__field contact-form__select"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="contact-form__row">
            <label htmlFor="contact-has-design" className="contact-form__label">
              ¿Ya tienes diseño?
            </label>
            <div className="contact-form__select-wrap">
              <select
                id="contact-has-design"
                name="hasDesign"
                required
                value={form.hasDesign}
                onChange={updateField("hasDesign")}
                className="contact-form__field contact-form__select"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {designStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="contact-form__row contact-form__row--textarea">
            <label htmlFor="contact-message" className="contact-form__label">
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={updateField("message")}
              placeholder="Cuéntanos de tu proyecto"
              className="contact-form__field contact-form__textarea"
            />
          </div>

          <div className="contact-form__actions">
            <Button type="submit" variant="accent" size="lg">
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
