import React, { PropsWithChildren, useState, useContext } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
import { TableProps } from '../../../components/PatientTable'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade/Fade'
import InboxIcon from '@material-ui/icons/Inbox'

import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Typography, CircularProgress, ListItem, ListItemProps, ListItemIcon, ListItemText, Divider, List } from '@material-ui/core';
import PatientTable from '../../../components/PatientTable'
import { PatientData } from '../../../interfaces/patient'
import PatientContext from '../../../state/patients/PatientContext';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { navigate } from 'gatsby';
interface Props {
    path: string,
    patientType: string,
    data: PatientData[]
}
type Etat = "Normal" | "Urgent" | "Critique" | "Bon"

interface AllPatientData extends PatientData {
    fullName: string,
    age: number,
    etat: Etat,
    phone: string,
    date_insc: string,
    categorie: string
}
const EtatPatient: React.FC<{ etat: Etat }> = ({ etat }) => {
    const getSpanColor = (etat: Etat) => {
        switch (etat) {
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


    return <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
        <div style={{
            borderRadius: "50%",
            width: "8px",
            height: "8px",
            backgroundColor: getSpanColor(etat),
            marginRight: "10px"
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
            padding: theme.spacing(10),
            paddingTop : 10,
            color : 'var(--blue)'
        },
        paper: {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.2)"
        }
    }),
);

const useOptionStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 600,
            paddingTop : theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
        },
    }),
);
function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}
const Options: React.FC<{ patient: PatientData }> = ({ patient }) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useOptionsStyles();
    const optionClasses = useOptionStyles();
    return <>

        <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper className={classes.paper}>
                        <div className={optionClasses.root}>
                            <Typography className={classes.typography} variant="caption">Patient : {patient.uid}</Typography>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button onClick={e => {
                                        /// set Edit Patient
                                        navigate("/app/home/Patients/Edit")
                                    }}>
                                    <ListItemIcon>
                                        <EditIcon style={{color : "var(--blue)"}}/>
                                    </ListItemIcon>
                                    <ListItemText  primary="Edit" />
                                </ListItem>
                                <ListItem button  onClick={e => {
                                         /// Archive Patient
                                         e.preventDefault()
                                         alert("Archiving Patient: "+patient.uid)
                                    }} >
                                    <ListItemIcon>
                                        <ArchiveIcon style={{color : "#004d40"}}/>
                                    </ListItemIcon>
                                    <ListItemText  primary="Archiver" />
                                </ListItem>
                                <ListItem button onClick={e => {
                                        /// Delete Patient
                                        e.preventDefault()
                                       alert("Deleting Patient : "+patient.uid)
                                    }}>
                                    <ListItemIcon>
                                        <DeleteForeverIcon style={{color : "#f44336"}} />
                                    </ListItemIcon>
                                    <ListItemText primary="Supprimer" />
                                </ListItem>
                            </List>
                        </div>
                    </Paper>
                </Fade>
            )}
        </Popper>
        <IconButton aria-label="options" title={"More options"} onClick={e => {
            setAnchorEl(e.currentTarget)
            setOpen(!open)
        }}>
            <MoreVertIcon style={{
                color : (open ? "var(--blue)" :"grey")
            }}/>
        </IconButton>
    </>
}
const InfoPatients = (props: Props) => {
    const { displayedData, loading, error } = useContext(PatientContext);
    const renderData = (data: PatientData[], filter?: (data: PatientData[]) => PatientData[]): PatientData[] => {

        console.log("rendering data : ", data)
        return data.map((d) => {
            return {
                ...d,
                etat: <EtatPatient etat={d.etat}></EtatPatient>,
                options: <Options patient={d}></Options>
            }
        })
    }

    return (
        <PatientLayout>

            <PatientTable paginationStyle={allPatients.paginationStyle} style={allPatients.style} columns={allPatients.columns} data={renderData(displayedData)}></PatientTable>

        </PatientLayout>
    )
}

export default InfoPatients
const allPatients: TableProps = {
    paginationStyle: {
        padding: "20px"
    },
    style: {
        paddingBottom: "50px",
    },
    columns: [
        {
            id: "uid",
            label: "ID unique",
            align: 'center'
        },
        {
            id: "fullName",
            label: "Nom complet du patient",
            align: 'center'
        },
        {
            id: "age",
            label: "Age",
            align: 'center'
        },
        {
            id: "etat",
            label: "Etat",
            align: 'center'
        }, {
            id: "phone",
            label: "Numero de telephone",
            align: 'center'
        },
        {
            id: "date_insc",
            label: "Date Inscription",
            align: 'center'
        },
        {
            id: "categorie",
            label: "Catégorie maladie",
            align: 'center'
        },
        {
            id: "options",
            label: "",
            align: "center"
        }
    ],
    data: []
}