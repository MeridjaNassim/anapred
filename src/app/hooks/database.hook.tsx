import { useState,useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'


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
            uid : "In352HDOEUsOhdtrIztg",
            data : {
                fullName :"Meridja Nassim",
                phone :"0672439370",
                etat : "Bon" ,
                age :20,
                categorie : "Gripe",
                date_insc : {
                    seconds : 1500000
                },
                nom: "",
                prenom: "",
                address: "",
                codeP: "",
                numeroTelephone: "",
                adresseEmail: "",
                nomPrenomPersonne: "",
                addressPersonne: "",
                numeroTelephonePersonne: "",
                sexe: "Masculin",
                wilaya: "Alger",
                commune: "Alger",
                typeMaladie: "",
                nomMaladie: "",
                descriptionMaladie: "",
            
            }
        },
        {
            uid : "In352HDOEUsQhdtrIzqg",
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
        }
    ], loading : false , error : null}
}