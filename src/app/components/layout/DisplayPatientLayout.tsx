import React, { PropsWithChildren, useState, useRef } from 'react'
import styles from '../../styles/patientLayout.module.css';
import PatientTable, { PatientData , Column, TableProps } from '../PatientTable';
import { Typography, IconButton } from '@material-ui/core';
import Button from '../Button';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { navigate } from 'gatsby';
import { APP_PATIENTS } from '../../routes/routes';
interface Props {
    text : string,
    title : string,
    paper?:boolean
}



const Route = ({id , title , isActive , onClick})=> {
    return  <li id={`${id}`} className={`${styles.navitem} ${isActive(id) ? styles.active : null}`} onClick={onClick}>
    {title}
</li>
}


const OperationLayout = ({text,title,paper =true,children}: PropsWithChildren<Props>) => {
    const [activeRoute, setActiveRoute] = useState("Tout");
    const isActive = (id : string )=> {
        return true
    }
    const handleClickOnRoute = (e : React.MouseEvent<HTMLLIElement,MouseEvent>)=> {
        setActiveRoute(e.target.id)
    }

    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <ul className={styles.navlist}>
                <IconButton   component="span"
                onClick ={e=> {
                    e.preventDefault();
                    navigate(APP_PATIENTS)
                }}
                >
          <ArrowBackIosIcon  style={{ color:'white' }} fontSize="small"/>
        </IconButton>
               
                    <Route id="AjouterPatient" title={title} isActive={isActive} onClick={handleClickOnRoute}></Route>
                   
                </ul>
            </nav>
            <section className={styles.contentArea} style={{
                background :"transparent",
                boxShadow :"none"
            }}>
                
                {children}
            </section>
        </div>
    )
}

export default OperationLayout
