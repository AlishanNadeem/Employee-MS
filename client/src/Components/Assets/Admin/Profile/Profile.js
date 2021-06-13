import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Avatar,
} from '@material-ui/core';
import Heading from '../../Heading';
import Loader from '../../Loader';

const useStyles = makeStyles((theme) => ({
    parentDiv: {
        display: 'flex',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    upperChild: {
        display: 'flex',
        flex: 0.1,
        width: '100%',
        flexDirection: 'column',
    },
    lowerChild: {
        display: 'flex',
        flex: 0.9,
        flexDirection: 'column',
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    },
    baseColor: {
        backgroundColor: '#003049',
    },
    color: {
        color: '#003049',
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        fontSize: '50px',
        textAlign: 'center',
        justifyContent: 'center',
    },
}));


export default function Profile() {
    const classes = useStyles();

    const [profile, setProfile] = useState({});
    const [name, setName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);

        return color;
    }

    const getProfile = () => {
        Axios.get(`http://localhost:5000/admin/viewProfile`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                const getProfile = res.data;
                setProfile(getProfile);
                setName(res.data.name.charAt(0));
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={classes.parentDiv}>
            <div className={classes.upperChild}>
                <Heading text='Your Profile' />
            </div>
            <div className={classes.lowerChild}>
                <div className={classes.margin}>
                    {
                        isLoaded === false ? (<Loader />) : (
                            <React.Fragment>
                                <Grid container justify="center">
                                    <Avatar className={classes.large} style={{ backgroundColor: randomColor() }}>{name}</Avatar>
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '50px' }}>
                                    <Grid item md={2} sm={2} xs={2}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Id"
                                            defaultValue={profile.employeeId}
                                            size='small'
                                            fullWidth

                                        />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Name"
                                            defaultValue={profile.name}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={4}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Date of Birth"
                                            value={profile.dateOfBirth}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} style={{ marginTop: '40px' }}>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Contact Number"
                                            value={profile.contactNumber}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Email"
                                            value={profile.email}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={2} sm={2} xs={2}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Gender"
                                            value={profile.gender}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} style={{ marginTop: '40px' }}>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Address"
                                            value={profile.address}
                                            size='small'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
