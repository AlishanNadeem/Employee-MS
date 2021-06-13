import React, { Component } from 'react';
import '../Employee/Employee.css';
import AdminDrawer from '../../Assets/Drawer/AdminDrawer';
import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Tables/Employee/ProjectTable';
import PendingProject from '../../Assets/Tables/Employee/PendingProject';
import Leaves from '../../Assets/Tables/Employee/Leaves';
import Profile from '../../Assets/Profile';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ViewLeaves from '../../Assets/Admin/Leave/ViewLeave';
import LeaveHistory from '../../Assets/Admin/Leave/LeaveHistory';
import ProjectHistory from '../../Assets/Admin/Project/ProjectHistory';
import ViewPendingProjects from '../../Assets/Admin/Project/ViewPendingProjects';
import AddProject from '../../Assets/Admin/Project/AddProject';
import NonActiveEmployee from '../../Assets/Admin/Employee/NonActiveEmployee';
import ActiveEmployee from '../../Assets/Admin/Employee/ActiveEmployee';

class Employee extends Component {
    render() {
        return (
            <div className="Main-Div" >
                <div className="Div Left">
                    <AdminDrawer />
                </div>
                <div className="Div Right">
                    <div className="Nav-Div">
                        <NavBar message="Admin" />
                    </div>
                    <div className="Component-Div">
                        <div className="Content-Div">
                            <Switch>
                                <Route exact path='/admin/leaveHistory'>
                                    <LeaveHistory />
                                </Route>
                                <Route exact path='/admin/employeesDetail'>
                                    <ActiveEmployee />
                                </Route>
                                <Route exact path='/admin/leaveRequest'>
                                    <ViewLeaves />
                                </Route>
                                <Route exact path='/admin/nonActiveEmployees'>
                                    <NonActiveEmployee />
                                </Route>
                                <Route exact path='/admin/addProject'>
                                     <AddProject/>
                                </Route>
                                <Route exact path='/admin/projectHistory'>
                                      <ProjectHistory/>
                                </Route>
                                <Route exact path='/admin/viewPendingProject'>
                                    <ViewPendingProjects/>
                                </Route>
                                <Route exact path='/admin/dashboard'>
                                    <Profile />
                                </Route>
                                <Route exact path='/admin/'>
                                    <Redirect to='/admin/dashboard' />
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