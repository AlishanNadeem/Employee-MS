import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(3),
        },
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center'
    },
}));

export default function Heading(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {props.text}
            </Typography>
        </div>
    );
}
