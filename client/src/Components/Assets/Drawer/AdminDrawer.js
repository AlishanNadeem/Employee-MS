import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { useRouteMatch, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: '100%',
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
    toolbar: {
        justifyContent: 'center',
    }
}));

export default function AdminDrawer() {
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
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h3" style={{marginTop: '40px'}}>
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
                                <NavLink to={`${url}/employeesDetail`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red",
                                    backgroundColor: "white",
                                }}>
                                    <Typography variant="h6">
                                        Employee Details
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/nonActiveEmployees`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Non Active Employees
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/addProject`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Assign Project
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <MailIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/viewPendingProject`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Pending Projects
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/projectHistory`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Project History
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/leaveRequest`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Leave Requests
                                    </Typography>
                                </NavLink>
                            </ListItemText>
                        </ ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon /> </ListItemIcon>
                            <ListItemText>
                                <NavLink to={`${url}/leaveHistory`} style={{ color: 'white', textDecoration: 'none' }} activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}>
                                    <Typography variant="h6">
                                        Leave History
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