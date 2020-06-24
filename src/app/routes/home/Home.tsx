import React, { PropsWithChildren } from 'react'
import AppLayout from '../../components/layout/AnaPredLayout'
interface Props {
    path : string
}

const Home = (props: PropsWithChildren<Props>) => {
    const href = window.location.href.split("/")
    const path = href[href.length-1];
    return (
        <AppLayout path={path}>
            <section style={{
                padding: '0 2%'
            }}>
            {props.children}
            </section>
            
        </AppLayout>
    )
}

export default Home
