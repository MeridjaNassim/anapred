import React from 'react'
import {Router} from '@reach/router'
import Profile from '../app/routes/Profile'
import Welcome from '../app/routes/Welcome'
import Home from '../app/routes/home/Home'
import Dashboard from '../app/routes/home/dashboard/Dashboard'
import Main from '../app/routes/home/Main'
import Patient from '../app/routes/home/patients/Patients'
import {routes,APP_BASE_ROUTE} from '../app/routes/routes'
import InfoPatients from '../app/routes/home/patients/InfoPatients'
import AjoutPatient from '../app/routes/home/patients/AjoutPatients'
import EditPatient from '../app/routes/home/patients/EditPatient'
import DisplayPatient from '../app/routes/home/patients/DisplayPatient'
export default function App() {

    return (

        <Router basepath={APP_BASE_ROUTE}>
            <Welcome path={routes.welcome}></Welcome>
            <Profile path={routes.profile}></Profile>
            <Home path={routes.home.root}>
                <Main path={routes.home.routes.home}></Main>
                <Patient path={routes.home.routes.patients.root}>
                    <InfoPatients path={routes.home.routes.patients.routes.info}/>
                    <DisplayPatient path={routes.home.routes.patients.routes.patient}></DisplayPatient>
                    <AjoutPatient path={routes.home.routes.patients.routes.ajout}></AjoutPatient>
                    <EditPatient path={routes.home.routes.patients.routes.edit}></EditPatient>
                </Patient>
                <Dashboard path={routes.home.routes.dashboard}></Dashboard>
            </Home>
        </Router>
    )
}
