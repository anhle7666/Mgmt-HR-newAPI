const Shifts = require("../models/Shifts");

exports.getShifts = async () => {
    try {
        const listShifts = await Shifts.find();
        return listShifts;
    } catch (err) {
        throw err;
    }
};

exports.addNewShift = async (shift) => {
    try {
        console.log(shift);
        const newShift = new Shifts(shift);
        const result = await newShift.save();
        return result;
    } catch (err) {
        throw err;
    }
};
