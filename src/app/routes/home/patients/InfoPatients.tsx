import React, { PropsWithChildren, useState, useContext } from 'react'
import PatientLayout from '../../../components/layout/PatientsLayout'
import { TableProps } from '../../../components/PatientTable'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade/Fade'
import InboxIcon from '@material-ui/icons/Inbox'
import Modal from '../../../components/Modal'
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '../../../components/Button'
import { IconButton, Typography, CircularProgress, ListItem, ListItemProps, ListItemIcon, ListItemText, Divider, List} from '@material-ui/core';
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
function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}
interface OptionsProps {
    patient: PatientData,
    handleDelete: () => void,
    handleEdit: () => void,
    handleArchive: () => void
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
            <Button  text="Cancel" variant="text" size="large" onClick={handleCancel}></Button>
        </div></>)
}
const Options: React.FC<OptionsProps> = ({ patient, handleDelete, handleEdit, handleArchive }) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
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
                action : "DELETE"
            }}
            buttonStyles ={{
                left : {
                    color : "#f44336"
                }
            }}
            handleAction={()=> alert("Deleting Patient ...")}
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
                action : "ARCHIVE"
            }}
            buttonStyles ={{
                left : {
                    color : "#004d40"
                }
            }}
            handleAction={()=> alert("Deleting Patient ...")}
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
                                    navigate("/app/home/Patients/Edit")

                                }}>
                                    <ListItemIcon>
                                        <EditIcon style={{ color: "var(--blue)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                </ListItem>
                                <ListItem button onClick={e => {
                                    /// Archive Patient
                                    e.preventDefault()

                                    setArchiveModalOpen(true)
                                }} >
                                    <ListItemIcon>
                                        <ArchiveIcon style={{ color: "#004d40" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Archiver" />
                                </ListItem>
                                <ListItem button onClick={e => {
                                    /// Delete Patient
                                    e.preventDefault()
                                    setDeleteModalOpen(true)
                                }}>
                                    <ListItemIcon>
                                        <DeleteForeverIcon style={{ color: "#f44336" }} />
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
                color: (open ? "var(--blue)" : "grey")
            }} />
        </IconButton>
    </>
}
const InfoPatients = (props: Props) => {
    const { displayedData, loading, error } = useContext(PatientContext);

    const renderData = (data: PatientData[]): PatientData[] => {

        console.log("rendering data : ", data)
        return data.map((d) => {
            return {
                ...d,
                etat: <EtatPatient etat={d.etat}></EtatPatient>,
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