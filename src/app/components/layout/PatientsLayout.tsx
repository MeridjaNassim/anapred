import React, { PropsWithChildren, useState, useRef } from 'react'
import styles from '../../styles/patientLayout.module.css';
import PatientTable, { PatientData , Column, TableProps } from '../PatientTable';
import { Typography, IconButton } from '@material-ui/core';
import Button from '../Button';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { navigate } from 'gatsby';
interface Props {

}

type Etat = "Normal" | "Urgent" | "Critique" | "Bon"

interface AllPatientData extends PatientData {
    fullName : string,
    age : number,
    etat : Etat,
    phone : string,
    date_insc : string,
    categorie : string
}
/**
 * This data should be fetched from firebase and then converted to this format
 * TODO: DELETE when you implement firebase firestore data
 */
const patientData : AllPatientData[] =[
    {
        uid : "1",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Bon",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "2",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Normal",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "3",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Critique",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "4",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Urgent",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "5",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Critique",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "6",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Bon",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "7",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Urgent",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "8",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Bon",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    },
    {
        uid : "9",
        fullName : "Abdellkader boualem",
        phone :"0672439370",
        age : 40,
        etat : "Bon",
        date_insc : (new Date()).toUTCString(),
        categorie : "Pandémie"
    }
]

const Route = ({id , title , isActive , onClick})=> {
    return  <li id={`${id}`} className={`${styles.navitem} ${isActive(id) ? styles.active : null}`} onClick={onClick}>
    {title}
</li>
}

const EtatPatient : React.FC<{etat: Etat}>= ({etat})=> {
    const getSpanColor = (etat : Etat)=> {
        switch(etat){
            case "Bon": 
                return "green"
                break;
            case "Normal":
                return "lightgreen" 
                break;
            case "Urgent": 
                return "orange" 
                break;        
            case "Critique": 
            return "red" 
                break;
        }
    }
    

    return <div style={{display : "flex" ,justifyContent :"center" , alignItems : 'center' }}>
        <div style={{
            borderRadius : "50%",
            width:"8px",
            height :"8px",
            backgroundColor : getSpanColor(etat),
            marginRight : "10px"
        }}></div>
        {etat}
    </div>
}
const useOptionsStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
  paper : {
      boxShadow : "0px 6px 6px rgba(0,0,0,0.2)"
  }
}),
);
const Options : React.FC<{patient : PatientData}> = ({patient}) => {
    const [open,setOpen] =useState(false)
    const [anchorEl , setAnchorEl] =useState(null)
    const classes = useOptionsStyles();
    return  <> 
    
    <Popper open={open} anchorEl={anchorEl} placement="left" transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper className={classes.paper}>
          <Typography className={classes.typography}>Possible Options</Typography>
        </Paper>
      </Fade>
    )}
  </Popper>
  <IconButton aria-label="options" onClick={e => {
      setAnchorEl(e.currentTarget)
      setOpen(!open)
      
      }}>
            <MoreVertIcon />
   </IconButton>   
  </>
}
const PatientsLayout = (props: PropsWithChildren<Props>) => {
    const [activeRoute, setActiveRoute] = useState("Tout");
    const isActive = (id : string )=> {
        return activeRoute === id
    }
    const handleClickOnRoute = (e : React.MouseEvent<HTMLLIElement,MouseEvent>)=> {
        setActiveRoute(e.target.id)
    }

    const renderData = (data : AllPatientData[]) : PatientData[] => {
        return data.map((d) => {
           return {
            ...d,
            etat : <EtatPatient etat={d.etat}></EtatPatient> ,
            options : <Options patient={d}></Options>
           }
        })
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
                    background :"linear-gradient(100deg, rgb(17, 116, 239) 0%, rgb(17, 205, 239) 100%)"
                }} color="default" variant="contained" size="medium" icon={<AddIcon></AddIcon>} />
                </div>
                
                <PatientTable paginationStyle={allPatients.paginationStyle} style={allPatients.style} columns={allPatients.columns} data={renderData(allPatients.data as AllPatientData[])}></PatientTable>
            </section>
        </div>
    )
}

export default PatientsLayout
const allPatients :TableProps = {
    paginationStyle : {
        padding : "20px"
    },
    style : {              
        paddingBottom : "50px",
    },
    columns : [
        {
            id : "uid",
            label :"ID unique",
            align : 'center'
        },
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
         },
         {
             id:"options",
             label :"",
             align :"center"
         }
     ],
    data :patientData
}