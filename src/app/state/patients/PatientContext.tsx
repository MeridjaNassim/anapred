import React,{useState, PropsWithChildren, useEffect, useLayoutEffect} from "react"
import {PatientData} from '../../interfaces/patient'
import { useMockPatientRawData } from "../../hooks/database.hook"
import usePatientReducer from "./patient.reducer"

interface PatientState {

  data : PatientData[],
  displayedData : PatientData[] ,
  setDisplayedData : React.Dispatch<React.SetStateAction<PatientData[]>>,
  loading : boolean,
  error : Error
}
const initialState :PatientState = {
    data : [],
    displayedData : [],
    loading : true,
    error : null
}


const PatientContext = React.createContext(initialState)

interface ProviderProps {

}
export default PatientContext
export const PatientProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{

    const [data,setData]= useState<PatientData[]>([]);
    const {data : rawData ,loading,error} = useMockPatientRawData()
    const [displayedData,setDisplayedData]= useState<PatientData[]>([]);
    useLayoutEffect(() => {
        if(!loading) {
            let data = rawData.map(({uid ,data}) => {
                return {
                    uid ,
                     ...data,
                 date_insc : (new Date(data.date_insc.seconds)).toUTCString()
                }
            })
           setData(data);
           setDisplayedData(data)
        }else {
           setData([])
        }
    }, [loading])
    return <PatientContext.Provider
            value={
              {
               data ,
               displayedData,
               setDisplayedData,
               loading ,
               error
              }
            }
        >
            {props.children}
    </PatientContext.Provider>
}