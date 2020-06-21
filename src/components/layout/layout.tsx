/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from "@material-ui/core/Box/Box"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <CssBaseline></CssBaseline>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Box>
        <main style={{minHeight :"100vh"}}>{children}</main>
        <Box component="footer">
        © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Box>
      </Box>
    </>
  )
}


export default Layout
