import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/sections/Hero"
import CarpinteriaMedida from "../components/sections/CarpinteriaMedida"
import ClearOperation from "../components/sections/ClearOperation"
import SpecializedManufacturing from "../components/sections/SpecializedManufacturing"
import Materials from "../components/sections/Materials"
import ProcessSteps from "../components/sections/ProcessSteps"
import CertifiedPartners from "../components/sections/CertifiedPartners"
import ContactForm from "../components/sections/ContactForm"
import CtaBanner from "../components/sections/CtaBanner"

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <Hero
      galleryPrimary={{
        src: "/images/hero-gallery-primary.png",
        alt: "Cocina moderna con isla y acabados en madera clara",
      }}
      gallerySecondary={{
        src: "/images/hero-gallery-secondary-56586a.png",
        alt: "Interior con mobiliario y acabados en madera",
      }}
    />
    <CarpinteriaMedida />
    <ClearOperation />
    <SpecializedManufacturing />
    <Materials />
    <ProcessSteps />
    <CertifiedPartners />
    <CtaBanner />
    <ContactForm />
  </Layout>
)

export const Head: HeadFC = () => (
  <Seo
    title="Fabricación de Carpintería Para tus Proyectos"
    description="Fabricamos cocinas, closets y carpintería a medida para arquitectos, desarrolladores e interioristas. Entregas confiables en todo México."
    image="/images/InnovikaMeta-02.jpg"
  />
)

export default IndexPage
