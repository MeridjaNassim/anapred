import React, { ReactElement } from 'react'

interface Props {
    path : string
}

export default function Patients({}: Props): ReactElement {
    return (
        <div>
            Hello from Patients
        </div>
    )
}
