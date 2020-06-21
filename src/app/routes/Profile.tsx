import React, { ReactElement } from 'react'
import {Link} from '@reach/router'
import Layout from '../../components/layout/layout'
interface Props {
    path : string
}

export default function Profile({}: Props): ReactElement {
    return (
        <Layout>
            Profile Page
            <Link to="/">Go back to home page</Link>
        </Layout>
    )
}
