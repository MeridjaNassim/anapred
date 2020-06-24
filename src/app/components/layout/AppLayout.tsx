import React, { PropsWithChildren } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './AppBar'
import Box from "@material-ui/core/Box/Box"
import Drawer from './Drawer'
import { DrawerProvider } from '../../state/DrawerContext';
interface Props {

}

const AppLayout = (props: PropsWithChildren<Props>) => {
    return (
        <>
        <CssBaseline></CssBaseline>
            <header>
                <DrawerProvider>
                    <AppBar></AppBar>
                    <Drawer></Drawer>
                </DrawerProvider>
                
            </header>
        <Box>
          <main style={{minHeight :"100vh"}}>{props.children}</main>
          <Box component="footer">
          © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Box>
        </Box>
      </>
    )
}

export default AppLayout
