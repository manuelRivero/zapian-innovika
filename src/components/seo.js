/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, keywords, image, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            image
            author
            siteUrl
          }
        }
      }
    `
  )

  const {
    title: siteTitle,
    description: siteDescription,
    keywords: siteKeywords,
    image: siteImage,
    siteUrl,
  } = site.siteMetadata

  const metaDescription = description || siteDescription
  const metaKeywords = keywords || siteKeywords
  const metaImage = image || siteImage
  const imageUrl = metaImage?.startsWith("http")
    ? metaImage
    : `${siteUrl.replace(/\/$/, "")}${metaImage}`

  const fullTitle = siteTitle ? `${title} | ${siteTitle}` : title

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      {metaImage && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={imageUrl} />}
      {children}
    </>
  )
}

export default Seo
