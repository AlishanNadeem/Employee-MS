import React, { Component } from 'react';
import './Employee.css';
import Drawer from '../../Assets/Drawer/Drawer';
import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Tables/EmployeeProjectTable'

class Employee extends Component {
    render() {
        return (
            <div className="Main-Div" >
                <div className="Div Left">
                    {/* <Drawer /> */}
                </div>
                <div className="Div Right">
                    <div className="Nav-Div">
                        {/* <NavBar /> */}
                    </div>
                    <div className="Component-Div">
                        <div className="Breadcrumbs-Div">
                            <h2>Pending Projects Temp</h2>
                        </div>
                        <div className="Content-Div">
                            <ProjectTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;