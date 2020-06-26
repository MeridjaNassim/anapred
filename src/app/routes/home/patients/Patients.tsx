import React, { ReactElement, PropsWithChildren } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
import { PatientProvider } from '../../../state/patients/PatientContext'
interface Props {
    path : string
}

export default function Patients({children}: PropsWithChildren<Props>): ReactElement {
    return (
        <PatientProvider>
       
            {children}
        </PatientProvider>
    )
}
