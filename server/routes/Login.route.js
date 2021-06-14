const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/Login.controller');

router.post('/login', login_controller.employeeLogin);

module.exports = router;