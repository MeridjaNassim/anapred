import React, { PropsWithChildren } from 'react'
import AppLayout from '../../components/layout/AnaPredLayout'
interface Props {
    path : string
}

const Home = (props: PropsWithChildren<Props>) => {
    return (
        <AppLayout path={props.path}>
            <section style={{
                padding: '0 2%'
            }}>
            {props.children}
            </section>
            
        </AppLayout>
    )
}

export default Home
