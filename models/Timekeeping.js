const mongoose = require("mongoose");

const timekeeping = new mongoose.Schema({
    IDEmployee: String,
    time: Date,
});

const Timekeeping = mongoose.model("Timekeeping", timekeeping);

module.exports = Timekeeping;
