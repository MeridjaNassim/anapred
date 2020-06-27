import { Column } from "../components/PatientTable";

export const all_patient_columns :Column[] =  [
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
]