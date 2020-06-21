import React from 'react'
import {Router} from '@reach/router'
import Profile from '../app/routes/Profile'
import SignIn from '../app/routes/SignIn'

export default function App() {
    return (

        <Router basepath="/app">
            <SignIn path="/"></SignIn>
            <Profile path="/profile"></Profile>
        </Router>
    )
}
