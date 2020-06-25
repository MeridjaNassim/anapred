import { createContext, ReactElement, PropsWithChildren, Children, useState, useEffect } from "react"
import React from "react"


type Route = "Dashboard" |"Patients"


interface OngletState {
  selectedOnglet : Route,
  setSelectedOnglet : (onglet : Route) => void
}
const initialState :OngletState = {
   selectedOnglet :"Dashboard",
   setSelectedOnglet : (onglet : string)=>{},
}


const OngletContext = React.createContext(initialState)

interface ProviderProps {

}
export default OngletContext
export const OngletProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{
    const [selectedOnglet , setSelectedOnglet] = useState<Route>('Dashboard')
    useEffect(() => {
        let path :string[] = window.location.href.split('/');
        setSelectedOnglet(path[path.length-1] as Route)
    }, [])
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