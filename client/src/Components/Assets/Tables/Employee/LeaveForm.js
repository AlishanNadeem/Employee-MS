// import React from 'react';
// import Axios from 'axios';
// import {
//   withStyles,
//   Grid,
//   TextField,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   Avatar,
//   Typography,
//   Divider,
// } from '@material-ui/core';
// import { KeyboardDatePicker } from '@material-ui/pickers';
// import { Face, Fingerprint } from '@material-ui/icons';
// import { Redirect } from 'react-router-dom';

// const styles = theme => ({
//   margin: {
//     margin: theme.spacing.unit,
//   },
//   padding: {
//     padding: theme.spacing.unit
//   },
//   baseColor: {
//     backgroundColor: '#003049',
//   },
//   color: {
//     color: '#003049',
//   },
// });

// class LeaveForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.handleDateChange = this.handleDateChange.bind(this);

//     this.state = {
//       employeeId: '',
//       password: '',
//       isLogged: false,
//       selectedDate: new Date('2014-08-18T21:11:54')
//     }
//   }

//   handleDateChange(e){
//     this.setState({selectedDate: e.taget.value})
//   };

//   onChangeEmployeeId(e) {
//     this.setState({ employeeId: e.target.value })
//   }

//   onChangePassword(e) {
//     this.setState({ password: e.target.value })
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const userObject = {
//       employeeId: this.state.employeeId,
//       password: this.state.password
//     };

//     console.log(userObject);

//     Axios.post('http://localhost:5000/employee/login', userObject)
//       .then((res) => {
//         console.log(res)
//         localStorage.setItem('x-access-token', res.data.token);
//         this.setState({
//           isLogged: true
//         });
//       }).catch((error) => {
//         console.log(error)
//       });


//     this.setState({ employeeId: '', password: '' })
//   }

//   render() {
//     const { classes } = this.props;

//     if (this.state.isLogged === true) {
//       return <Redirect to="/employee" />
//     }

//     return (
//       <div className={classes.margin} style={{ width: '60%' }}>
//         <Grid container justify="center">
//           <Typography variant="h4" className={classes.color} gutterBottom>
//             Update Leave
//                     </Typography>
//         </Grid>
//         <Divider />
//         <Grid container spacing={3} alignItems="flex-end" style={{ marginTop: '20px' }}>
//           <Grid item md={true} sm={true} xs={true}>
//             <KeyboardDatePicker
//               disableToolbar
//               variant="inline"
//               format="MM/dd/yyyy"
//               margin="normal"
//               id="date-picker-inline"
//               label="Date picker inline"
//               value={this.state.selectedDate}
//               onChange={this.state.handleDateChange}
//               KeyboardButtonProps={{
//                 'aria-label': 'change date',
//               }}
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={3} alignItems="flex-end">
//           <Grid item>
//             <Fingerprint />
//           </Grid>
//           <Grid item md={true} sm={true} xs={true}>
//             <TextField id="password" label="Password" type="password" fullWidth required onChange={this.onChangePassword} />
//           </Grid>
//         </Grid>
//         <Grid container alignItems="center" justify="space-between" style={{ marginTop: '20px' }}>
//           <Grid item md={true} sm={true} xs={true}>
//             <FormControlLabel control={
//               <Checkbox
//                 color="primary"
//               />
//             } label="Remember me" />
//           </Grid>
//         </Grid>
//         <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
//           <Button variant="contained" color="secondary" size="large" style={{ textTransform: "none" }} onClick={this.onSubmit}>Login</Button>
//         </Grid>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(LeaveForm);