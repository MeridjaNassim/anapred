import React,{useState, PropsWithChildren} from "react"


interface SideBarState {

  sidebarOpen : boolean ,
  openSidebar : () => void,
  closeSidebar : ()=> void,
  toggleSidebar : ()=> void,
}
const initialState :SideBarState = {
  sidebarOpen :false ,
  openSidebar : ()=>{},
  closeSidebar :()=>{},
  toggleSidebar :()=>{}
}


const SideBarContext = React.createContext(initialState)

interface ProviderProps {

}
export default SideBarContext
export const SideBarProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{
    const [sidebarOpen , setSidebarOpen] = useState(false)
    const openSidebar = ()=> setSidebarOpen(true)
    const closeSidebar = ()=> setSidebarOpen(false)
    const toggleSidebar = ()=> setSidebarOpen(!sidebarOpen)
    return <SideBarContext.Provider
            value={
              {
                sidebarOpen,
                openSidebar,
                closeSidebar,
                toggleSidebar
              }
            }
        >
            {props.children}
    </SideBarContext.Provider>
}