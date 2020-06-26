import React, { PropsWithChildren, useState, useRef } from 'react'
import styles from '../../styles/patientLayout.module.css';
import PatientTable, { PatientData , Column, TableProps } from '../PatientTable';
import { Typography, IconButton } from '@material-ui/core';
import Button from '../Button';
import AddIcon from '@material-ui/icons/Add';

import { navigate } from 'gatsby';
interface Props {

}



const Route = ({id , title , isActive , onClick})=> {
    return  <li id={`${id}`} className={`${styles.navitem} ${isActive(id) ? styles.active : null}`} onClick={onClick}>
    {title}
</li>
}


const PatientsLayout = (props: PropsWithChildren<Props>) => {
    const [activeRoute, setActiveRoute] = useState("Tout");
    const isActive = (id : string )=> {
        return activeRoute === id
    }
    const handleClickOnRoute = (e : React.MouseEvent<HTMLLIElement,MouseEvent>)=> {
        setActiveRoute(e.target.id)
    }

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
                    color  : 'var(--light-blue)',
                    marginBottom : "20px"
                    
                }} variant="h6" gutterBottom>
                    List des patients
                </Typography>
                <Button text="Ajouter patient" 
                onClick ={e=> {
                    e.preventDefault();
                    navigate('/app/home/Patients/ajout')
                }}
                style={{
                    color : "white",
                    background :"rgb(17, 116, 239)"
                }} color="default" variant="contained" size="medium" icon={<AddIcon></AddIcon>} />
                </div>
                
                {props.children}
            </section>
        </div>
    )
}

export default PatientsLayout
