const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    employeeId: { type: String },
    password: { type: String },
    name: { type: String },
    address: { type: String },
    contactNumber: { type: Number },
    age: { type: Number },
    dateOfBirth: { type: String },
    gender: { type: String },
    email: { type: String },
    designation: { type: String },
    hireDate: { type: Date, default: Date.now },
    leavingDate: { type: Date, default: null },
    status: { type: String, default: "Active" }
});

module.exports = mongoose.model('Employee', employeeSchema);