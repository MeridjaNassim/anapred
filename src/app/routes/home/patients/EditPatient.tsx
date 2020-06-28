import React, { useContext } from 'react'
import PatientContext from '../../../state/patients/PatientContext'

interface Props {
    path : string
}

const EditPatient = (props: Props) => {
    const {currentPatient} = useContext(PatientContext)
    return (
       
        <div>
            Hello from {JSON.stringify(currentPatient)}
        </div>
    )
}

export default EditPatient
