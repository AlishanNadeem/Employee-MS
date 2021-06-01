const Employee = require('../models/Employee.model');
const Leave = require('../models/Leave.model');
const Project = require('../models/Project.model');
const bcrypt = require('bcryptjs');
const generateUniqueId = require('generate-unique-id');

exports.viewActiveEmployee = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Active"
            }
        }
    ], (err, employee) => {
        if (err) return next(err);

        res.send(employee);
    });
});

exports.viewNonActiveEmployee = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Non-Active"
            }
        }
    ], (err, employee) => {
        if (err) return next(err);

        res.send(employee);
    });
});

exports.addEmployee = ((req, res, next) => {

    const employeeId = generateUniqueId({
        length: 5,
        useLetters: false
    });

    let employee = new Employee({
        employeeId: employeeId,
        password: bcrypt.hashSync(employeeId, 8),
        name: req.body.name,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        email: req.body.email,
        designation: req.body.designation,
    });

    employee.save((err) => {
        if (err) return next(err);

        res.send("Employee created successfully");
    });
});


exports.updateEmployee = ((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
        if (err) return next(err);

        res.send("Employee Updated");
    });
});

exports.deleteEmployee = ((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id,
        {
            $set: {
                status: "Non-Active",
                leavingDate: Date.now()
            }

        }, (err) => {
            if (err) return next(err);

            res.send("Employee Deleted");
        });
});

exports.viewLeaveHistory = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Active"
            }
        },
        {
            $lookup: {
                from: 'leaves',
                localField: '_id',
                foreignField: 'empOId',
                as: 'leaves'
            }
        }
    ],
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });
});

exports.viewLeaveRequests = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Active"
            }
        },
        {
            $lookup: {
                from: 'leaves',
                localField: '_id',
                foreignField: 'empOId',
                as: 'leaves'
            }
        },
        {
            $addFields: {
                leaves:
                {
                    $filter:
                    {
                        input: "$leaves",
                        as: "leave",
                        cond: { $eq: ["$$leave.status", "Pending"] }
                    }
                }
            }
        }
    ],
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });
});

exports.approveLeaveRequest = ((req, res, next) => {

    //id should be employee.leave.id
    Leave.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                status: req.body.status
            }
        }, (err) => {
            if (err) return next(err);

            res.send("Leave Updated");
        });
});

exports.addProject = ((req, res, next) => {

    let project = new Project({
        empOId: req.params.empOId,
        description: req.body.description,
    });

    project.save((err) => {
        if (err) return next(err);

        res.send("Project created successfully");
    });
});

exports.viewProjects = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Active"
            }
        },
        {
            $lookup: {
                from: 'projects',
                localField: '_id',
                foreignField: 'empOId',
                as: 'projects'
            }
        },
        {
            $addFields: {
                projects:
                {
                    $filter:
                    {
                        input: "$projects",
                        as: "project",
                        cond: { $eq: ["$$project.status", "Pending"] }
                    }
                }
            }
        }
    ],
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });


});

exports.viewProjectHistory = ((req, res, next) => {

    Employee.aggregate([
        {
            $match: {
                status: "Active"
            }
        },
        {
            $lookup: {
                from: 'projects',
                localField: '_id',
                foreignField: 'empOId',
                as: 'projects'
            }
        }
    ],
        (err, data) => {
            if (err) return next(err);

            res.send(data);
        });
});