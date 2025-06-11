const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/Admin.controller');
const { loginValidation } = require("../middleware/loginValidate");

router.get('/viewProfile', loginValidation, admin_controller.viewProfile);

router.get('/employees', loginValidation, admin_controller.viewActiveEmployee);

router.get('/employees/:id', loginValidation, admin_controller.viewEmployee);

router.get('/nonActiveEmployees', loginValidation, admin_controller.viewNonActiveEmployee);

router.post('/addEmployee', admin_controller.addEmployee);

router.post('/updateEmployee/:id', loginValidation, admin_controller.updateEmployee);

router.post('/deleteEmployee/:id', loginValidation, admin_controller.deleteEmployee);

router.get('/viewLeaveHistory', loginValidation, admin_controller.viewLeaveHistory);

router.get('/viewLeaveRequests', loginValidation, admin_controller.viewLeaveRequests);    

//id should be employee.leave.id
router.post('/approveLeaveRequest/:id', loginValidation, admin_controller.approveLeaveRequest);

router.post('/addProject/:empOId', loginValidation, admin_controller.addProject);

router.get('/viewProjects', loginValidation, admin_controller.viewProjects);

router.get('/viewProjectHistory', loginValidation, admin_controller.viewProjectHistory);

module.exports = router;