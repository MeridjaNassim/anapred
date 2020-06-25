import React, { PropsWithChildren, useState } from 'react'
import styles from '../../styles/patientLayout.module.css';
import PatientTable, { PatientData , Column, TableProps } from '../PatientTable';
import { Typography } from '@material-ui/core';
interface Props {

}


const Route = ({id , title , isActive , onClick})=> {
    return  <li id={`${id}`} className={`${styles.navitem} ${isActive(id) ? styles.active : null}`} onClick={onClick}>
    {title}
</li>
}



const allPatients :TableProps = {
    data : {
        columns : [
           
        ],
        rows : [

        ]
    }
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
                <Typography style={{
                    color  : 'var(--light-blue)',
                    
                }} variant="display1" gutterBottom>
                    List des patients
                </Typography>

                <PatientTable data={allPatients.data}></PatientTable>
            </section>
        </div>
    )
}

export default PatientsLayout
