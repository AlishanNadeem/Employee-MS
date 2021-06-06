import 'date-fns';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Avatar,
    Typography,
    Divider,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Face, Fingerprint } from '@material-ui/icons';

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

export default function LeaveForm() {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [leaves, setLeaves] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.margin}>
            <Grid container justify="center">
                <Typography variant="h4" className={classes.color} gutterBottom>
                    Update Leave
                </Typography>
            </Grid>
            <Divider />
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item md={true} sm={true} xs={true}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="End Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '30px' }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button variant="contained" color="secondary" size="large" style={{ textTransform: "none" }}>Login</Button>
            </Grid>
        </div>

    );
}
