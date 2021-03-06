import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '../components/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { navigate } from 'gatsby';
import { useEmailPasswordCredentials, useFirebaseAuth } from '../hooks/auth.hook';
import { APP_HOME } from './routes';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily : "var(--font)"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily :"inherit"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  brand : {
    fontFamily : 'var(--font-montserrat)',
    fontWeight : 800
  }
}));


interface Props {
  path: string,

}

// const FirebaseUiConfig = {
//   signInFlow: 'popup',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
//   callbacks: {
//     // Avoid redirects after sign-in.
//     signInSuccessWithAuthResult: () => false
//   }
// }
export default function Welcome({} : Props) {

  const classes = useStyles();
  const {credentials , setEmail , setPassword} = useEmailPasswordCredentials();
  const {signInWithEmailAndPassword} = useFirebaseAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(credentials)
    await signInWithEmailAndPassword(credentials);
    navigate(APP_HOME)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
      <Typography component="h1" variant="h5" color="primary" className={classes.brand}>
           <span className={classes.brand} style={{color :"var(--light-blue)"}}>ANA</span>PRED
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e =>{
              setEmail(e.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e =>{
              setPassword(e.target.value)
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            text=" Sign In"
            className={classes.submit}
            onClick={handleSignIn}
          />
           
            <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}