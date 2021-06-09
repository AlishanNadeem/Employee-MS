const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let leaveSchema = new Schema({
    empOId: { type: Schema.Types.ObjectId },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Leave', leaveSchema);