import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loader from '../../Loader';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import Heading from '../../Heading';

const useStyles = makeStyles({
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
    root: {
        margin: '20px',
        width: 345,
        height: 220,
        maxWidth: 345,
    },
    cardAction: {
        justifyContent: 'flex-end',
    },
});

export default function MediaCard() {
    const classes = useStyles();

    const [pendingProjects, setPendingProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSubmitted(false);
    };

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
                setPendingProjects(getPendingProjects);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClick = (id) => {
        Axios.post(`http://localhost:5000/employee/submitProject/${id}`, null, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                setIsSubmitted(true);
                getPendingProjects();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={classes.parentDiv}>
            <Snackbar  anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} 
                open={isSubmitted} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Project Submitted Successfully
                </Alert>
            </Snackbar>
            <div className={classes.upperChild}>
                <Heading text='Pending Projects' />
            </div>
            <div className={classes.lowerChild}>
                {
                    isLoaded === false ? (<Loader />) :
                        (
                            pendingProjects.length > 0 ?
                                (
                                    pendingProjects.map((projects) => (
                                        <Card className={classes.root} key={projects.description}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {projects.description}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body1" component="p">
                                                        {projects.description}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body1" component="p">
                                                        {projects.startDate}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" component="p">
                                                        Status : {projects.status}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className={classes.cardAction}>
                                                <Button size="small" variant="outlined" color="secondary" onClick={() => { handleClick(projects._id) }}>
                                                    Submit
                                    </Button>
                                            </CardActions>
                                        </Card>
                                    ))
                                ) : (<Heading text="No Pending Project in Queue" />)
                        )
                }
            </div>
        </div>
    );
}
