import React, { PropsWithChildren, useContext, useEffect } from 'react'
import styles from '../../styles/layout.module.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar, Chip} from '@material-ui/core'
import { Search } from '@material-ui/icons';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import { navigate, Link } from 'gatsby';
import StyledBadge from "../StyledBadge";
import { useFirebaseAuthState, useFirebaseAuth } from '../../hooks/auth.hook';
import SideBarContext from '../../state/SideBarContext';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { APP_HOME, APP_DASHBOARD, APP_PATIENTS, APP_INTERVENTIONS, APP_STATISTIQUES, APP_PREDICTIONS, APP_PARAMETRES, APP_DOCS, APP_BASE_ROUTE, APP_PROFILE } from '../../routes/routes';
import { Location } from '@reach/router'
import ConnexionContext from '../../state/ConnexionContext';

interface LayoutProps {
    path: string
}

interface SideBarNavigationItemProps {
    icon: any,
    id: string,
    showContent?: boolean,
    route: string,
    showText?: boolean,
}
const SideBarNavigationItem: React.FC<SideBarNavigationItemProps> = ({ icon, id, route, showContent, showText }) => {
    return <Link to={route} className={styles.func} activeClassName={styles.activeOnglet} title={!showText && id}>
        <img src={icon} alt={id} className={styles.icon} />
        <span id="text" className={`${showContent ? styles.showContent : null}`} >
            {showText && id}
        </span>
    </Link>
}

interface SideBarProps {
    sidebarOpen: boolean,
    isMobile: boolean,
    toggle: () => void,
}

const ConnexionStatus: React.FC<{ online: boolean }> = ({ online }) => {
    const color = (online ? "var(--blue)" : "#f44336");
    return <Chip
        title={online ? "Your work will be saved online" : "Your work can't be saved online"}
        variant="outlined"
        size="small"
        style={{
            padding: "5px",
            color: color,
            borderColor: color
        }}
        label={online ? "online" : "offline"}
        icon={online ? <WifiIcon style={{
            color: color
        }} /> : <WifiOffIcon style={{
            color: color
        }} />}
    />
}
const SideBar: React.FC<SideBarProps> = ({ sidebarOpen, isMobile, toggle }) => {
    const { isConnected } = useContext(ConnexionContext);
    return <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : null} ${styles.showOnHover}`}>
        <div className={styles.brand} onClick={e => {
            e.preventDefault()
            if (!isMobile) {
                /// its not mobile 
                toggle()
            }
        }}>
            <Link to={APP_HOME}>
                <h1 id={styles.title} style={{
                    fontSize: `${sidebarOpen ? "1.5rem" : "0.75rem"}`
                }}><span style={{ color: 'var(--light-blue)' }}>ANA</span><span style={{ color: 'var(--blue)' }}>PRED</span></h1>
            </Link>

        </div>
        <div className={styles.funcs}>
            <SideBarNavigationItem id="Dashboard" route={APP_DASHBOARD} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/dashboard.svg')} />
            <SideBarNavigationItem id="Patients" route={APP_PATIENTS} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/patient.svg')} />
            <SideBarNavigationItem route={APP_INTERVENTIONS} id="Interventions" showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/intervention.svg')} />
        </div>
        <hr className={styles.divider}></hr>
        <div className={styles.funcs}>
            <SideBarNavigationItem id="Statistiques" route={APP_STATISTIQUES} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/stats.svg')} />
            <SideBarNavigationItem id="Predictions" route={APP_PREDICTIONS} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/prediction.svg')} />
        </div>
        <hr className={styles.divider}></hr>
        <div className={styles.funcs}>
            <SideBarNavigationItem id="Parametres" route={APP_PARAMETRES} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/settings.svg')} />
            <SideBarNavigationItem id="Documentations" route={APP_DOCS} showContent={sidebarOpen} showText={!isMobile} icon={require('./icons/docs.svg')} />
        </div>
        <div className={styles.connectionState}>
            <ConnexionStatus online={isConnected}></ConnexionStatus>
        </div>
        <p style={{ marginTop: '40px', textAlign: "center", fontSize: "0.8rem" }}>Version 0.1.0</p>
    </aside>
}


const AnaPredLayout = ({ children }: PropsWithChildren<LayoutProps>) => {

    /// Used Contexts 
    const { sidebarOpen, toggleSidebar } = useContext(SideBarContext)


    ///User Information through Firebase
    const [user, loading, error] = useFirebaseAuthState();
    const { logout } = useFirebaseAuth();
    ///MediaQuery matcher 
    const matches = useMediaQuery('(max-width:1200px)');


    return (
        <div className={styles.layout}>
            <CssBaseline></CssBaseline>
            <header className={`${styles.header} ${sidebarOpen ? styles.headerSideBarOpen : null}`}>
                <Location>
                    {locationProps => {
                        let strs = locationProps.location.pathname.split("/")
                        let onglet = strs[strs.length - 1]
                        return <div id={styles.routeName} className={`${styles.box1} ${styles.hleft} `}>
                            {onglet}
                        </div>
                    }}
                </Location>

                <div id={styles.searchbar} className={`${styles.box1} ${styles.hcenter}`}>
                    <form className={styles.search}>
                        <button className={styles.funcButton} type="submit" title="submit search"><Search id={styles.searchIcon}></Search></button>

                        <input type="text" placeholder="Search for anything" className={styles.searchField} />
                    </form>
                </div>
                <div id={styles.optionsContainer} className={`${styles.box1} ${styles.hright}`}>
                    <div id={styles.user} onClick={e=> {
                                navigate(APP_PROFILE)
                            }}>
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar src={user?.photoURL}>{loading ? "U" : null}</Avatar>
                        </StyledBadge>
                        <h4 id={styles.username}>{loading ? "loading..." : user?.displayName}</h4>
                    </div>

                    <div className={styles.options}>
                        <button className={styles.funcButton} title="see notifications" ><img src={require('./icons/notification.svg')} alt="notif" /></button>
                        <button onClick={async e => {
                            e.preventDefault();
                            await logout()
                            navigate(APP_BASE_ROUTE)
                        }} className={styles.funcButton} title="logout"><img src={require('./icons/logout.svg')} alt="logout" /></button>

                    </div>
                </div>
            </header>
            <SideBar isMobile={matches} sidebarOpen={sidebarOpen} toggle={toggleSidebar} />
            <main className={`${styles.main} ${sidebarOpen ? styles.mainSideBarOpen : null}`}>
                <div className={styles.gradientDiv} style={{
                    width: `${sidebarOpen ? "85%" : "95%"}`
                }}>

                </div>
                {children}
            </main>
            <footer className={styles.footer}></footer>
        </div>
    )
}

export default AnaPredLayout