import React, { ReactElement, createContext, PropsWithChildren, useLayoutEffect, useState } from 'react'


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

interface ConnexionState {
    isConnected : boolean
}


const initialState :ConnexionState = {
   isConnected : true
}


const ConnexionContext = createContext(initialState)
export default ConnexionContext

interface ProviderProps {

}
export const ConnexionProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=> {

    const [isConnected , setIsConnected] =useState(true)
    useLayoutEffect(() => {
       
       if(typeof window !== undefined) {
           window.addEventListener('offline',(ev : Event)=> {
                setIsConnected(false)
           })
           window.addEventListener('online',(ev : Event)=> {
            setIsConnected(true)
       })
       }    
    }, [])
    return <ConnexionContext.Provider
        value={
           {
               isConnected
           }
        }

    >
        {props.children}
    </ConnexionContext.Provider>
}