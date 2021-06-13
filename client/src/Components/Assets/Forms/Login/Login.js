import React from 'react';
import Axios from 'axios';
import {
    withStyles,
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Avatar,
    Typography,
    Divider,
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 4,
    },
    padding: {
        padding: theme.spacing.unit
    },
    baseColor: {
        backgroundColor: '#003049',
    },
    color: {
        color: '#003049',
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            employeeId: '',
            password: '',
            isLogged: false,
            designation: '',
        }
    }

    componentDidMount(){
        localStorage.clear();
        this.setState({ 
            employeeId: '', 
            password: '' 
        });
    }

    onChangeEmployeeId(e) {
        this.setState({ employeeId: e.target.value })
        console.log(this.state.employeeId);
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const userObject = {
            employeeId: this.state.employeeId,
            password: this.state.password
        };

        console.log(userObject);

        Axios.post('http://localhost:5000/login', userObject)
            .then((res) => {
                console.log(res)
                localStorage.setItem('x-access-token', res.data.token);
                this.setState({
                    isLogged: true,
                    designation: res.data.designation
                });
                if(res.status === '404'){
                    alert("Wrong Credentials")
                }
            }).catch((error) => {
                console.log(error)
            });

    }

    render() {
        const { classes } = this.props;

        if (this.state.isLogged === true) {
            if (this.state.designation === 'Admin') {
                return <Redirect to='/admin' />
            } else {
                return <Redirect to='/employee' />
            }
        }

        return (
            <div className={classes.margin} style={{ width: '60%' }}>
                <Grid container justify="center">
                    <Typography variant="h4" className={classes.color} gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Divider />
                <Grid container justify="center" style={{ marginTop: '20px' }}>
                    <Avatar className={classes.large} />
                </Grid>
                <Grid container spacing={3} alignItems="flex-end" style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="employeeId" label="Employee Id" type="text" fullWidth autoFocus required onChange={this.onChangeEmployeeId} />
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" label="Password" type="password" fullWidth required onChange={this.onChangePassword} />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between" style={{ marginTop: '20px' }}>
                    <Grid item md={true} sm={true} xs={true}>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="secondary" size="large" style={{ textTransform: "none" }} onClick={this.onSubmit}>Login</Button>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Login);