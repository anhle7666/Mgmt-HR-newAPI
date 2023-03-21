const Employee = require("../models/Employees");

exports.getList = async () => {
    try {
        const employees = await Employee.find();
        return employees;
    } catch (err) {
        throw err;
    }
};

exports.addNewEmployee = async (EmployeeData) => {
    try {
        const employee = new Employee(EmployeeData);
        const addNewEmployee = await employee.save();
        return addNewEmployee;
    } catch (err) {
        console.error(`Error to adding employee ${err}`);
        throw err;
    }
};

exports.updateEmployee = async (filter, updateDoc) => {
    const result = await Employee.updateOne(filter, updateDoc);
    return result;
};
