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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Loader from '../../Loader';
import Heading from '../../Heading';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#003049',
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14,
        backgroundColor: theme.palette.common.white,
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
}));

export default function Leaves() {
    const classes = useStyles();

    const [employees, setEmployees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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
                const getEmployees = res.data;
                setEmployees(getEmployees);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const acceptLeave = (id, status) => {
        Axios.post(`http://localhost:5000/admin/approveLeaveRequest/${id}`, {
            status: status
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

    const handleClickAccept = (e) => {
        acceptLeave(e, "Approved");
    };

    const handleClickDeclined = (e) => {
        acceptLeave(e, "Declined");
    };

    return (
        <div className={classes.parentDiv}>
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
                                {employees.length > 0 ?
                                    (<TableBody>
                                        {
                                            employees.map((employee) => (
                                                employee.leaves.map((leave) => (
                                                    <StyledTableRow key={employee._id}>
                                                        <StyledTableCell>{employee.name}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">{leave.description}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.startDate}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.endDate}</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <React.Fragment>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={classes.button}
                                                                    startIcon={<CheckCircleIcon />}
                                                                    onClick={() => handleClickAccept(leave._id)}>
                                                                    Accept
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    size="small"
                                                                    className={classes.button}
                                                                    startIcon={<CancelIcon />}
                                                                    onClick={() => handleClickDeclined(leave._id)}>
                                                                    Declined
                                                                </Button>
                                                            </React.Fragment>
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
