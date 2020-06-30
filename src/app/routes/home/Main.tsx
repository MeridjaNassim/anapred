import React, { ReactElement } from 'react'
import { Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'

import Button from '../../components/Button'
import { navigate } from 'gatsby';
import { APP_PATIENTS, APP_DASHBOARD } from '../routes';

interface Props {
    path: string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {

            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: "50vh",
            margin :"20px",
            flex : 1,
            borderRadius : "var(--border-radius)",
            boxShadow : "var(--drop-shadow)"
        },
        wrapper: {
            paddingTop: theme.spacing(4),
            height: "80vh"
        },
        itemContainer :{
            margin : "auto",
            display :"flex",
            flexWrap :"wrap"
        },
        typography : {
            padding: theme.spacing(5),
            fontFamily : "var(--font)",
            marginBottom : "10px"
        },
        image : {
            maxHeight :"50%"
        }
    }),
);
export default function Main({ }: Props): ReactElement {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <Container className={classes.itemContainer}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" className={classes.typography} color="primary">Dashboard</Typography>
                    <img src={require('../../../images/chart.jpeg')} width="100%"></img>
                    <Button  text="Go to dashboard" onClick={e => navigate(APP_DASHBOARD)}/>
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h4" className={classes.typography} color="primary">Patients</Typography>
                    <img className={classes.image} src={require('../../../images/patients.png')} width="100%"></img>
                    <Button  text="Go to Patients" onClick={e => navigate(APP_PATIENTS)}/>
                </Paper>
               
            </Container>

        </Container>
    )
}
