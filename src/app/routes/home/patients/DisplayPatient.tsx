import React, { useContext } from 'react'
import DisplayPatientLayout from "../../../components/layout/DisplayPatientLayout";
import PatientContext from '../../../state/patients/PatientContext';
import { makeStyles, Container, Typography, Grid } from '@material-ui/core';
import Button from '../../../components/Button'
import Paper from '@material-ui/core/Paper/Paper'
import { navigate } from 'gatsby';
import { EDIT_PATIENT, APP_INTERVENTIONS } from '../../routes';
import avatar from '../../../components/layout/icons/masque.svg'
import time from '../../../components/layout/icons/time.svg'
import Timeline from '../../../components/Timeline'
import InfoIcon from '@material-ui/icons/Info'
import ErrorIcon from '@material-ui/icons/Error';
interface Props {
    path: string
}
const useStyles = makeStyles(theme => ({
    grid: {
        display: "flex",
        width: "100%",
        paddingBottom : "20px",
        flexWrap :"wrap",
        justifyContent : "space-between"
    },
    paper: {
        borderRadius: "var(--border-radius)",
        padding: theme.spacing(2),
        boxShadow: 'var(--drop-shadow)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px"
    },
    column : {
        flex : 1,
        maxWidth : "50%"
    },
    info: {
        borderRadius: "var(--border-radius)",
        padding: theme.spacing(4),
        boxShadow: 'var(--drop-shadow)',
        marginBottom: "20px"
    },
    patient: {
        margin: "0 auto 0 10px",
        fontWeight: "bold"
    },
    infoRow :{
        display : "flex",
        width :"100%",
        justifyContent :"space-between",
        marginBottom :"10px"
    },
    secondItem : {
        marginLeft : "10px",
        textAlign: "right"
    },
    bold : {
        fontWeight: "bold"
    }
}));
const DisplayPatient = (props: Props) => {
    const classes = useStyles()
    const { currentPatient } = useContext(PatientContext)
    return (
        <DisplayPatientLayout text="Information du patient" title="Info" paper={false}>
            <Container className={classes.grid}>

                <div className={classes.column}>

                    <Paper className={classes.paper}>
                        <img src={avatar} alt="patient" />
                        <Typography className={classes.patient}>{currentPatient?.fullName}</Typography>
                        <Button color="secondary" size="small" style={{
                            color: "grey",
                            borderColor: "grey"
                        }} text="Modifier" onClick={e => {
                            navigate(EDIT_PATIENT)
                        }}></Button>
                    </Paper>
                    <Paper className={classes.info}>
                        <div style={{
                            display :"flex",
                            marginBottom : "20px"
                        }}>
                            <InfoIcon color="primary" style={{
                                verticalAlign: "center",
                                display :"inline"
                            }}></InfoIcon>
                            <Typography className={classes.patient} color="primary">Information générales</Typography>
                        </div>
                    <Container>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary" className={classes.bold} >ID patient</Typography>
                            <Typography variant="body2" color="primary"  >{currentPatient?.uid}</Typography> 
                            </div>
                            <div className={classes.secondItem}>
                            <Typography variant="body1" color="secondary" className={classes.bold} >Sexe</Typography>
                            <Typography variant="body2" color="primary" >{currentPatient?.sexe}</Typography> 
                            </div>
                        </div>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary" className={classes.bold} >Age</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.age}</Typography> 
                            </div>
                            <div className={classes.secondItem}>
                            <Typography variant="body1" color="secondary"  className={classes.bold}>Wilaya</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.wilaya}</Typography> 
                            </div>
                        </div>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary"  className={classes.bold}>Commune</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.commune}</Typography> 
                            </div>
                            <div className={classes.secondItem}>
                            <Typography variant="body1" color="secondary" className={classes.bold} >Numéro de téléphone</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.phone}</Typography> 
                            </div>
                        </div>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary" className={classes.bold} >Adresse</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.address}</Typography> 
                            </div>
                        </div>
                    </Container>

                    </Paper>
                    <Paper className={classes.info}>
                    <div style={{
                            display :"flex",
                            marginBottom : "20px"
                        }}>
                            <ErrorIcon  style={{
                                verticalAlign: "center",
                                display :"inline",
                                color :"var(--red)"
                            }}></ErrorIcon>
                            <Typography className={classes.patient}style={{
                              
                                color :"var(--red)"
                            }}>Information d'urgence</Typography>
                        </div>
                        <Container>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary"  className={classes.bold}>Personne à conntacter</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.nomPrenomPersonne}</Typography> 
                            </div>
                            <div className={classes.secondItem}>
                            <Typography variant="body1" color="secondary"  className={classes.bold}>Numéro de téléphone</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.numeroTelephonePersonne}</Typography> 
                            </div>
                        </div>
                        <div className={classes.infoRow}>
                            <div>
                            <Typography variant="body1" color="secondary"  className={classes.bold}>Adresse</Typography>
                            <Typography variant="body2" color="primary">{currentPatient?.addressPersonne}</Typography> 
                            </div>
                        </div>
                    </Container>
                    </Paper>
                </div>
                <div classeName={classes.column}>
                <Paper className={classes.paper}>
                        <img src={time} alt="time" />
                        <Typography style={{
                            margin :"0 10px"
                        }}>historique d'interventions</Typography>
                        <Button color="secondary" size="small"  text="Ajouter Intervention" onClick={e => {
                            navigate(APP_INTERVENTIONS)
                        }}></Button>
                    </Paper>
                    <Timeline data={currentPatient?.interventions}></Timeline>
                </div>
            </Container>
        </DisplayPatientLayout>
    )
}

export default DisplayPatient
