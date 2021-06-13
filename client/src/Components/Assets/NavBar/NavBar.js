import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, Link, useRouteMatch, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#003049',
    color: 'white',
    height: '100%',
    justifyContent: 'center'
  }
}));

export default function NavBar(props) {

  const classes = useStyles();
  const { url } = useRouteMatch();
  const history = useHistory();

  function Logout(){
    localStorage.clear()
    history.push('/')
  }
  

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <b>{props.message}</b> Dashboard
          </Typography>
          <Button onClick={Logout} color="secondary">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
