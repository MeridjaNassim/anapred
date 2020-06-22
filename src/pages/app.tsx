import React from 'react'
import {Router} from '@reach/router'
import Profile from '../app/routes/Profile'
import Welcome from '../app/routes/Welcome'

export default function App() {
    return (

        <Router basepath="/app">
            <Welcome path="/"></Welcome>
            <Profile path="/profile"></Profile>
        </Router>
    )
}
