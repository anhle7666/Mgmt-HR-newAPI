const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 1 },
});

const employeeSchema = new mongoose.Schema({
    IDEmployee: String,
    accountNumber: String,
    bank: String,
    city: String,
    country: String,
    districts: String,
    emailAddress: String,
    firstName: String,
    gender: String,
    graduationYear: String,
    lastName: String,
    birthday: String,
    startDate: String,
    literacy: String,
    cmnd: String,
    position: String,
    streetAddress: String,
    tax: String,
    university: String,
    ward: String,
    training: [],
});

//Tạo dữ liệu ID nhân viên tự tăng
employeeSchema.pre("save", async function (next) {
    const doc = this;
    const counter = await Counter.findByIdAndUpdate(
        { _id: "IDEmployee" },
        { $inc: { count: 1 } },
        { new: true, upsert: true },
    );

    doc.IDEmployee = `PT${counter.count.toString().padStart(5, "0")}`;
    next();
});

const Employee = mongoose.model("Employees", employeeSchema);
const Counter = mongoose.model("Counter", counterSchema);

module.exports = Employee;
