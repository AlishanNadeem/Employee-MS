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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Alert } from '@material-ui/lab';
import Loader from '../../Loader';
import Heading from '../../Heading';
// import AddLeave from './AddLeave';
// import UpdateLeave from './UpdateLeave';

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
    statusColorYellow: {
        color: '#003049',
        fontWeight: 'bold',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Leaves() {
    const classes = useStyles();

    const [isDeleted, setIsDeleted] = React.useState(false);
    const [leaves, setLeaves] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedUpdate, setIsLoadedUpdate] = useState(false);
    const [onClickAdd, setOnClickAdd] = React.useState(false);
    const [onClickUpdate, setOnClickUpdate] = React.useState(false);
    const [selectedLeave, setSelectedLeave] = React.useState({});
    const [description, setDescription] = React.useState({});

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsDeleted(false);
    };

    useEffect(() => {
        getPendingLeaves();
    }, []);

    const getPendingLeaves = () => {
        Axios.get('http://localhost:5000/admin/viewLeaveRequests', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                const getPendingLeaves = res.data;
                setLeaves(getPendingLeaves);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteLeave = (id) => {
        Axios.post(`http://localhost:5000/employee/deleteLeaveRequest/${id}`, null, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                setIsDeleted(true);
                console.log(res.data);
                getPendingLeaves();

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const acceptLeave = (id, status) => {
        Axios.post(`http://localhost:5000/admin/approveLeaveRequest/${id}`, {
            status : status
        },
        {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                getPendingLeaves();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleClickAdd = () => {
        setOnClickAdd(true);
    };

    const handleClickAccept = (e) => {
        // setIsLoadedUpdate(true);
        acceptLeave(e, "Approved");
    };

    const handleClose = (data) => {
        setOnClickAdd(data);
        setOnClickUpdate(data);
        getPendingLeaves();
    };

    return (
        <div className={classes.parentDiv}>
            <Backdrop className={classes.backdrop} open={isLoadedUpdate}>
                <Loader />
            </Backdrop>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={isDeleted} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    Leave Deleted Successfully
                </Alert>
            </Snackbar>
            {
                onClickAdd === true ?
                    <Dialog open={onClickAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
                        {/* <AddLeave dialogClose = {handleClose}/> */}
                    </Dialog> : null
            }
            {
                onClickUpdate === true ?
                    <Dialog open={onClickUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
                        {/* <UpdateLeave dialogClose = {handleClose} selectedLeave = {selectedLeave}/> */}
                    </Dialog> : null
            }
            <div className={classes.upperChild}>
                <Heading text='Pending Leaves' />
            </div>
            <div className={classes.lowerChild}>
                <TableContainer component={Paper}>
                    <Grid container justify="flex-end">
                    </Grid>
                    {
                        isLoaded === false ? (<Loader />) : (
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Employee Name</StyledTableCell>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell align="center">Start Date</StyledTableCell>
                                        <StyledTableCell align="center">End Date</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {leaves.length > 0 ?
                                    (<TableBody>
                                        {
                                            leaves.map((employee) => (
                                                employee.leaves.map((leave) => (
                                                    <StyledTableRow key={employee._id}>
                                                        <StyledTableCell>{employee.name}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">{leave.description}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.startDate}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.endDate}</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                className={classes.button}
                                                                startIcon={<CheckCircleIcon />}
                                                                onClick={() => handleClickAccept(leave._id)}>
                                                                    Accept
                                                            </Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                            ))
                                        }
                                    </TableBody>) :
                                    (<h2>No Leaves Found</h2>)
                                }
                            </Table>
                        )
                    }
                </TableContainer>
            </div>
        </div >
    );
}
