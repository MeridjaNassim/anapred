

import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import styles from '../../../styles/patientLayout.module.css';
import OperationLayout from "../../../components/layout/OperationLayout";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '../../../components/Button'
import { navigate } from "gatsby";
import { APP_PATIENTS } from "../../routes";
import PatientContext from "../../../state/patients/PatientContext";
import { ADD_PATIENT } from "../../../state/patients/actions";
import Modal from "../../../components/Modal";
import { useFirebaseAuthState } from "../../../hooks/auth.hook";




const useStyles = makeStyles(theme => ({
    root: {
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch"
    },
    virus: {
        position: "absolute",
        top: "30vh",
        left: "1%"
    }
}));

/* lists of droplist content*/
const sexes = [{ value: "Masculin", label: "Masculin" }, { value: "Feminin", label: "Feminin" }];
const etats = [
    { value: "Bon", label: "Bon" },
    
    { value: "Urgent", label: "Urgent" },
    {
        value : "Critique",
        label : "Critique"
    },
    {
        value :"Normal",
        label : "Normal"
    }
];
const wilayas = [{ value: "Alger", label: "Alger" }, { value: "Blida", label: "Blida" }];
const communes = [{ value: "Alger", label: "Alger" }, { value: "Alger", label: "Alger" }];
//#############################################################
interface Props {
    path: string;
}


