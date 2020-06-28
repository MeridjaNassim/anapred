import React, { useState, useContext } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
import { TableProps } from '../../../components/PatientTable'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade/Fade'
import Modal from '../../../components/Modal'
import Popper from '@material-ui/core/Popper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '../../../components/Button'
import { IconButton, Typography, ListItem, ListItemIcon, ListItemText ,List} from '@material-ui/core';
import PatientTable from '../../../components/PatientTable'
import { PatientData, Etat } from '../../../interfaces/patient'
import PatientContext from '../../../state/patients/PatientContext';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { navigate } from 'gatsby';
import { all_patient_columns } from '../../../utils/TableColumns';
import { EDIT_PATIENT } from '../../routes';
import { GET_ONE, DELETE_PATIENT } from '../../../state/patients/actions';

interface Props {
    path: string,
}
interface OptionsProps {
    patient: PatientData,
}

interface ModalContentProps {
    classes : {
        modalTitle : string,
        modalSubtitle: string,
        modalContent : string,
        mRight :string,
        buttons : string,
    },
    content : {
        title : string,
        subtitle : string,
        body : string,
        action : string
    },
    buttonStyles : {
        left : {
            color : string
        }
    },
    handleAction : ()=>void,
    handleCancel : ()=>void
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


const ModalContent : React.FC<ModalContentProps>= ({classes,content,buttonStyles,handleAction,handleCancel})=> {
    return (<>
    <Typography variant="h3" className={classes.modalTitle}>{content.title}</Typography>
    <Typography variant="subtitle1" className={classes.modalSubtitle}>{content.subtitle}</Typography>
    <Typography variant="body1" className={classes.modalContent}>{content.body}</Typography>
        <div className={classes.buttons}>
            <Button  className={classes.mRight} style={{
                color :buttonStyles.left.color,
                borderColor :buttonStyles.left.color
            }} variant="outlined" text={content.action} size="large" onClick={handleAction}></Button>
            <Button  text="ANNULER" variant="text" size="large" onClick={handleCancel}></Button>
        </div></>)
}
const Options: React.FC<OptionsProps> = ({ patient}) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
    const {dispatch} = useContext(PatientContext)
    const classes = useOptionsStyles();
    const optionClasses = useOptionStyles();
    
    const DeleteModal = <Modal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)}>
        <ModalContent
            classes={{
                modalTitle : classes.modalTitle,
                modalContent : classes.modalContent,
                modalSubtitle : classes.modalSubtitle,
                mRight : classes.mRight,
                buttons : classes.buttons
            }}
            content ={{
                title : "Delete patient permenantly",
                subtitle : `Patient ID : ${patient.uid}`,
                body :"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo deleniti sed obcaecati quidem repudiandae soluta maiores cupiditate sint! Ipsam quo quas quasi error, praesentium aut sunt vero molestias iste dolorem.",
                action : "SUPPRIMER"
            }}
            buttonStyles ={{
                left : {
                    color : "var(--red)"
                }
            }}
            handleAction={()=> {
                dispatch({
                    type : DELETE_PATIENT,
                    payload :{
                        uid : patient.uid
                    }
                })
                alert("Deleted patient " + patient.uid)
            }}
            handleCancel={()=> setDeleteModalOpen(false)}
        />
                </Modal>
    const ArchiveModal = <Modal open={archiveModalOpen} handleClose={() => setArchiveModalOpen(false)}>
        <ModalContent
            classes={{
                modalTitle : classes.modalTitle,
                modalContent : classes.modalContent,
                modalSubtitle : classes.modalSubtitle,
                mRight : classes.mRight,
                buttons : classes.buttons
            }}
            content ={{
                title : "Archive patient",
                subtitle : `Patient ID : ${patient.uid}`,
                body :"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo deleniti sed obcaecati quidem repudiandae soluta maiores cupiditate sint! Ipsam quo quas quasi error, praesentium aut sunt vero molestias iste dolorem.",
                action : "ARCHIVER"
            }}
            buttonStyles ={{
                left : {
                    color : "var(--green)"
                }
            }}
            handleAction={()=> {
              
            }}
            handleCancel={()=> setArchiveModalOpen(false)}
        />
    </Modal>
    return <>
        {DeleteModal}
        {ArchiveModal}
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper className={classes.paper}>
                        <div className={optionClasses.root}>
                            <Typography className={classes.typography} variant="caption">Patient : {patient.uid}</Typography>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button onClick={e => {
                                    /// set Edit Patient
                                    dispatch({
                                        type : GET_ONE,
                                        payload : {
                                            uid : patient.uid
                                        }
                                    })
                                    navigate(EDIT_PATIENT)

                                }}>
                                    <ListItemIcon>
                                        <EditIcon style={{ color: "var(--blue)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Modifier les info du patient" />
                                </ListItem>
                                <ListItem button onClick={e => {
                                    /// Archive Patient
                                    e.preventDefault()

                                    setArchiveModalOpen(true)
                                }} >
                                    <ListItemIcon>
                                        <ArchiveIcon style={{ color: "var(--green)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Archiver le patient" />
                                </ListItem>
                                <ListItem button onClick={e => {
                                    /// Delete Patient
                                    e.preventDefault()
                                    setDeleteModalOpen(true)
                                }}>
                                    <ListItemIcon>
                                        <DeleteForeverIcon style={{ color: "var(--red)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Supprimer le patient" />
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
                color: (open ? "var(--blue)" : "grey")
            }} />
        </IconButton>
    </>
}
const InfoPatients = (props: Props) => {
    const { displayedData, loading, error } = useContext(PatientContext);

    const renderData = <T extends PatientData[] >(data:T): PatientData[] => {

        console.log("rendering data : ", data)
        return data.map((d) => {
            return {
                ...d,
                etat: <EtatPatient etat={d?.etat}></EtatPatient>,
                options: <Options patient={d}
                ></Options>
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
    columns: all_patient_columns,
    data: []
}


const useOptionsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 500,
        
        },
        typography: {
            padding: theme.spacing(10),
            paddingTop: 10,
            color: 'var(--blue)',
            fontFamily :"var(--font)"
        },
        paper: {
          
            boxShadow: "0px 6px 6px rgba(0,0,0,0.2)"
        },
        buttons : {
            marginTop :"20px",
            display : "flex",
            justifyContent :"flex-end",
            alignItems : "center"
        },
        mRight : {
            marginRight : "20px"
        },
        modalTitle : {
            marginBottom : "1rem",
            fontFamily :"var(--font)"
        },
        modalSubtitle : {
            marginBottom : "0.5rem",
            fontFamily :"var(--font)",
            color: 'var(--blue)',
        },
        modalContent : {
            maxWidth :"600px",
            fontFamily :"var(--font)"
        }
    }),
);

const useOptionStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 600,
            paddingTop: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
        },
    }),
);