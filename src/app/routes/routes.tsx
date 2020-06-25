
export const APP_BASE_ROUTE = '/app'
export const routes = {
    welcome : '/',
    profile : '/profile',
    home : {
        root :'/home',
        routes : {
            dashboard : 'Dashboard',
            patients: {
                root : 'Patients',
                routes : {
                    info : '/',
                    ajout : 'ajout',
                }
            }
        }
    }
}