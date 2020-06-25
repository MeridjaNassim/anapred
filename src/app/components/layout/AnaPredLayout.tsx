import React, { PropsWithChildren, useContext } from 'react'
import styles from '../../styles/layout.module.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import avatar from '../../images/profile.jpeg';
import { navigate } from 'gatsby';
import { useFirebaseAuthState, useFirebaseAuth } from '../../hooks/auth.hook';
import OngletContext from '../../state/OngletContext';
interface Props {
    path : string
}

interface FuncProps {
    icon : any,
    id : string,
    isActive : (onglet : string) => boolean,
    onClick :  (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void,

}
const Func : React.FC<FuncProps> = ({icon,id,isActive,onClick} )=> {
    return  <div id={id} className={`${styles.func} ${isActive(id) ? styles.activeOnglet : null }`} onClick={onClick}>
    <img src={icon} alt={id} className={styles.icon} />
    {id}
</div>
}

const AnaPredLayout = ({ children ,path}: PropsWithChildren<Props>) => {
    const {selectedOnglet,setSelectedOnglet} = useContext(OngletContext)
    const [user,loading,error] = useFirebaseAuthState();
    const {logout} =useFirebaseAuth();

    const handleSelectOnglet = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedOnglet(e.target.id);
        navigate('/app/home/'+e.target.id)
    }
    const isOngletActive = (onglet : string) => {
        return selectedOnglet === onglet
    }
    return (
        <div className={styles.layout}>
            <CssBaseline></CssBaseline>
            <header className={styles.header}>
                <div id={styles.routeName} className={`${styles.box1} ${styles.hleft} `}>
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
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h1 id={styles.title}><span style={{ color: 'var(--light-blue)' }}>ANA</span><span style={{ color: 'var(--blue)' }}>PRED</span></h1>
                </div>
                <div className={styles.funcs}>
                    <Func id="Dashboard" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/dashboard.svg')}></Func>
                    <Func id="Patients" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/patient.svg')}></Func>
                    <Func id="Interventions" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/intervention.svg')}></Func>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                    <Func id="Statistiques" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/stats.svg')}></Func>
                    <Func id="Predictions" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/prediction.svg')}></Func>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.funcs}>
                    <Func id="Parametres" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/settings.svg')}></Func>
                    <Func id="Documentations" isActive={isOngletActive} onClick={handleSelectOnglet} icon={require('./icons/docs.svg')}></Func>
                </div>
                <p style={{ marginTop: 'auto' }}>Version 0.1.0</p>
            </aside>
            <main className={styles.main}>
                <div style={{ position: "absolute", zIndex : -1, background: "linear-gradient(260deg, rgba(17,116,239,1) 0%, rgba(17,205,239,1) 100%)", width: "85%", height: "33%" }}>

                </div>
                {children}
            </main>
            <footer className={styles.footer}></footer>
        </div>
    )
}

export default AnaPredLayout
