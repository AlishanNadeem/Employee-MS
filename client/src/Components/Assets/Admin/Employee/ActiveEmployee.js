import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Snackbar,
    Dialog,
    Backdrop,
    Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Alert } from '@material-ui/lab';
import Loader from '../../Loader';
import Heading from '../../Heading';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#003049',
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14,
        backgroundColor: theme.palette.common.white,
        maxWidth: '80px',
    },
    button: {
        margin: theme.spacing(1),
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
    statusColorRed: {
        color: 'red',
        fontWeight: 'bold',
    },
    statusColorGreen: {
        color: 'green',
        fontWeight: 'bold',
    },
    statusColorBlue: {
        color: '#003049',
        fontWeight: 'bold',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ActiveEmployee() {
    const classes = useStyles();

    const [isDeleted, setIsDeleted] = React.useState(false);
    const [activeEmployee, setActiveEmployee] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedUpdate, setIsLoadedUpdate] = useState(false);
    const [onClickAdd, setOnClickAdd] = React.useState(false);
    const [onClickUpdate, setOnClickUpdate] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState({});
    const [description, setDescription] = React.useState({});

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsDeleted(false);
    };

    useEffect(() => {
        getActiveEmployees();
    }, []);

    const getActiveEmployees = () => {
        Axios.get('http://localhost:5000/admin/employees', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                const getActiveEmployees = res.data;
                setActiveEmployee(getActiveEmployees);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteEmployee = (id) => {
        Axios.post(`http://localhost:5000/admin/deleteEmployee/${id}`, null, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                setIsDeleted(true);
                console.log(res.data);
                getActiveEmployees();

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const viewEmployee = (id) => {
        Axios.get(`http://localhost:5000/admin/employees/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                setSelectedEmployee({
                    id: res.data._id,
                    name: res.data.name,
                    contactNumber: res.data.contactNumber,
                    email: res.data.email,
                    dateOfBirth: res.data.dateOfBirth,
                    age: res.data.age,
                    gender: res.data.gender,
                    address: res.data.address,
                    designation: res.data.designation,
                });
                console.log(selectedEmployee);
                setOnClickUpdate(true);
                setIsLoadedUpdate(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleClickAdd = () => {
        setOnClickAdd(true);
    };

    const handleClickUpdate = (e) => {
        setIsLoadedUpdate(true);
        viewEmployee(e);
    };

    const handleClose = (data) => {
        setOnClickAdd(data);
        setOnClickUpdate(data);
        getActiveEmployees();
    };

    return (
        <div className={classes.parentDiv}>
            <Backdrop className={classes.backdrop} open={isLoadedUpdate}>
                <Loader />
            </Backdrop>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={isDeleted} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    Employee Deleted Successfully
                </Alert>
            </Snackbar>
            {
                onClickAdd === true ?
                    <Dialog open={onClickAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <AddEmployee dialogClose={handleClose} />
                    </Dialog> : null
            }
            {
                onClickUpdate === true ?
                    <Dialog open={onClickUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <UpdateEmployee dialogClose={handleClose} selectedEmployee={selectedEmployee} />
                    </Dialog> : null
            }
            <div className={classes.upperChild}>
                <Heading text='Employees Detail' />
            </div>
            <div className={classes.lowerChild}>
                <TableContainer component={Paper}>
                    <Grid container justify="flex-end">
                        <Button
                            variant="outlined"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            startIcon={<AddCircleIcon />}
                            onClick={handleClickAdd}>
                            Add New
                        </Button>
                    </Grid>
                    {
                        isLoaded === false ? (<Loader />) : (
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Employee ID</StyledTableCell>
                                        <StyledTableCell align="center">Employee Name</StyledTableCell>
                                        <StyledTableCell align="center">Designation</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Contact #</StyledTableCell>
                                        <StyledTableCell align="center">Gender</StyledTableCell>
                                        <StyledTableCell align="center">Joining Date</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {activeEmployee.length > 0 ?
                                    (<TableBody>
                                        {activeEmployee.map((employee) => (
                                            <StyledTableRow key={employee._id}>
                                                <StyledTableCell align="center" component="th" scope="row">{employee.employeeId}</StyledTableCell>
                                                <StyledTableCell align="center">{employee.name}</StyledTableCell>
                                                <StyledTableCell align="center">{employee.designation}</StyledTableCell>
                                                <StyledTableCell align="center">{employee.email}</StyledTableCell>
                                                <StyledTableCell align="center">0{employee.contactNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{employee.gender}</StyledTableCell>
                                                <StyledTableCell align="center">{employee.hireDate}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <React.Fragment>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            className={classes.button}
                                                            startIcon={<CloudUploadIcon />}
                                                            onClick={() => handleClickUpdate(employee._id)}>
                                                            Update

                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="small"
                                                            className={classes.button}
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => deleteEmployee(employee._id)}>
                                                            Delete
                                                        </Button>
                                                    </React.Fragment>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>) :
                                    (<h2>No Active Employee Found</h2>)
                                }
                            </Table>
                        )
                    }
                </TableContainer>
            </div>
        </div>
    );
}
