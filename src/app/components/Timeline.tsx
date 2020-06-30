import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar/Avatar'

import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px',
    width: "100%",
    boxShadow: "var(--drop-shadow)",
    borderRadius :"var(--border-radius)",
    borderTopLeftRadius :"0"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timeLineItem: {
    "&::before": {
      padding: 0,
      content: "initial"
    },
  },
  infoRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  secondItem: {
    marginLeft: "10px",
    textAlign: "right"
  },
  metaData : {
    display : "flex",
    width :"100%",
    justifyContent :"space-between"
  },
   bold : {
        fontWeight: "bold",
    }
}));

interface Props {
  data: any[]
}

const Intervention = ({ doctor , typeMaladie , nomMaladie,description}) => {
  const classes = useStyles()
  return <>
    <Typography variant="h6" color="secondary" style={{
      fontWeight: "bold"
    }}>{doctor}</Typography>
    <Container style={{
      marginTop :"20px"
    }}>
      <div className={classes.infoRow}>
        <div>
          <Typography variant="body1" color="secondary"  className={classes.bold}>Type de maladie</Typography>
          <Typography variant="body2" color="primary">{typeMaladie}</Typography>
        </div>
        <div className={classes.secondItem}>
          <Typography variant="body1" color="secondary"  className={classes.bold}>Nom de maladie</Typography>
          <Typography variant="body2" color="primary">{nomMaladie}</Typography>
        </div>
      </div>
      <div className={classes.infoRow}>
        <div>
          <Typography variant="body1" color="secondary"  className={classes.bold}>Description</Typography>
          <Typography variant="body2" color="primary">{description}</Typography>
        </div>
      </div>
      <div className={classes.metaData}>
  <Typography variant="body2" color="secondary"  className={classes.bold}>{(new Date()).toLocaleString()}</Typography>
          <Typography variant="body2" color="primary">Mustapha Basha</Typography>
      </div>
    </Container>
  </>
}
export default function CustomizedTimeline({ data = [] }: Props) {
  const classes = useStyles();
  return (
    <Timeline align="left" style={{
      padding :0
    }} >
      {
        data.map((intervention, index) => {
          return <TimelineItem className={classes.timeLineItem}>
            <TimelineSeparator>
              <Avatar src={intervention?.doctor?.photoUrl} >U</Avatar>

              {(index !== data.length - 1) && <TimelineConnector  />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper className={classes.paper}>
                <Intervention doctor={intervention?.doctor?.displayName} typeMaladie={intervention.categorie} nomMaladie={intervention.nomMaladie} description={intervention.description}></Intervention>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        })
      }
    </Timeline>
  );

}
