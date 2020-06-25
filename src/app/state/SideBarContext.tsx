import React,{useState} from "react"


interface SideBarState {

  sidebarOpen : boolean ,
  openSidebar : () => void,
  closeSidebar : ()=> void,
}
const initialState :SideBarState = {
  sidebarOpen :false ,
  openSidebar : ()=>{},
  closeSidebar :()=>{},
}


const SideBarContext = React.createContext(initialState)

interface ProviderProps {

}
export default SideBarContext
export const SideBarProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{
    const [sidebarOpen , setSidebarOpen] = useState(false)
    const openSidebar = ()=> setSidebarOpen(true)
    const closeSidebar = ()=> setSidebarOpen(false)
    return <SideBarContext.Provider
            value={
              {
                sidebarOpen,
                openSidebar,
                closeSidebar
              }
            }
        >
            {props.children}
    </SideBarContext.Provider>
}