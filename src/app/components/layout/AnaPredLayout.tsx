import React, { PropsWithChildren, useContext, useEffect } from 'react'
import styles from '../../styles/layout.module.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import avatar from '../../images/profile.jpeg';
import { navigate, Link } from 'gatsby';
import { useFirebaseAuthState, useFirebaseAuth } from '../../hooks/auth.hook';
import OngletContext from '../../state/OngletContext';
import SideBarContext from '../../state/SideBarContext';
import useMediaQuery from '@material-ui/core/useMediaQuery';
interface Props {
    path : string
}

interface FuncProps {
    icon : any,
    id : string,
    showContent ?:boolean,
    isActive : (onglet : string) => boolean,
    onClick :  (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    showText?:boolean,
}
const Func : React.FC<FuncProps> = ({icon,id,isActive,showContent,onClick,showText} )=> {
    return <Link to={`/app/home/${id}`} className={styles.func} activeClassName={styles.activeOnglet} title={!showText && id}>
         <img src={icon} alt={id} className={styles.icon} />
        <span id="text" className={`${showContent ? styles.showContent : null}`} >
            {showText && id}
        </span>
    </Link>
}

const AnaPredLayout = ({ children ,path}: PropsWithChildren<Props>) => {
    const {selectedOnglet,setSelectedOnglet} = useContext(OngletContext)
    const {sidebarOpen,toggleSidebar} = useContext(SideBarContext)
    const [user,loading,error] = useFirebaseAuthState();
    const matches = useMediaQuery('(max-width:1200px)');
    const {logout} =useFirebaseAuth();
    const handleSelectOnglet = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedOnglet(e.target.id);
    }
    const isOngletActive = (onglet : string) => {
        return selectedOnglet === onglet
    }
    return (
        <div className={styles.layout}>
            <CssBaseline></CssBaseline>
            <header className={`${styles.header} ${sidebarOpen ? styles.headerSideBarOpen : null}`}>
                <div id={styles.routeName} className={`${styles.box1} ${styles.hleft} `}>
                    {path}
             </div>
                <div id={styles.searchbar} className={`${styles.box1} ${styles.hcenter}`}>
                    <form className={styles.search}>
                        <button className={styles.funcButton} type="submit" title="submit search"><Search id={styles.searchIcon}></Search></button>
                        
                        <input type="text" placeholder="Search for anything" className={styles.searchField} />
                    </form>
                </div>
                <div id={styles.optionsContainer} className={`${styles.box1} ${styles.hright}`}>
                    <div id={styles.user}>
                    <Avatar src={avatar}>{loading ? "U" :null}</Avatar>
                        <h4 id={styles.username}>{loading ? "loading...":user?.displayName}</h4>
                    </div>
                    
                    <div className={styles.options}>
                    <button  className={styles.funcButton}title="see notifications" ><img  src={require('./icons/notification.svg')} alt="notif"  /></button>
                    <button onClick={async e=> {
                        e.preventDefault();
                        await logout()
                        navigate('/app/')
                    }} className={styles.funcButton} title="logout"><img  src={require('./icons/logout.svg')} alt="logout"  /></button>
                    
                    </div>
                </div>
            </header>
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : null} ${styles.showOnHover}`}>
                <div className={styles.brand} onClick={e => {
                    e.preventDefault()
                    if(!matches) {
                        /// its not mobile 
                        toggleSidebar()
                    }
                }}>
                    <h1 id={styles.title} style={{
                        fontSize : `${sidebarOpen ? "1.5rem" : "0.75rem"}`
                    }}><span style={{ color: 'var(--light-blue)' }}>ANA</span><span style={{ color: 'var(--blue)' }}>PRED</span></h1>
                </div>
                <div className={styles.funcs}>
                    <Func id="Dashboard" showContent={sidebarOpen} showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/dashboard.svg')} />
                    <Func id="Patients" showContent={sidebarOpen } showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/patient.svg')} />
                    <Func id="Interventions" showContent={sidebarOpen } showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/intervention.svg')} />
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                    <Func id="Statistiques" showContent={sidebarOpen } showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/stats.svg')} />                   <Func id="Predictions" showContent={sidebarOpen }showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/prediction.svg')} />
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                    <Func id="Parametres" showContent={sidebarOpen } showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/settings.svg')} />
                    <Func id="Documentations" showContent={sidebarOpen} showText={!matches} isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/docs.svg')} />
                </div>
                <p style={{ marginTop: 'auto' }}>Version 0.1.0</p>
            </aside>
            <main className={`${styles.main} ${sidebarOpen ? styles.mainSideBarOpen : null}`}>
                <div style={{ overflowX : "hidden", position: "absolute", zIndex : -1, background: "linear-gradient(260deg, rgba(17,116,239,1) 0%, rgba(17,205,239,1) 100%)", width: `${sidebarOpen ? "85%" : "95%"}`, height: "33%" }}>

                </div>
                {children}
            </main>
            <footer className={styles.footer}></footer>
        </div>
    )
}

export default AnaPredLayout
