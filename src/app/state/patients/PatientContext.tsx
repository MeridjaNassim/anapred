import React,{useState, PropsWithChildren, useEffect} from "react"
import {PatientData} from '../../interfaces/patient'
import { usePatientRawData } from "../../hooks/database.hook"

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


const PatientContext = React.createContext(initialState)

interface ProviderProps {

}
export default PatientContext
export const PatientProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{

    const [data,setData]= useState<PatientData[]>([]);
    const {data : rawData ,loading,error} = usePatientRawData()
    useEffect(() => {
        if(!loading) {
           setData(rawData.map(({uid ,data}) => {
               return {
                   uid ,
                    ...data,
                date_insc : (new Date(data.date_insc.seconds)).toUTCString()
               }
           }));
        }else {
           setData([])
        }
    }, [loading])
    return <PatientContext.Provider
            value={
              {
               data ,
               loading ,
               error
              }
            }
        >
            {props.children}
    </PatientContext.Provider>
}