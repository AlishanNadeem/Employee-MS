import 'date-fns';
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Typography,
    Divider,
    Button,
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
    // const [data, setData] = React.useState({
    //     startDate: null,
    //     endDate: null,
    //     description: null
    // });

    useEffect(() => {
        return() => { //componentWillUnmoint
            console.log(description)
        }
    }, []);

    const handleStartDateChange = (startDate) => {
        setSelectedStartDate(startDate);
        console.log(selectedStartDate);
    };

    const handleEndDateChange = (endDate) => {
        setSelectedEndDate(endDate);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const sendData = () => {
        props.description(description);
    }

    const handleSubmit = () => {
        // setData({
        //     startDate: selectedStartDate,
        //     endDate: selectedEndDate,
        //     description: description
        // });
        console.log(description);
    }

    return (
        <div className={classes.margin}>
            <Grid container justify="center">
                <Typography variant="h4" className={classes.color} gutterBottom>
                    {props.heading}
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
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
        </div>
    );
}
