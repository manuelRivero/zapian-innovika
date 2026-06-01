/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const siteUrl =
  process.env.GATSBY_SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  (process.env.NODE_ENV === `development`
    ? `http://localhost:8000`
    : `https://innovika.com`)

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Innovika`,
    description: `Fabricamos cocinas, closets y carpintería a medida para arquitectos, desarrolladores e interioristas. Entregas confiables en todo México.`,
    keywords: `carpintería a medida, fabricación de cocinas, closets a medida, carpintería industrial, muebles para arquitectos, interiorismo corporativo, manufactura de muebles, carpintería México, Innovika, CNC madera, proyectos de arquitectura`,
    image: `/images/InnovikaMeta-02.jpg`,
    author: `@innovika`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Innovika`,
        short_name: `Innovika`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `static/images/android-chrome-512x512.png`,
        include_favicon: false,
        icons: [
          {
            src: `/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/images/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
}
