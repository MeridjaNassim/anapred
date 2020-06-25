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

interface AllPatientData extends PatientData {
    fullName : string,
    age : number,
    etat : string,
    phone : string,
    date_insc : string,
    categorie : string
}

const patientData : AllPatientData[] =[
    {
        uid : "1",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Critique",
        date_insc : "2020-04-12",
        categorie : "Pandémie"
    },
    {
        uid : "2",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Critique",
        date_insc : "2020-04-12",
        categorie : "Pandémie"
    }
]

const allPatients :TableProps = {
    data : {
        columns : [
           {
               id : "fullName",
               label :"Nom complet du patient",
               align : 'center'
           },
           {
               id : "age",
               label :"Age",
               align : 'center'
           },
           {
            id : "etat",
            label :"Etat",
            align : 'center'
            },{
                id : "phone",
                label :"Numero de telephone",
                align : 'center'
            },
            {
                id : "date_insc",
                label :"Date Inscription",
                align : 'center'
            },
            {
                id : "categorie",
                label :"Catégorie maladie",
                align : 'center'
            }
        ],
        rows : patientData
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

                <div className={styles.contentHeader}>
                <Typography style={{
                    color  : 'var(--light-blue)',
                    marginBottom : "20px"
                    
                }} variant="h6" gutterBottom>
                    List des patients
                </Typography>

                </div>
                
                <PatientTable style={{
                    marginTop : "50px"
                }} data={allPatients.data}></PatientTable>
            </section>
        </div>
    )
}

export default PatientsLayout
