import React, { Component } from 'react';
import './Employee.css';
// import Drawer from '../../Assets/Drawer/Drawer';
// import NavBar from '../../Assets/NavBar/NavBar';
import ProjectTable from '../../Assets/Tables/Employee/ProjectTable';
import PendingProject from '../../Assets/Tables/Employee/PendingProject';
import Leaves from '../../Assets/Tables/Employee/Leaves';

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
                        <div className="Content-Div">
                            <ProjectTable />
                            {/* <PendingProject /> */}
                            {/* <Leaves /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;