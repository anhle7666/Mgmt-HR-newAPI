const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    IDEmployee: String,
    events: [],
});
const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
