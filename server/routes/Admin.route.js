const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/Admin.controller');

router.get('/employees', admin_controller.viewActiveEmployee);

router.get('/employees/:id', admin_controller.viewEmployee); //done in frontend admin

router.get('/nonActiveEmployees', admin_controller.viewNonActiveEmployee);

router.post('/addEmployee', admin_controller.addEmployee);

router.post('/updateEmployee/:id', admin_controller.updateEmployee);

router.post('/deleteEmployee/:id', admin_controller.deleteEmployee);

router.get('/viewLeaveHistory', admin_controller.viewLeaveHistory); //done in frontend admin

router.get('/viewLeaveRequests', admin_controller.viewLeaveRequests); //done in frontend admin    

//id should be employee.leave.id
router.post('/approveLeaveRequest/:id', admin_controller.approveLeaveRequest); //done in frontend admin

router.post('/addProject/:empOId', admin_controller.addProject); //done in frontend admin

router.get('/viewProjects', admin_controller.viewProjects); //done in frontend admin

router.get('/viewProjectHistory', admin_controller.viewProjectHistory); //done in frontend admin

module.exports = router;