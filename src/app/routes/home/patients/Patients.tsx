import React, { ReactElement, PropsWithChildren } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
interface Props {
    path : string
}

export default function Patients({children}: PropsWithChildren<Props>): ReactElement {
    return (
        <>
            {children}
        </>
    )
}
