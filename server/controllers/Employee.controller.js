const Employee = require('../models/Employee.model');
const Leave = require('../models/Leave.model');
const Project = require('../models/Project.model');
const mongoose = require('mongoose');

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

exports.viewLeaveRequest = ((req, res, next) => {
    Leave.findById(req.params.id, (err, leave) => {
        if (err) return next(err);

        res.send(leave);
    });
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
        'empOId': mongoose.Types.ObjectId(req.decoded.id),
        'status': 'Completed'
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