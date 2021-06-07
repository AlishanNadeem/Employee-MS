import 'date-fns';
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Typography,
    Divider,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export default function LeaveForm(props) {
    const classes = useStyles();

    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [description, setDescription] = React.useState("");

    useEffect(() => {
        return() => { //componentWillUnmoint
            sendData();
        }
    }, []);

    const handleStartDateChange = (startDate) => {
        setSelectedStartDate(startDate);
    };

    const handleEndDateChange = (endDate) => {
        setSelectedEndDate(endDate);
    };

    const handleDescriptionChange = (e) => {
        let event = e.target.value;
        setDescription(event);
        console.log(description);
    };

    const sendData = () => {
        props.description(description);
    }

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
                            value={selectedStartDate}
                            onChange={handleStartDateChange}
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
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
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
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                />
            </Grid>
        </div>
    );
}
