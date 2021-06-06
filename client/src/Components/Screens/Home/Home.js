import React, { Component } from 'react';
import './Home.css';
import Login from '../../Assets/Forms/Login/Login'

class Home extends Component {
    render() {
        return (
            <div className="Main-Div">
                <div className="Left-Div">
                    <div className="LeftBody-Div">
                        <h1>Welcome to, Employee Management System</h1>
                    </div>
                </div>
                <div className="Right-Div">
                    <div className="First-Div"></div>
                    <div className="Second-Div">
                        <div className="Form-Div">
                            <Login />
                        </div>
                    </div>
                    <div className="Third-Div"></div>
                </div>
            </div>
        );
    }
}

export default Home;