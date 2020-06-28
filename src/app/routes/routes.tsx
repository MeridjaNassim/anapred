
export const APP_BASE_ROUTE = '/app'
export const routes = {
    welcome : '/',
    profile : '/profile',
    home : {
        root :'/home',
        routes : {
            dashboard : '/Dashboard',
            patients: {
                root : '/Patients',
                routes : {
                    info : '/',
                    ajout : '/ajout',
                    edit : '/edit'
                }
            },
            interventions : "/Inteventions",
            statistiques : "/Stats",
            predictions : "/Predictions",
            parametres : "/Parametres",
            docs : "/Documentation"
        }
    }
}

export const APP_HOME = APP_BASE_ROUTE+routes.home.root
export const APP_DASHBOARD = APP_BASE_ROUTE+routes.home.root+routes.home.routes.dashboard
export const APP_PATIENTS = APP_BASE_ROUTE+routes.home.root+routes.home.routes.patients.root
export const APP_INTERVENTIONS = APP_BASE_ROUTE+routes.home.root+routes.home.routes.interventions
export const APP_STATISTIQUES = APP_BASE_ROUTE+routes.home.root+routes.home.routes.statistiques
export const APP_PREDICTIONS = APP_BASE_ROUTE+routes.home.root+routes.home.routes.predictions
export const APP_PARAMETRES = APP_BASE_ROUTE+routes.home.root+routes.home.routes.parametres
export const APP_DOCS = "/docs";

export const AJOUT_PATIENT = APP_PATIENTS+routes.home.routes.patients.routes.ajout
export const EDIT_PATIENT = APP_PATIENTS+routes.home.routes.patients.routes.edit