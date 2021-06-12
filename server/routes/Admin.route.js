const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/Admin.controller');

router.get('/employees', admin_controller.viewActiveEmployee);

router.get('/nonActiveEmployees', admin_controller.viewNonActiveEmployee);

router.post('/addEmployee', admin_controller.addEmployee);

router.post('/updateEmployee/:id', admin_controller.updateEmployee);

router.post('/deleteEmployee/:id', admin_controller.deleteEmployee);

router.get('/viewLeaveHistory', admin_controller.viewLeaveHistory);

router.get('/viewLeaveRequests', admin_controller.viewLeaveRequests);

//id should be employee.leave.id
router.post('/approveLeaveRequest/:id', admin_controller.approveLeaveRequest);

router.post('/addProject/:empOId', admin_controller.addProject);

router.get('/viewProjects', admin_controller.viewProjects);

router.get('/viewProjectHistory', admin_controller.viewProjectHistory);

module.exports = router;