
import * as actions from './actions'
import { PatientData } from '../../interfaces/patient'
import { useReducer, Reducer } from 'react';
export interface Action {
    type : actions.PATIENT_ACTION,
    payload?: any,
    options?: any
}
interface PatientState {
  patients : PatientData[],
  displayedData : PatientData[] ,
  loading : boolean,
  currentPatient : PatientData,
  error : Error
}
const initialState : PatientState ={
    patients : [],
    displayedData :[],
    currentPatient : null,
    loading : true,
    error : null
}

const initData  = (state : PatientState ,payload:PatientData[]) : PatientState=> {
    return {
        ...state,
        patients : payload,
        displayedData : payload

    }
}
const getAll = (state : PatientState ) : PatientState => {
    return {
        ...state , 
        displayedData : state.patients
    }
}
const getAllFiltered = (state : PatientState,options : any) : PatientState => {

    if(options?.filterField && options?.filterValue && options?.equal !== undefined) {
        let filteredData : PatientData [];
        if(options.equal === true) {
            filteredData = state.patients.filter((patient : PatientData) => {
          
                return patient[options.filterField] === options.filterValue
            })
        
        }else {
            filteredData = state.patients.filter((patient : PatientData) => {
                return patient[options.filterField] !== options.filterValue
            })
          
        }
        
        return {
            ...state ,
            displayedData : filteredData
        }
    }
    return state
} 

const getOnePatient = (state : PatientState, payload :{uid : string})  : PatientState =>{
    let patient = state.patients.find(item => item.uid === payload.uid)
    console.log(patient)
    return {
        ...state ,
        currentPatient : patient
    }
}
const addOnePatient = (state : PatientState , payload :any) :PatientState => {
    let data = state.patients;
    data.push({
        uid : (new Date).getTime().toString(),
        ...payload
    })

    return {
        ...state ,
        patients : data
    }
}
const updateOnePatient =  (state : PatientState , payload :any) :PatientState => {
    let data = state.patients;
    let patient = data.find(item => item.uid === payload?.uid);
    if(patient) {
        data.filter(item => item=== patient)
        data.push({...patient , ...payload})
        return {
            ...state ,
            patients : data
        }
    }
    return state
}
const deleteOnePatient = (state : PatientState , payload :{uid : string}) :PatientState => {
    let data = state.patients;
    console.log("uid : " , payload.uid)
    data = data.filter(item =>  item.uid !== payload.uid)
    console.log(data)
    return {
        ...state ,
        patients : data
    }
}
const patientReducer :Reducer<PatientState,Action> = (state : PatientState ,action:Action) => {
    switch (action.type) {
        case actions.INIT_DATA:
            console.log("InitData patients");
            return initData(state,action.payload)
            break;
        case actions.GET_ALL:
            console.log("Getting all patients");
            return getAll(state)
            break;
        case actions.GET_ALL_FILTERED:
            console.log("Getting all patients with filter");
            return getAllFiltered(state,action.options)
            break;
        case actions.GET_ONE:
            return getOnePatient(state,{
                uid : action.payload?.uid
            });
            break;

        case actions.ADD_PATIENT :
            console.log("Adding patient");
            return addOnePatient(state,action.payload)
            break;    
        case actions.UPDATE_PATIENT:
            console.log("Updating patient");
            return updateOnePatient(state,action.payload)
            break;
        case actions.DELETE_PATIENT:
            return deleteOnePatient(state,action.payload)
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