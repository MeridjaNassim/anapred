import { useState,useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { PatientData } from "../interfaces/patient";


/**
 * This hook is used to provide patient data .
 */
export const usePatientRawData = ()=> {
    const [value , loading ,error] =  useCollection(
        firebase.firestore().collection('patients'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    /// when loading of data is complete or error occured do this .
    useEffect(()=> {
        console.log("Error ", error)
    },[error])   
    useEffect(()=> {
        console.log(value?.docs.map(doc => doc.data()))
    },[value])
    return {data : value?.docs.map(doc => {
        return {
            uid : doc?.id,
            data : doc?.data()
        }
    }),loading,error}

}