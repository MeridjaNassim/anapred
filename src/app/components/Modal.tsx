import React, { PropsWithChildren } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily :"var(--font)"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      border : "0px solid transparent",
      outline :"none",
      fontFamily :"inherit",
      borderRadius : "20px",
      padding: theme.spacing(6, 10, 6),
    },
  }),
);

interface Props{
    open :boolean;
    handleClose :()=>void
}

export default function TransitionModal({children,open,handleClose} : PropsWithChildren<Props>) {
  const classes = useStyles();
  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <div className={classes.paper}>
       {children}
      </div>
    </Fade>
  </Modal>
  );
}