import 'date-fns';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Typography,
    Divider,
    Button,
} from '@material-ui/core';
import { DialogActions, DialogContent } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios';

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

export default function AddProjectForm(props) {
    const classes = useStyles();

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setEmployeeId(props.employee.id);
        setEmployeeName(props.employee.name);
    }, []);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        addProject();
    }

    const handleClose = () => {
        props.dialogClose(false);
    }

    const addProject = () => {
        const data = {
            description: description,
        }
        console.log(data);

        Axios.post(`http://localhost:5000/admin/addProject/${employeeId}`, data, {
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
        <React.Fragment>
            <DialogContent>
                <div className={classes.margin}>
                    <Grid container justify="center">
                        <Typography variant="h4" className={classes.color} gutterBottom>
                            Assign New Project
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                label="Employee Name"
                                value={employeeName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
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
                    startIcon={<SendIcon />}
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </React.Fragment>
    );
}
