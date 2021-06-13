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
    }
}));

export default function LeaveHistory() {
    const classes = useStyles();

    const [employees, setEmployees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getLeaveHistory();
    }, []);

    const getLeaveHistory = () => {
        Axios.get('http://localhost:5000/admin/viewLeaveHistory', {
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

    return (
        <div className={classes.parentDiv}>
            <div className={classes.upperChild}>
                <Heading text='Leave History' />
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
                                        <StyledTableCell>Employee ID</StyledTableCell>
                                        <StyledTableCell>Employee Name</StyledTableCell>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell align="center">Start Date</StyledTableCell>
                                        <StyledTableCell align="center">End Date</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {employees.length > 0 ?
                                    (<TableBody>
                                        {
                                            employees.map((employee) => (
                                                employee.leaves.map((leave) => (
                                                    <StyledTableRow key={employee._id}>
                                                        <StyledTableCell>{employee.employeeId}</StyledTableCell>
                                                        <StyledTableCell>{employee.name}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">{leave.description}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.startDate}</StyledTableCell>
                                                        <StyledTableCell align="center">{leave.endDate}</StyledTableCell>
                                                        {
                                                            leave.status === 'Approved' ?
                                                                (<StyledTableCell align="center" className={classes.statusColorGreen}>{leave.status}</StyledTableCell>)
                                                                :
                                                                (<StyledTableCell align="center" className={classes.statusColorRed}>{leave.status}</StyledTableCell>)
                                                        }
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
