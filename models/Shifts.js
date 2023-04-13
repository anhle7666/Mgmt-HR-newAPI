const mongoose = require("mongoose");

const shiftsSchema = new mongoose.Schema({
    IDShifts: String,
    startTime: String,
    endTime: String,
    dept: String,
});
const Shifts = mongoose.model("Shifts", shiftsSchema);

module.exports = Shifts;
