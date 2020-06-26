import { useState,useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { PatientData } from "../interfaces/patient";


/**
 * This hook is used to provide patient data .
 */
export const usePatientData = ()=> {
    const [data,setData] = useState<PatientData[]>([])
    const [value , loading ,error] =  useCollection(
        firebase.firestore().collection('patients'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    /// when loading of data is complete or error occured do this .
    useEffect(()=>{

        /// if error return empty data
        if(error) return setData([])

        /// else convert Raw data to Patient Data
        let data : PatientData[] = value.docs.map(doc => {
            return {
                uid : doc.id,
                ...doc.data()   
            }
        })
        setData(data)
    },[loading,error])

    return {data,loading,error}

}