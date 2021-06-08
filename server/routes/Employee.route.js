const express = require('express');
const router = express.Router();

const employee_controller = require('../controllers/Employee.controller');
const { loginValidation } = require("../middleware/loginValidate");

router.get('/viewProfile', loginValidation, employee_controller.viewProfile); //we have to pass the id of current session.

router.get('/viewLeaves', loginValidation, employee_controller.viewLeaves);

router.get('/viewLeaveRequest/:id', loginValidation, employee_controller.viewLeaveRequest);

router.post('/addLeaveRequest', loginValidation, employee_controller.addLeaveRequest);

router.post('/updateLeaveRequest/:id',loginValidation, employee_controller.updateLeaveRequest);

router.post('/deleteLeaveRequest/:id',loginValidation, employee_controller.deleteLeaveRequest);

router.get('/viewProjectHistory', loginValidation, employee_controller.viewProjectHistory);

router.get('/viewProjects', loginValidation, employee_controller.viewProjects);

router.post('/submitProject/:id',loginValidation, employee_controller.submitProject);

router.post('/login', employee_controller.employeeLogin);

router.post('/logout', employee_controller.employeeLogout);

module.exports = router;