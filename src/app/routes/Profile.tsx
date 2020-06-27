import React, { ReactElement } from 'react'
import { Link } from '@reach/router'
import Layout from '../../components/layout/layout'
import { useFirebaseAuthState } from '../hooks/auth.hook'
import { APP_HOME } from './routes';
interface Props {
    path: string
}

export default function Profile({ }: Props): ReactElement {
    const [user, loading, error] = useFirebaseAuthState();
    return (
        <Layout>
            <div>
                {error ? 'Error loading user' : null}
            Profile Page {loading ? 'loading user ... ' : user.uid}
            </div>

            <Link to={APP_HOME}>Go back to home page</Link>
        </Layout>
    )
}
