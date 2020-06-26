import React,{useState, PropsWithChildren} from "react"
import {PatientData} from '../../interfaces/patient'
import { usePatientData } from "../../hooks/database.hook"

interface PatientState {

  data : PatientData[],
  loading : boolean,
  error : Error
}
const initialState :PatientState = {
    data : [],
    loading : true,
    error : null
}


const SideBarContext = React.createContext(initialState)

interface ProviderProps {

}
export default SideBarContext
export const SideBarProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{

    const {data,loading,error} = usePatientData()
    return <SideBarContext.Provider
            value={
              {
               data ,
               loading ,
               error
              }
            }
        >
            {props.children}
    </SideBarContext.Provider>
}