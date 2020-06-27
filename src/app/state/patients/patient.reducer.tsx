
import * as actions from './actions'
import { PatientData } from '../../interfaces/patient'
import { useReducer } from 'react';

interface Action {
    type : actions.PATIENT_ACTION,
    payload?: PatientData[],
    options?: any
}
interface PatientState {
    patients : PatientData[]
}
const initialState : PatientState ={
    patients : []
}

const patientReducer = (state : PatientState ,action:Action) => {
    switch (action.type) {
        case actions.GET_ALL:
            console.log("Getting all patients");
            
            break;
        case actions.GET_ALL_FILTERED:
            console.log("Getting all patients with filter");
            break;
        case actions.GET_ONE:
            console.log("Getting  one patient");
            break;

        case actions.ADD_PATIENT :
            console.log("Adding patient");
            break;    
        case actions.UPDATE_PATIENT:
            console.log("Updating patient");
            break;
        case actions.DELETE_PATIENT:
            console.log("deleting patient");
            break;
        case actions.ARCHIVE_PATIENT:
            console.log("Archiving patient");
            break;
        default:
            break;
    }
}


export default function usePatientReducer(){
    return useReducer(patientReducer, initialState)
    
}