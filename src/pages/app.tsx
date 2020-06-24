import React from 'react'
import {Router} from '@reach/router'
import Profile from '../app/routes/Profile'
import Welcome from '../app/routes/Welcome'
import Home from '../app/routes/home/Home'
import Dashboard from '../app/routes/home/Dashboard'
import Patient from '../app/routes/home/Patients'
import {routes,APP_BASE_ROUTE} from '../app/routes/routes'
export default function App() {

    return (

        <Router basepath={APP_BASE_ROUTE}>
            <Welcome path={routes.welcome}></Welcome>
            <Profile path={routes.profile}></Profile>
            <Home path={routes.home}>
                <Patient path="/patients"></Patient>
                <Dashboard path="/dashboard"></Dashboard>
            </Home>
        </Router>
    )
}
