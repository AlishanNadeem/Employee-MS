import 'date-fns';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Typography,
    Divider,
    Button,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DialogActions, DialogContent } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
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
}));

export default function UpdateEmployee(props) {
    const classes = useStyles();

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");

    useEffect(() => {
        setName(props.selectedEmployee.name);
        setContact(props.selectedEmployee.contactNumber);
        setEmail(props.selectedEmployee.email);
        setDateOfBirth(props.selectedEmployee.dateOfBirth);
        setAge(props.selectedEmployee.age);
        setGender(props.selectedEmployee.gender);
        setAddress(props.selectedEmployee.address);
        setDesignation(props.selectedEmployee.designation);
    }, []);

    const updateEmployee = () => {

        const data = {
            name: name,
            contactNumber: contact,
            email: email,
            dateOfBirth: dateOfBirth,
            age: age,
            gender: gender,
            address: address,
            designation: designation,
        }
        console.log(data);

        Axios.post(`http://localhost:5000/admin/updateEmployee/${props.selectedEmployee.id}`, data, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res);
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDateOfBirthChange = (DOB) => {
        setDateOfBirth(DOB);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleDesignationChange = (e) => {
        setDesignation(e.target.value);
    };

    const handleSubmit = () => {
        updateEmployee();
    }

    const handleClose = () => {
        props.dialogClose(false);
    }

    return (
        <React.Fragment>
            <DialogContent>
                <div className={classes.margin}>
                    <Grid container justify="center">
                        <Typography variant="h4" className={classes.color} gutterBottom>
                            Update Employee
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid container spacing={3} justify="center" style={{ marginTop: '30px' }}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Contact #"
                                value={contact}
                                onChange={handleContactChange}
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item md={6} sm={6} xs={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    id="date-picker-inline"
                                    label="Date Of Birth"
                                    value={dateOfBirth}
                                    onChange={handleDateOfBirthChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item md={2} sm={2} xs={2}>
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Age"
                                value={age}
                                onChange={handleAgeChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                fullWidth
                                labelId="gender"
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '30px' }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Address"
                            value={address}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid container style={{ marginTop: '30px' }}>
                        <InputLabel id="designation">Desgination</InputLabel>
                        <Select
                            fullWidth
                            labelId="designation"
                            value={designation}
                            onChange={handleDesignationChange}
                        >
                            <MenuItem value="Team Lead">Team Lead</MenuItem>
                            <MenuItem value="Sr. Developer">Sr. Developer</MenuItem>
                            <MenuItem value="Jr. Developer">Jr. Developer</MenuItem>
                            <MenuItem value="SQA">SQA</MenuItem>
                            <MenuItem value="Receptionist">Receptionist</MenuItem>
                            <MenuItem value="Intern">Intern</MenuItem>
                        </Select>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </React.Fragment>
    );
}
