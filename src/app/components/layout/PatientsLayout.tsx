import React, { PropsWithChildren, useState, useRef, useContext, useLayoutEffect } from 'react'
import styles from '../../styles/patientLayout.module.css';

import { Typography, IconButton } from '@material-ui/core';
import Button from '../Button';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade/Fade'
import { navigate } from 'gatsby';
import PatientContext from '../../state/patients/PatientContext';
import { AJOUT_PATIENT } from '../../routes/routes';

interface Props {

}



const Route = ({ id, title, isActive, onClick }) => {
    return <li id={`${id}`} className={`${styles.navitem} ${isActive(id) ? styles.active : null}`} onClick={onClick}>
        {title}
    </li>
}

const titles = {
    "Tout": "Liste de tout les patients",
    "Pandemie": "Liste des patients de la pandémie",
    "Normal": "Liste des patients normals"
}

const PatientsLayout = (props: PropsWithChildren<Props>) => {
    const [activeRoute, setActiveRoute] = useState("Tout");
    const isActive = (id: string) => {
        return activeRoute === id
    }
    const handleClickOnRoute = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setActiveRoute(e.target.id)
    }
    const { data, displayedData, setDisplayedData } = useContext(PatientContext);
    useLayoutEffect(() => {
        console.log("Filtering data ", activeRoute)
        if (activeRoute === "Tout") {
            console.log("Data : ", data);
            return setDisplayedData(data);
        } else if (activeRoute === "Normal") {
            return setDisplayedData(data.filter(item => item?.categorie !== "Pandemie"))
        }
        return setDisplayedData(data.filter(item => item?.categorie === activeRoute))

    }, [activeRoute])
    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <ul className={styles.navlist}>
                    <Route id="Tout" title="Tout" isActive={isActive} onClick={handleClickOnRoute}></Route>
                    <Route id="Pandemie" title="Pandemie" isActive={isActive} onClick={handleClickOnRoute}></Route>
                    <Route id="Normal" title="Normal" isActive={isActive} onClick={handleClickOnRoute}></Route>
                </ul>
            </nav>
            <section className={styles.contentArea}>

                <div className={styles.contentHeader}>
                    <Typography style={{
                        color: 'var(--blue)'

                    }} variant="h6" gutterBottom>
                        {titles[activeRoute] + " : " + displayedData.length}
                    </Typography>
                    <Button text="Ajouter patient"
                        onClick={e => {
                            e.preventDefault();
                            navigate(AJOUT_PATIENT)
                        }}
                     color="default" variant="outlined" size="medium" icon={<AddIcon></AddIcon>} />
                </div>
                <Fade timeout={600} appear={true} in={true}>
                    <>
                        {props.children}
                    </>
                </Fade>
            </section>
        </div>
    )
}

export default PatientsLayout
