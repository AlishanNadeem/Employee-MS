const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    empOId: { type: Schema.Types.ObjectId },
    projectName: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    description: { type: String },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Project', projectSchema);