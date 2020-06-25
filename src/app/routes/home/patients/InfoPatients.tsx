import React, { PropsWithChildren } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
interface Props {
    path : string
}

const InfoPatients = (props: Props) => {
    return (
        <PatientLayout>
            <div>Hello From Info</div>
        </PatientLayout>
    )
}

export default InfoPatients
