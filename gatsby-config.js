/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

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
    siteUrl: `https://innovika.com`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
