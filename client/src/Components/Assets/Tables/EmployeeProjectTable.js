import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import Loader from '../Loader';

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
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    statusColor: {
        color: 'red'
    }
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [pendingProjects, setPendingProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getPendingProjects();
    }, []);

    const getPendingProjects = () => {
        Axios.get('http://localhost:5000/employee/viewProjects', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                const getPendingProjects = res.data;
                setIsLoaded(true);
                setPendingProjects(getPendingProjects);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Project Description</StyledTableCell>
                        <StyledTableCell align="center">Assigning Date</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                {
                    isLoaded === true ?
                        (
                            <Loader />
                        ) :
                        (
                            pendingProjects.length > 0 ?
                                (<TableBody>
                                    {pendingProjects.map((row) => (
                                        <StyledTableRow key={row.description}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.description}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.startDate}</StyledTableCell>
                                            <StyledTableCell align="center" className={classes.statusColor}>{row.status}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>) :
                                (<h2>No Projects Found</h2>)
                        )
                }
            </Table>
        </TableContainer>
    );
}
