import React, { ReactElement, createContext, PropsWithChildren } from 'react'
import { useMediaQuery } from '@material-ui/core'


// /* Extra small devices (phones, 600px and down) */
// @media only screen and (max-width: 600px) {...}

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (min-width: 600px) {...}

// /* Medium devices (landscape tablets, 768px and up) */
// @media only screen and (min-width: 768px) {...}

// /* Large devices (laptops/desktops, 992px and up) */
// @media only screen and (min-width: 992px) {...}

// /* Extra large devices (large laptops and desktops, 1200px and up) */
// @media only screen and (min-width: 1200px) {...}

interface ScreenSizeState {
    isExtraSmallScreen ?: boolean,
    isSmallScreen ?:boolean,
    isMediumScreen ?:boolean,
    isLargeScreen ?: boolean,
    isExtraLargeScreen ?: boolean
}


const initialState :ScreenSizeState = {
    isExtraLargeScreen : false,
    isSmallScreen : false,
    isMediumScreen : false,
    isLargeScreen : false ,
    isExtraSmallScreen : false
}


const ScreenSizeContext = createContext(initialState)
export default ScreenSizeContext

interface ProviderProps {

}
export const ScreenSizeProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=> {

    const isExtraSmallScreen = useMediaQuery("max-width: 600px")
    const isSmallScreen = useMediaQuery("min-width: 600px")
    const isMediumScreen = useMediaQuery("min-width: 768px")
    const isLargeScreen = useMediaQuery("min-width: 992px")
    const isExtraLargeScreen = useMediaQuery("min-width: 1200px")
    return <ScreenSizeContext.Provider
        value={
            {isExtraSmallScreen,
            isSmallScreen,
            isMediumScreen,
            isLargeScreen,
            isExtraLargeScreen}
        }

    >
        {props.children}
    </ScreenSizeContext.Provider>
}
