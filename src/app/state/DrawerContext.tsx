import { createContext, ReactElement, PropsWithChildren, Children, useState } from "react"
import React from "react"

const initialState = {
    isDrawerOpen : false,
    openDrawer : ()=>{},
    closeDrawer : () =>{} 
}


const DrawerContext = React.createContext(initialState)

interface ProviderProps {

}
export default DrawerContext
export const DrawerProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{
    const [isDrawerOpen , setIsDrawerOpen] = useState(false);
    const closeDrawer = ()=> setIsDrawerOpen(false);
    const openDrawer = ()=> setIsDrawerOpen(true);
    return <DrawerContext.Provider
            value={
              {
                isDrawerOpen,
                closeDrawer,
                openDrawer
              }
            }
        >
            {props.children}
    </DrawerContext.Provider>
}