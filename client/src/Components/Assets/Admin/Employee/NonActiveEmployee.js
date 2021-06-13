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

export default function NonActiveEmployee() {
    const classes = useStyles();

    const [employees, setEmployees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getNonActiveEmployee();
    }, []);

    const getNonActiveEmployee = () => {
        Axios.get('http://localhost:5000/admin/nonActiveEmployees', {
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
                <Heading text='Non Active Employees' />
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
                                        <StyledTableCell align="center">Employee Name</StyledTableCell>
                                        <StyledTableCell align="center">Designation</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Contact #</StyledTableCell>
                                        <StyledTableCell align="center">Joining Date</StyledTableCell>
                                        <StyledTableCell align="center">Leaving Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {employees.length > 0 ?
                                    (<TableBody>
                                        {
                                            employees.map((employee) => (
                                                <StyledTableRow key={employee._id}>
                                                    <StyledTableCell component="th" scope="row">{employee.employeeId}</StyledTableCell>
                                                    <StyledTableCell align="center">{employee.name}</StyledTableCell>
                                                    <StyledTableCell align="center">{employee.designation}</StyledTableCell>
                                                    <StyledTableCell align="center">{employee.email}</StyledTableCell>
                                                    <StyledTableCell align="center">0{employee.contactNumber}</StyledTableCell>
                                                    <StyledTableCell align="center">{employee.hireDate}</StyledTableCell>
                                                    <StyledTableCell align="center">{employee.leavingDate}</StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>) :
                                    (<h2>No Employee Found</h2>)
                                }
                            </Table>
                        )
                    }
                </TableContainer>
            </div>
        </div >
    );
}
