import React,{useState, PropsWithChildren, useEffect, useLayoutEffect} from "react"
import {PatientData} from '../../interfaces/patient'
import { useMockPatientRawData } from "../../hooks/database.hook"
import usePatientReducer, { Action } from "./patient.reducer"
import { ADD_PATIENT, GET_ALL, INIT_DATA } from "./actions"
interface PatientState {

  data : PatientData[],
  displayedData : PatientData[] ,
  dispatch :  React.Dispatch<Action>,
  currentPatient : PatientData,
  loading : boolean,
  error : Error
}
const initialState :PatientState = {
    data : [],
    displayedData : [],
    loading : true,
    error : null,
    currentPatient : null,
    dispatch : null
}


const PatientContext = React.createContext(initialState)

interface ProviderProps {

}
export default PatientContext
export const PatientProvider : React.FC= (props :PropsWithChildren<ProviderProps>)=>{

    // const [data,setData]= useState<PatientData[]>([]);
    const {data : rawData ,loading,error} = useMockPatientRawData()
    // const [displayedData,setDisplayedData]= useState<PatientData[]>([]);
    const [state,dispatch] = usePatientReducer();
    useLayoutEffect(() => {
        if(!loading) {

            let data = rawData.map(({uid ,data}) => {
                return {
                    uid ,
                     ...data,
                 date_insc : (new Date(data.date_insc.seconds)).toUTCString()
                }
            })
        dispatch({
            type: INIT_DATA,
            payload : data
        })
        //    setData(data);
        //    setDisplayedData(data)
        }else {
         dispatch({
             type: INIT_DATA,
             payload : []
         })
        }
    }, [loading])
    return <PatientContext.Provider
            value={
              {
               data : state?.patients ,
               displayedData : state?.displayedData,
               dispatch,
               currentPatient : state?.currentPatient,
               loading :state?.loading,
               error :state?.error
              }
            }
        >
            {props.children}
    </PatientContext.Provider>
}