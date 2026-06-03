import * as React from "react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"
import ScrollReveal from "../ui/ScrollReveal"

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

const MIN_FIELD_LENGTH = 3
const EMAIL_API_URL = process.env.GATSBY_EMAIL_API
const MOCK_SEND_DELAY_MS = 900

type FormErrors = Partial<Record<keyof ContactFormData, string>>

const validateForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {}

  if (data.name.trim().length < MIN_FIELD_LENGTH) {
    errors.name = `Ingresa al menos ${MIN_FIELD_LENGTH} caracteres`
  }

  if (data.phone.trim().length < MIN_FIELD_LENGTH) {
    errors.phone = `Ingresa al menos ${MIN_FIELD_LENGTH} caracteres`
  }

  if (!data.projectType) {
    errors.projectType = "Selecciona una opción"
  }

  if (!data.hasDesign) {
    errors.hasDesign = "Selecciona una opción"
  }

  if (data.message.trim().length < MIN_FIELD_LENGTH) {
    errors.message = `Ingresa al menos ${MIN_FIELD_LENGTH} caracteres`
  }

  return errors
}

const submitContactForm = async (data: ContactFormData): Promise<void> => {
  if (!EMAIL_API_URL) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_SEND_DELAY_MS))
    return
  }

  const response = await fetch(EMAIL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Contact form submission failed")
  }
}

const SuccessIcon = () => (
  <svg
    className="contact-form-success__icon"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
    <path
      d="M14 24.5 21 31.5 34 18.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ContactForm = ({
  className,
  heading = "Cuéntanos sobre tu proyecto",
  projectTypeOptions = defaultProjectTypeOptions,
  designStatusOptions = defaultDesignStatusOptions,
  submitLabel = "ENVIAR",
  onSubmit,
}: ContactFormProps) => {
  const [form, setForm] = React.useState<ContactFormData>(initialFormState)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const updateField =
    (field: keyof ContactFormData) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value = event.target.value
      setForm((current) => ({ ...current, [field]: value }))
      setErrors((current) => {
        if (!current[field]) return current
        const { [field]: _, ...rest } = current
        return rest
      })
      setSubmitError(null)
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      await submitContactForm(form)
      onSubmit?.(form)
      setIsSuccess(true)
    } catch {
      setSubmitError(
        "No pudimos enviar tu mensaje en este momento. Por favor, inténtalo de nuevo."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollReveal
      as="section"
      animation="fade-up"
      id="contacto"
      className={cn("section-block w-full scroll-mt-20", className)}
      aria-labelledby="contact-form-heading"
    >
      <div className="container-layout">
        {isSuccess ? (
          <div
            className="contact-form-success mx-auto w-full max-w-3xl"
            role="status"
            aria-live="polite"
          >
            <SuccessIcon />
            <h2
              id="contact-form-heading"
              className="section-title section-title--with-subtitle text-center"
            >
              ¡Mensaje enviado!
            </h2>
            <p className="section-lead mt-2 text-center">
              Tu solicitud será atendida muy pronto
            </p>
            <p className="text-body contact-form-success__body text-center">
              Gracias por confiar en Innovika. Hemos recibido tu mensaje y nuestro
              equipo se pondrá en contacto contigo a la brevedad para acompañarte
              en tu proyecto.
            </p>
          </div>
        ) : (
          <>
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
              {submitError && (
                <p className="contact-form__submit-error" role="alert">
                  {submitError}
                </p>
              )}

              <div className="contact-form__row">
                <label htmlFor="contact-name" className="contact-form__label">
                  Nombre
                </label>
                <div className="contact-form__field-wrap">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Nombre completo"
                    className={cn(
                      "contact-form__field",
                      errors.name && "contact-form__field--error"
                    )}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <span
                      id="contact-name-error"
                      className="contact-form__field-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row">
                <label htmlFor="contact-phone" className="contact-form__label">
                  Teléfono (WhatsApp)
                </label>
                <div className="contact-form__field-wrap">
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="00 000 000"
                    className={cn(
                      "contact-form__field",
                      errors.phone && "contact-form__field--error"
                    )}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "contact-phone-error" : undefined
                    }
                  />
                  {errors.phone && (
                    <span
                      id="contact-phone-error"
                      className="contact-form__field-error"
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row">
                <label
                  htmlFor="contact-project-type"
                  className="contact-form__label"
                >
                  Tipo de proyecto
                </label>
                <div className="contact-form__field-wrap">
                  <div className="contact-form__select-wrap">
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={form.projectType}
                      onChange={updateField("projectType")}
                      className={cn(
                        "contact-form__field contact-form__select",
                        errors.projectType && "contact-form__field--error"
                      )}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={
                        errors.projectType
                          ? "contact-project-type-error"
                          : undefined
                      }
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
                  {errors.projectType && (
                    <span
                      id="contact-project-type-error"
                      className="contact-form__field-error"
                    >
                      {errors.projectType}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row">
                <label
                  htmlFor="contact-has-design"
                  className="contact-form__label"
                >
                  ¿Ya tienes diseño?
                </label>
                <div className="contact-form__field-wrap">
                  <div className="contact-form__select-wrap">
                    <select
                      id="contact-has-design"
                      name="hasDesign"
                      value={form.hasDesign}
                      onChange={updateField("hasDesign")}
                      className={cn(
                        "contact-form__field contact-form__select",
                        errors.hasDesign && "contact-form__field--error"
                      )}
                      aria-invalid={Boolean(errors.hasDesign)}
                      aria-describedby={
                        errors.hasDesign ? "contact-has-design-error" : undefined
                      }
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
                  {errors.hasDesign && (
                    <span
                      id="contact-has-design-error"
                      className="contact-form__field-error"
                    >
                      {errors.hasDesign}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row contact-form__row--textarea">
                <label htmlFor="contact-message" className="contact-form__label">
                  Mensaje
                </label>
                <div className="contact-form__field-wrap">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={updateField("message")}
                    placeholder="Cuéntanos de tu proyecto"
                    className={cn(
                      "contact-form__field contact-form__textarea",
                      errors.message && "contact-form__field--error"
                    )}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <span
                      id="contact-message-error"
                      className="contact-form__field-error"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__actions">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={isSubmitting}
                >
                  {submitLabel}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </ScrollReveal>
  )
}

export default ContactForm
