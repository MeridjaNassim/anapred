import React, { PropsWithChildren } from 'react'
import AppLayout from '../../components/layout/AnaPredLayout'
import {OngletProvider} from '../../state/OngletContext'
interface Props {
    path : string
}

const Home = (props: PropsWithChildren<Props>) => {
    const href = window.location.href.split("/")
    const path = href[href.length-1];
    return (
        <OngletProvider>
        <AppLayout path={path}>
            <section style={{
                padding: '0 2%'
            }}>
            {props.children}
            </section>
            
        </AppLayout>
        </OngletProvider>
    )
}

export default Home
