import React, { ReactElement } from 'react'

interface Props {
    path : string
}

export default function Dashboard({}: Props): ReactElement {
    return (
        <div>
            Hello from Dashboard
        </div>
    )
}
