import { createContext, ReactElement, PropsWithChildren, Children, useState } from "react"
import React from "react"

const initialState = {
   selectedOnglet :"dashboard",
   setSelectedOnglet : (onglet : string)=>{},
}


const OngletContext = React.createContext(initialState)

interface ProviderProps {

}
export default OngletContext
export const OngletProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{
    const [selectedOnglet , setSelectedOnglet] = useState('dashboard')
    
    return <OngletContext.Provider
            value={
              {
                selectedOnglet,
                setSelectedOnglet
              }
            }
        >
            {props.children}
    </OngletContext.Provider>
}