import React, { PropsWithChildren } from 'react'
import styles from '../../styles/layout.module.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import avatar from '../../images/profile.jpeg';
import { navigate } from 'gatsby';
import { useFirebaseAuthState, useFirebaseAuth } from '../../hooks/auth.hook';
interface Props {
    path : string
}

const AnaPredLayout = ({ children ,path}: PropsWithChildren<Props>) => {

    const [user,loading,error] = useFirebaseAuthState();
    const {logout} =useFirebaseAuth();
    return (
        <div className={styles.layout}>
            <CssBaseline></CssBaseline>
            <header className={styles.header}>
                <div id="routeName" className={`${styles.box1} ${styles.hleft}`}>
                    {path}
             </div>
                <div id="searchbar" className={`${styles.box1} ${styles.hcenter}`}>
                    <form className={styles.search}>
                        <button className={styles.funcButton} type="submit" title="submit search"><Search id={styles.searchIcon}></Search></button>
                        
                        <input type="text" placeholder="Search for anything" className={styles.searchField} />
                    </form>
                </div>
                <div id={styles.optionsContainer} className={`${styles.box1} ${styles.hright}`}>
                    <div id={styles.user}>
                    <Avatar src={loading ? null : user.photoURL}>{loading ? "U" :null}</Avatar>
                        <h4 id={styles.username}>{loading ? "loading...":user.displayName}</h4>
                    </div>
                    
                    <div className={styles.options}>
                    <button onClick={async e=> {
                        e.preventDefault();
                        await logout()
                        navigate('/app/welcome')
                    }} className={styles.funcButton}title="see notifications" ><img  src={require('./icons/notification.svg')} alt="notif"  /></button>
                    <button className={styles.funcButton} title="logout"><img  src={require('./icons/logout.svg')} alt="logout"  /></button>
                    
                    </div>
                </div>
            </header>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h1 id={styles.title}><span style={{ color: '#11CBEF' }}>ANA</span><span style={{ color: '#1174EF' }}>PRED</span></h1>
                </div>
                <div className={styles.funcs}>
                <div className={styles.func} onClick={e=> navigate('/app/home/dashboard')}>
                        <img src={require('./icons/dashboard.svg')} alt="patien" className={styles.icon} />
                        Dashboard
                    </div>
                    <div className={styles.func} onClick={e=> navigate('/app/home/patients')}>
                        <img src={require('./icons/patient.svg')} alt="patien" className={styles.icon} />
                        patients
                    </div>
                    <div className={styles.func}>
                        <img src={require('./icons/intervention.svg')} alt="patient" className={styles.icon} />
                        interventions
                    </div>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                <div className={styles.func}>
                        <img src={require('./icons/stats.svg')} alt="patien" className={styles.icon} />
                        Statistiques
                    </div>
                    <div className={styles.func}>
                        <img src={require('./icons/prediction.svg')} alt="patien" className={styles.icon} />
                        Predictions
                    </div>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                <div className={styles.func}>
                        <img src={require('./icons/settings.svg')} alt="patien" className={styles.icon} />
                        Paramétres
                    </div>
                    <div className={styles.func}>
                        <img src={require('./icons/docs.svg')} alt="patien" className={styles.icon} />
                        Documentations
                    </div>
                </div>
                <p style={{ marginTop: 'auto' }}>Version 0.1.0</p>
            </aside>
            <main className={styles.main}>
                <div style={{ position: "fixed", zIndex : "-1", background: "linear-gradient(260deg, rgba(17,116,239,1) 0%, rgba(17,205,239,1) 100%)", width: "100%", height: "33%" }}>

                </div>
                {children}
            </main>
            <footer className={styles.footer}></footer>
        </div>
    )
}

export default AnaPredLayout
