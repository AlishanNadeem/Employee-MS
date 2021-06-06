import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
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
}));

export default function CustomizedTables() {
    const classes = useStyles();
    const [leaves, setLeaves] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getLeaves();
    }, []);

    const getLeaves = () => {
        Axios.get('http://localhost:5000/employee/viewLeaves', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                const getLeaves = res.data;
                setLeaves(getLeaves);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={classes.parentDiv}>
            <div className={classes.upperChild}>
                <Heading text='LEAVES' />
            </div>
            <div className={classes.lowerChild}>
                <TableContainer component={Paper}>
                    {
                        isLoaded === false ? (<Loader />) : (
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Leave Description</StyledTableCell>
                                        <StyledTableCell align="center">Start Date</StyledTableCell>
                                        <StyledTableCell align="center">End Date</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {leaves.length > 0 ?
                                    (<TableBody>
                                        {leaves.map((leave) => (
                                            <StyledTableRow key={leave.description}>
                                                <StyledTableCell component="th" scope="row">
                                                    {leave.description}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{leave.startDate}</StyledTableCell>
                                                <StyledTableCell align="center">{leave.endDate}</StyledTableCell>
                                                {
                                                    leave.status === 'Pending' ?
                                                        (<StyledTableCell align="center" className={classes.statusColorYellow}>{leave.status}</StyledTableCell>)
                                                        :
                                                        [
                                                            leave.status === 'Approved' ?
                                                                (<StyledTableCell align="center" className={classes.statusColorGreen}>{leave.status}</StyledTableCell>)
                                                                :
                                                                [
                                                                    <StyledTableCell align="center" className={classes.statusColorRed}>{leave.status}</StyledTableCell>
                                                                ]
                                                        ]
                                                }
                                                <StyledTableCell align="center">
                                                    {
                                                        leave.status === 'Pending' ?
                                                            (
                                                                <React.Fragment>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        size="small"
                                                                        className={classes.button}
                                                                        startIcon={<CloudUploadIcon />}>
                                                                        Update
                                                                </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        size="small"
                                                                        className={classes.button}
                                                                        startIcon={<DeleteIcon />}>
                                                                        Delete
                                                            </Button>
                                                                </React.Fragment>
                                                            )
                                                            :
                                                            (
                                                                <React.Fragment>
                                                                    <Button
                                                                        disabled
                                                                        size="small"
                                                                        className={classes.button}
                                                                        startIcon={<CloudUploadIcon />}>
                                                                        Update
                                                                </Button>
                                                                    <Button
                                                                        disabled
                                                                        size="small"
                                                                        className={classes.button}
                                                                        startIcon={<DeleteIcon />}>
                                                                        Delete
                                                            </Button>
                                                                </React.Fragment>
                                                            )
                                                    }
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>) :
                                    (<h2>No Leaves Found</h2>)
                                }
                            </Table>
                        )
                    }
                </TableContainer>
            </div>
        </div>
    );
}
