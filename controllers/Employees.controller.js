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
        if (employee.firstName && employee.lastName) {
            if (employee.position === "Dreamie") employee.salary = 20000;
            const addNewEmployee = await employee.save();
            return addNewEmployee;
        }
    } catch (err) {
        console.error(`Error to adding employee ${err}`);
        throw err;
    }
};

exports.getAnEmployee = async (id) => {
    try {
        const employee = await Employee.findById(id); // find employee by id
        return employee; // return employee object
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get employee");
    }
};
exports.updateEmployee = async (filter, updateDoc) => {
    const result = await Employee.updateOne(filter, updateDoc);
    return result;
};

exports.traingingEmployee = async (id, course) => {
    const employee = await Employee.findById(id);
    employee.training.push(course);
    await Employee.updateOne({ _id: id }, employee);
    return employee;
};
