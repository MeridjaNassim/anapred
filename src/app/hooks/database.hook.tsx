import { useState,useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { PatientData } from "../interfaces/patient";


/**
 * This hook is used to provide reel patient data .
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
        console.log(value?.docs.map(doc => doc.data()))
    },[value])
    return {data : value?.docs.map(doc => {
        return {
            uid : doc?.id,
            data : doc?.data()
        }
    }),loading,error}

}
/**
 * This is just a mock hook to avoid abusing the firebase database quota and for testing
 */
export const useMockPatientRawData =  ()=> {

    return {data : [
        {
            uid : "In352HDOEUsOhdtrIzqg",
            data : {
                fullName :"Meridja Nassim",
                phone :"0672439370",
                etat : "Bon" ,
                age :20,
                categorie : "Gripe",
                date_insc : {
                    seconds : 1500000
                }
            }
        },
        {
            uid : "Fn352HDOEUsOhdtrIzqg",
            data : {
                fullName :"Abdallah Farouk",
                phone :"0672439370",
                etat : "Urgent" ,
                age :20,
                categorie : "Fracture",
                date_insc : {
                    seconds : 1500000
                }
            }
        },
        {
            uid : "In352FDOEUsOhdtrIzqg",
            data : {
                fullName :"Bennecer Zaki",
                phone :"0672439370",
                etat : "Bon" ,
                age :21,
                categorie : "Allergie",
                date_insc : {
                    seconds : 1500000
                }
            }
        }
    ], loading : false , error : null}
}