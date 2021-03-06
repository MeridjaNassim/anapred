const config= require('dotenv').config({
  path : `.env.${process.env.NODE_ENV}`
})
module.exports = {
  siteMetadata: {
    title: `Gatsby TypeScript PWA`,
    description: `Kick off your next, great Gatsby project with this default typescript PWA . This barebones starter ships with the minimum Gatsby configuration files you might need.`,
    author: `@MeridjaNassim`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#1174EF`,
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASURMENT_ID
        },
        
      },
    }
    ,
    {
      resolve: `gatsby-plugin-manifest`,
      
      options: {
        name: `AnaPred`,
        short_name: `anapred`,
        start_url: `/`,
        background_color: `#1174EF`,
        theme_color: `#1174EF`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
