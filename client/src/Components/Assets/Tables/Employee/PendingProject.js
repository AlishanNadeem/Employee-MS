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
import SnackBar from '../../Snackbar';

const useStyles = makeStyles({
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
    const [isClicked, setIsClicked] = useState(false);

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

    const handleClick = (id) => {
        Axios.post(`http://localhost:5000/employee/submitProject/${id}`, null, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log(res.data);
                setIsClicked(true);
                getPendingProjects();            
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
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
                                {
                                    isClicked === true ? (<SnackBar message="Submitted" />) : null
                                }
                            </Card>
                        ))
                    ) :
                    (
                        <h2>No Pending Projects in Queue</h2>
                    )
            )
    );
}
