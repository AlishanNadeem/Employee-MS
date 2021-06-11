import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Route, Link, useRouteMatch, NavLink } from 'react-router-dom';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        position: 'relative',
        color: 'white',
        backgroundColor: '#003049',
    },
    drawerContainer: {
        overflow: 'auto',
        marginTop: '50%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer() {
    const classes = useStyles();

    const { url } = useRouteMatch();
    console.log(url);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <Toolbar>
                    <Typography variant="h3">
                        EMS
                    </Typography>
                </Toolbar>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button >
                            <ListItemIcon> <MailIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/dashboard`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Dashboard
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/leaves`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Leaves
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <MailIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/projects`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Projects
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/pendingProjects`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Pending Projects
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}