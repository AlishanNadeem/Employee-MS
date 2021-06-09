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

export default function AddLeave(props) {
    const classes = useStyles();

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [description, setDescription] = useState("");

    useEffect(() => {
        setSelectedStartDate(props.selectedLeave.startDate);
        setSelectedEndDate(props.selectedLeave.endDate);
        setDescription(props.selectedLeave.description);
    }, []);

    const updateLeave = () => {

        const data = {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            description: description,
        }
        console.log(data);

        Axios.post(`http://localhost:5000/employee/updateLeaveRequest/${props.selectedLeave.id}`, data, {
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
        updateLeave();
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
                                    format="dd/MM/yyyy"
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
                                    format="dd/MM/yyyy"
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
