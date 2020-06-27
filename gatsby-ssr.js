/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import 'firebase/auth'
import 'firebase/firestore'
import './src/styles/global.css'
import React from 'react'
import {ScreenSizeProvider} from './src/app/state/ScreenSizeContext'
import { ConnexionProvider } from "./src/app/state/ConnexionContext"
export const wrapRootElement = ({ element }) => {
    return (
      <ConnexionProvider>
        <ScreenSizeProvider>{element}</ScreenSizeProvider>
      </ConnexionProvider>
    )
  }
  