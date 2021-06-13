import React, { Component } from 'react';
import '../Employee/Employee.css';
import Drawer from '../../Assets/Drawer/Drawer';
import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Tables/Employee/ProjectTable';
import PendingProject from '../../Assets/Tables/Employee/PendingProject';
import Leaves from '../../Assets/Tables/Employee/Leaves';
import Profile from '../../Assets/Profile';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ViewLeaves from '../../Assets/Admin/Leave/ViewLeave';
import LeaveHistory from '../../Assets/Admin/Leave/LeaveHistory';
import ProjectHistory from '../../Assets/Admin/Project/ProjectHistory';

class Employee extends Component {
    render() {
        return (
            <div className="Main-Div" >
                <div className="Div Left">
                    <Drawer />
                </div>
                <div className="Div Right">
                    <div className="Nav-Div">
                        <NavBar message="Admin" />
                    </div>
                    <div className="Component-Div">
                        <div className="Content-Div">
                            {/* <Switch>
                                <Route exact path='/employee/leaves'>
                                    <Leaves />
                                </Route>
                                <Route exact path='/employee/projects'>
                                    <ProjectTable />
                                </Route>
                                <Route exact path='/employee/pendingProjects'>
                                    <PendingProject />
                                </Route>
                                <Route exact path='/employee/dashboard'>
                                    <Profile />
                                </Route>
                                <Route exact path='/employee/'>
                                    <Redirect to='/employee/dashboard'/>
                                </Route>
                            </Switch> */}
                            {/* <LeaveHistory/> */}
                            <ProjectHistory/>
                            {/* <ViewLeaves/> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;