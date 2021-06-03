const Employee = require('../models/Employee.model');
const Leave = require('../models/Leave.model');
const Project = require('../models/Project.model');
const config = require('../config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.viewProfile = ((req, res, next) => {

    Employee.findById({ _id: req.decoded.id },
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });
});

exports.viewLeaves = ((req, res, next) => {

    Leave.aggregate([
        {
            $match: {
                'empOId': mongoose.Types.ObjectId(req.decoded.id)
            }
        },
        {
            $sort: {
                '_id': -1
            }
        }
    ],
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });
});

exports.addLeaveRequest = ((req, res, next) => {

    let leave = new Leave({
        empOId: req.decoded.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
    });

    leave.save((err) => {
        if (err) return next(err);
    });

    res.send("Leave Request Added");
});

exports.updateLeaveRequest = ((req, res, next) => {
    Leave.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
        if (err) return next(err);

        res.send("Leave Updated");
    });
});

exports.deleteLeaveRequest = ((req, res, next) => {
    Leave.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);

        res.send("Leave Deleted");
    });
});

exports.viewProjectHistory = ((req, res, next) => {
    Project.find({
        'empOId': mongoose.Types.ObjectId(req.decoded.id)
    }, (err, data) => {
        if (err) return next(err);

        res.send(data);
    });
});

exports.viewProjects = ((req, res, next) => {

    Project.find({
        'empOId': mongoose.Types.ObjectId(req.decoded.id),
        'status': "Pending"
    }, (err, data) => {
        if (err) return next(err);
        res.send(data);
    });
});

exports.submitProject = ((req, res, next) => {
    Project.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                status: "Completed",
                endDate: Date.now()
            }
        }, (err) => {
            if (err) return next(err);

            res.send("Project Updated");
        });
});

exports.employeeLogin = ((req, res, next) => {
    Employee.findOne({ employeeId: req.body.employeeId }, (err, employee) => {
        if (err) return next(err);
        if (!employee) return res.status(404).send("Employee not found");

        var passwordValidity = bcrypt.compareSync(req.body.password, employee.password);

        if (!passwordValidity) return res.status(401).send({ auth: false, token: null })

        var token = jwt.sign({ id: employee._id }, config.secret, {
            expiresIn: 3600 // expires in 1 hours
        });

        res.status(200).send({ auth: true, token: token });

    });
});

exports.employeeLogout = ((req, res, next) => {
    //add logout code here
});