const AjoutPatients = (props: Props) => {
    const classes = useStyles();
    const { dispatch } = useContext(PatientContext)
    /* on submit form function*/
    const onSubmit = e => {
        e.preventDefault()
        dispatch({
            type: ADD_PATIENT,
            payload: {
                ...values,
                fullName: values.prenom.trim() + " " + values.nom.trim(),
                age: values.age,
                categorie : (state.checkedA) ? "Pandemie" : values.categorie,
                date_insc: (new Date()).toUTCString(),
                interventions : [
                    {
                        doctor : {
                            uid : user.uid,
                            photoUrl : user.photoURL,
                            email : user.email,
                            displayName : user.displayName
                        },
                        categorie : values.categorie,
                        description : values.descriptionMaladie,
                        nomMaladie : values.nomMaladie
                    }
                ]
            }
        })
        setModal(true)
        /* here the connection with the data base*/
        
        /* firebase
           .firestore()
           .collection("items")
           .add({
            nom,prenom,address,codeP,numeroTelephone,adresseEmail,nomPrenomPersonne,sexe,wilaya,commune,age
           })*/

    }
    //############################################

    /*values contains the inputs (patient's data )*/
    const [values, setValues] = React.useState({
        nom: "",
        prenom: "",
        address: "",
        codeP: "",
        phone: "",
        adresseEmail: "",
        nomPrenomPersonne: "",
        addressPersonne: "",
        numeroTelephonePersonne: "",
        sexe: "Masculin",
        wilaya: "Alger",
        commune: "Alger",
        age: "18",
        categorie: "",
        nomMaladie: "",
        descriptionMaladie: "",
        etat : ""

    });

    /*handling textfields changes*/
    const handleChangeForm = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };


    /*Switch handling*/
    const [state, setState] = React.useState({
        checkedA: false,
    });
    const [user] = useFirebaseAuthState()
    const [modal, setModal] = React.useState(false)

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    //#############################################################################

    return (
        <form onSubmit={onSubmit} autoComplete="off" >
            <div>
                <OperationLayout title="Ajouter patient" text="Informations relatif au patient" paper={true}>
                    <Modal open={modal} handleClose={() => setModal(false)}>
                        <Typography color="primary" style={{
                            marginBottom: "100px"
                            ,
                            textAlign: "center"
                        }} variant="h6" gutterBottom>
                            Patient ajouté
                        </Typography>
                        <Button text="Fermer"
                            onClick={e => {
                                e.preventDefault();
                                setModal(false)
                            }}
                            style={{
                                alignSelf: "center",
                                color: "var(--red)",
                                borderColor: "var(--red)"
                            }} size="medium" />
                    </Modal>
                    <div style={{ width: '66%', margin: 'auto' }} >

                        <div>
                            <div style={{ margin: 8 }}>Information Personnel</div>
                            <div style={{ marginLeft: 40, marginTop: 8 }} >
                                <TextField
                                    required
                                    id="nomPatient"
                                    label="Nom du patient"
                                    defaultValue=""
                                    value={values.nom}
                                    variant="outlined"
                                    style={{ margin: 16, width: '237.5px' }}
                                    size="small"
                                    onChange={handleChangeForm("nom")}
                                />
                                <TextField
                                    required
                                    id="prenomPatient"
                                    label="Prénom du patient"
                                    defaultValue=""
                                    value={values.prenom}
                                    variant="outlined"
                                    style={{ margin: 16, width: '237.5px' }}
                                    size="small"
                                    onChange={handleChangeForm("prenom")}
                                />
                                <TextField
                                    id="sexe"
                                    select
                                    label="Sexe"
                                    value={values.sexe}
                                    onChange={handleChangeForm("sexe")}

                                    variant="outlined"
                                    style={{ margin: 16, width: '162px' }}
                                    size="small"
                                >
                                    {sexes.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div style={{ marginLeft: 40 }}>
                            <TextField
                                required
                                id="adressePatient"
                                label="Adresse du patient"
                                defaultValue=""
                                variant="outlined"
                                value={values.address}
                                style={{ margin: 16, width: '68.6%', }}
                                size="small"
                                onChange={handleChangeForm("address")}
                            />
                            <TextField
                                id="age"
                                label="Age"
                                type="number"
                                min={0}
                                max={100}
                                value={values.age}
                                onChange={handleChangeForm("age")}

                                variant="outlined"
                                style={{ margin: 16, width: '162px', }}
                                size="small"
                            />

                            <div />
                            <div>
                                <TextField
                                    id="wilaya"
                                    select
                                    label="Wilaya"
                                    value={values.wilaya}
                                    onChange={handleChangeForm("wilaya")}
                                    variant="outlined"
                                    style={{ margin: 16, width: '237.5px' }}
                                    size="small"
                                >
                                    {wilayas.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    id="commune"
                                    select
                                    label="Commune"
                                    value={values.commune}
                                    onChange={handleChangeForm("commune")}

                                    variant="outlined"
                                    style={{ margin: 16, width: '237.5px' }}
                                    size="small"
                                >
                                    {communes.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id=" codePostale"
                                    label="Code Postale"
                                    defaultValue=""
                                    value={values.codeP}
                                    variant="outlined"
                                    style={{ margin: 16, width: '162px' }}
                                    size="small"
                                    onChange={handleChangeForm("codeP")}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ margin: 12 }}>Information de contact</div>
                            <div style={{ marginLeft: 40, marginTop: 8 }}>
                                <TextField
                                    required
                                    id="phone"
                                    label="Numéro de Téléphone"
                                    defaultValue=""
                                    value={values.phone}
                                    type="phone"
                                    variant="outlined"
                                    style={{ margin: 16, width: '335px', }}
                                    size="small"
                                    onChange={handleChangeForm("phone")}
                                />

                                <TextField
                                    required
                                    id="adresseEmail"
                                    label="Adresse Email"
                                    value={values.adresseEmail}
                                    type="email"
                                    variant="outlined"
                                    style={{ margin: 16, width: '335px', }}
                                    size="small"
                                    onChange={handleChangeForm("adresseEmail")}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ margin: 16 }}>En cas d'urgence</div>
                            <div style={{ marginLeft: 40, marginTop: 8 }}>
                                <TextField
                                    required
                                    id="nomPrenomPersonne"
                                    label="Nom et prénom de la personne à contacter"
                                    defaultValue=""
                                    value={values.nomPrenomPersonne}
                                    variant="outlined"
                                    style={{ margin: 16, width: '335px', }}
                                    size="small"
                                    onChange={handleChangeForm("nomPrenomPersonne")}
                                />
                                <TextField
                                    required
                                    id="numeroTelephonePersonne"
                                    label="Numéro de Téléphone"
                                    defaultValue=""
                                    value={values.numeroTelephonePersonne}
                                    type="phone"
                                    variant="outlined"
                                    style={{ margin: 16, width: '335px', }}
                                    size="small"
                                    onChange={handleChangeForm("numeroTelephonePersonne")}
                                />
                            </div>
                        </div>
                        <div style={{ marginLeft: 40 }}>
                            <TextField
                                id="addressPersonne"
                                label="L'adresse la personne à contacter"
                                style={{ margin: 16, width: '95.3%' }}
                                size="small"
                                value={values.addressPersonne}
                                placeholder="Placeholder"
                                onChange={handleChangeForm("addressPersonne")}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                            />
                        </div>
                        <br></br><br></br>
                    </div>
                </OperationLayout>
                <div className={styles.layout}>
                    <section className={styles.contentArea}>
                        <div style={{
                            position: "relative"
                        }}>
                            <img src={require('../../../components/layout/icons/virus.svg')} className={classes.virus} width="10%"></img>
                        </div>
                        <div style={{ padding: '15px 5vw' }} className={styles.contentHeader}>
                            <Typography color="primary" style={{
                                marginBottom: "20px"

                            }} variant="h6" gutterBottom>
                                Informations relatif à la maladie
                    </Typography>
                            <FormControlLabel
                                label="Cas d'une épidimie"
                                labelPlacement="start"
                                control={
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }

                            />

                        </div>
                        <div style={{ width: '66%', margin: 'auto' }} >
                            <div>
                                <div style={{ margin: 16 }}>En cas d'urgence</div>
                                <div style={{ marginLeft: 40, marginTop: 8 }}>
                                    <TextField
                                        required
                                        id="categorie"
                                        label="Type de maladie"
                                        defaultValue=""
                                        value={values.categorie}
                                        variant="outlined"
                                        style={{ margin: 16, width: '335px', }}
                                        size="small"
                                        onChange={handleChangeForm("categorie")}
                                    />
                                    <TextField
                                        required
                                        id="nomMaladie"
                                        label="Nom de la maladie"
                                        defaultValue=""
                                        value={values.nomMaladie}
                                        type="phone"
                                        variant="outlined"
                                        style={{ margin: 16, width: '335px', }}
                                        size="small"
                                        onChange={handleChangeForm("nomMaladie")}
                                    />
                                      <TextField
                                    id="etat_patient"
                                    select
                                    label="Etat Patient"
                                    value={values.etat}
                                    onChange={handleChangeForm("etat")}
                                    variant="outlined"
                                    style={{ margin: 16, width: '237.5px' }}
                                    size="small"
                                >
                                    {etats.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </div>
                            </div>
                            <div style={{ marginLeft: 40 }}>
                                <TextField
                                    id="descriptionMaladie"
                                    label="Description de la maladie"
                                    style={{ margin: 16, width: '95.3%' }}
                                    size="small"
                                    value={values.descriptionMaladie}
                                    placeholder="Ecrire une description de la maladie ..."
                                    onChange={handleChangeForm("descriptionMaladie")}
                                    fullWidth
                                    multiline
                                    rows={4}

                                    variant="outlined"
                                />
                            </div>
                            <br></br><br></br>
                        </div>
                    </section>
                </div>
            </div>
            <div style={{ width: '42%', float: 'right' }}>
                <Button text="Ajouter"
                    type='submit'
                    style={{
                        width: '160px',
                        margin: '5%',
                        marginBottom: '120px',
                    }} size="medium" />

                <Button text="Annuler"
                    onClick={e => {
                        e.preventDefault();
                        navigate(APP_PATIENTS)
                    }}
                    style={{
                        width: '160px',
                        margin: '5%',
                        marginBottom: '120px',
                        color: "var(--red)",
                        borderColor: "var(--red)"
                    }} size="medium" />
            </div>
        </form>
    );
};

export default AjoutPatients;

