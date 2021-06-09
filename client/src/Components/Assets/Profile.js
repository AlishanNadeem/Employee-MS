import 'date-fns';
import React, { useState } from 'react';
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
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios';
import Heading from './Heading';
import {
    withStyles,
    FormControlLabel,
    Checkbox,
    Avatar
} from '@material-ui/core';

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
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));

export default function Profile(props) {
    const classes = useStyles();

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [description, setDescription] = useState("");

    const handleStartDateChange = (startDate) => {
        setSelectedStartDate(startDate);
    };

    const handleEndDateChange = (endDate) => {
        setSelectedEndDate(endDate);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        addLeave();
    }

    const handleClose = () => {
        props.dialogClose(false);
    }

    const addLeave = () => {
        const data = {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            description: description,
        }
        console.log(data);

        Axios.post(`http://localhost:5000/employee/addLeaveRequest`, data, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res);
                props.dialogClose(false);
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
                    <Grid container spacing={2} style={{ marginTop: '30px' }}>
                        <Grid item md={2} sm={2} xs={2}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Id"
                                defaultValue="42798"
                                size= 'small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Name"
                                defaultValue="Hello World"
                                size= 'small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={4}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Date of Birth"
                                defaultValue="Hello World"
                                size= 'small'
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
                                defaultValue="42798"
                                size= 'small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Email"
                                defaultValue="42798"
                                size= 'small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Gender"
                                defaultValue="Female"
                                size= 'small'
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
                                defaultValue="Hello World"
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
