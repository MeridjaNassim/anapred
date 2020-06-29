import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from '@reach/router'
import Layout from '../../components/layout/layout'
import { useFirebaseAuthState } from '../hooks/auth.hook'
import { APP_HOME } from './routes';
import { Avatar, Container, Typography, TextField } from '@material-ui/core';
import avatar from '../images/profile.jpeg'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ArrowBackIos, Navigation } from '@material-ui/icons';
import Button from '../components/Button';
import StyledBadge from '../components/StyledBadge';
import { PageProps } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            margin: "auto",
            marginBottom: theme.spacing(2)
        },
        avatar: {
            boxShadow: theme.shadows[2]
        },

        avatarContainer: {
            textAlign: "center"
        },
        form: {
            width: '80%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        return: {
            position: 'absolute',
            top: theme.spacing(2),
            left: theme.spacing(4)
        }
    }),
);

interface Props {
    path: string
}

export default function Profile({ }: PageProps): ReactElement {
    const classes = useStyles();
    const [user, loading, error] = useFirebaseAuthState();
    const [formData, setFormData] = useState({
        email: "",
        displayName: "",
        imgUrl: ""
    })
    const handleUpdate = async () => {
        if (user) {
            const { displayName, imgUrl } = formData
            await user.updateProfile({
                displayName,
                photoURL: imgUrl
            })
            alert("Updated profile with display Name " + displayName)
        }
    }
    useEffect(() => {
        console.log('Loading : ', loading)
    }, [loading])
    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email,
                displayName: user.displayName,
                imgUrl: user.photoURL
            })
        }
    }, [user])
    return (
        <Layout>
            <Container className={classes.root}>
                {error && <Container>
                    <Typography variant="h1" color="secondary"> Error loading user</Typography>
                </Container>}

                {loading && <>
                    <Container className={classes.avatarContainer}>
                        <Avatar className={[classes.large, classes.avatar]}  >User</Avatar>
                        <Typography variant="body1" color="primary"> Loading user Data</Typography>
                    </Container>

                </>}
                {user && <>

                    <Container className={classes.avatarContainer}>
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar src={user.photoURL} className={[classes.large, classes.avatar]} >{user.displayName}</Avatar>
                        </StyledBadge>

                        <Typography variant="h4" color="primary">{user.displayName}</Typography>
                    </Container>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            autoComplete="email"
                            autoFocus
                            onChange={e => {
                                e.preventDefault()
                                setFormData({ ...formData, email: e.target.value })
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="displayName"
                            value={formData.displayName}
                            label="Display Name"
                            id="displayName"
                            autoComplete="current-password"
                            onChange={e => {
                                e.preventDefault()
                                setFormData({ ...formData, displayName: e.target.value })
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="imageUrl"
                            value={formData.imgUrl}
                            label="Profile Image URL"
                            id="imgUrl"
                            onChange={e => {
                                e.preventDefault()
                                setFormData({ ...formData, imgUrl: e.target.value })
                            }}
                        />
                        <Button
                            type="submit"
                            text="Update Profile"
                            onClick={e => {
                                e.preventDefault()
                                handleUpdate()
                            }}
                        />
                    </form>
                </>}

                    
                <Link to={APP_HOME} className={classes.return}><ArrowBackIos color="primary" titleAccess="retour" /></Link>
            </Container>
        </Layout>
    )
}
