import React, { Component } from 'react';
import './Employee.css';
import Drawer from '../../Assets/Drawer/EmployeeDrawer';
import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Employee/Project/ProjectTable';
import PendingProject from '../../Assets/Employee/Project/PendingProject';
import Leaves from '../../Assets/Employee/Leave/Leaves';
import Profile from '../../Assets/Employee/Profile/Profile';
import { 
    Switch, 
    Route, 
    Redirect 
} from 'react-router-dom';

class Employee extends Component {
    render() {
        return (
            <div className="Main-Div" >
                <div className="Div Left">
                    <Drawer />
                </div>
                <div className="Div Right">
                    <div className="Nav-Div">
                        <NavBar message="Employee"/>
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
                                <Route exact path='/employee/dashboard'>
                                    <Profile />
                                </Route>
                                <Route exact path='/employee/'>
                                    <Redirect to='/employee/dashboard'/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;