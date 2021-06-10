import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Avatar,
} from '@material-ui/core';
import Heading from './Heading';

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
    },
}));

export default function Profile(props) {
    const classes = useStyles();

    const [profile, setProfile] = useState({
        employeeId: '',
        name: '',
        address: '',
        contactNumber: '',
        age: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        designation: ''
    });

    useEffect(() => {
        getProfile();
        console.log(profile );
    }, []);

    const getProfile = () => {
        Axios.get(`http://localhost:5000/employee/viewProfile`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                setProfile({
                    employeeId: res.data.employeeId,
                    name: res.data.name,
                    address: res.data.address,
                    contactNumber: res.data.contactNumber,
                    age: res.data.age,
                    dateOfBirth: res.data.dateOfBirth,
                    gender: res.data.gender,
                    email: res.data.email,
                    designation: res.data.designation
                });
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
                    <Grid container justify="center">
                        <Avatar className={classes.large} />
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '50px' }}>
                        <Grid item md={2} sm={2} xs={2}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Id"
                                value={profile.employeeId}
                                size='small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Name"
                                value={profile.name}
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
                </div>
            </div>
        </div>
    );
}
