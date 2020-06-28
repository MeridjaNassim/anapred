/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "firebase/auth"
import "firebase/firestore"
import "./src/styles/global.css"
import React from "react"
import { ScreenSizeProvider } from "./src/app/state/ScreenSizeContext"
import { ConnexionProvider } from "./src/app/state/ConnexionContext"
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles"

export const wrapRootElement = ({ element }) => {
  let theme = createMuiTheme({
    palette: {
      primary: {
        main: "#1174EF",
      },
      secondary: {
        main: "#272c34",
      },
    },
  })
  theme = responsiveFontSizes(theme)
  return (
    <ThemeProvider theme={theme}>
      <ConnexionProvider>
        <ScreenSizeProvider>{element}</ScreenSizeProvider>
      </ConnexionProvider>
    </ThemeProvider>
  )
}
