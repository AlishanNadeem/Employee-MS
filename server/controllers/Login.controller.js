const Employee = require('../models/Employee.model');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.employeeLogin = ((req, res, next) => {
    Employee.findOne({ employeeId: req.body.employeeId }, (err, employee) => {
        if (err) return next(err);
        if (!employee) return res.status(404).send("Employee not found");

        var passwordValidity = bcrypt.compareSync(req.body.password, employee.password);

        if (!passwordValidity) return res.status(401).send({ auth: false, token: null })

        var token = jwt.sign({ id: employee._id }, config.secret, {
            expiresIn: 7200 // expires in 2 hours
        });

        res.status(200).send({ auth: true, token: token, designation: employee.designation });

    });
});

exports.employeeLogout = ((req, res, next) => {
    //add logout code here
});