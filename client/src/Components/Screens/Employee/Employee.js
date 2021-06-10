import React, { Component } from 'react';
import './Employee.css';
// import Drawer from '../../Assets/Drawer/Drawer';
import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Tables/Employee/ProjectTable';
import PendingProject from '../../Assets/Tables/Employee/PendingProject';
import Leaves from '../../Assets/Tables/Employee/Leaves';
import LeaveForm from '../../Assets/Tables/Employee/LeaveForm';
import Profile from '../../Assets/Profile';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

class Employee extends Component {
    render() {
        return (
            <div className="Main-Div" >
                <div className="Div Left">
                    {/* <Drawer /> */}
                </div>
                <div className="Div Right">
                    <div className="Nav-Div">
                        <NavBar />
                    </div>
                    <div className="Component-Div">
                        <div className="Content-Div">
                            <Switch>
                                <Route exact path='/employee/leaves'>
                                    <Leaves />
                                </Route>
                                <Route exact path='/employee/projects'>
                                    <ProjectTable />
                                </Route>
                                <Route exact path='/employee/pendingProjects'>
                                    <PendingProject />
                                </Route>
                                <Route exact path='/employee/profile'>
                                    <Profile />
                                </Route>
                            </Switch>

                            {/* <Route path='/employee' Component={Profile} /> */}

                            {/* <ProjectTable /> */}
                            {/* <PendingProject /> */}
                            {/* <Leaves /> */}
                            {/* <Profile /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;