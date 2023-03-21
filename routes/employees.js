const express = require("express");
const { ObjectId } = require("mongodb");
const appRouter = express.Router();
const employeesControllers = require("../controllers/Employees.controller.js");

appRouter.get("/", (req, res, next) => {
    res.json("home");
});

appRouter.get("/api/employees/list", async (req, res, next) => {
    const result = await employeesControllers.getList();
    res.json(result);
});

appRouter.post("/api/employees/add-new", async (req, res, next) => {
    try {
        const employee = req.body;
        const result = await employeesControllers.addNewEmployee(employee);
        res.json(`Post Success ${result}`);
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
});

appRouter.put("/api/employees/update/:id", async (req, res, next) => {
    try {
        const employeeId = new ObjectId(req.params.id);
        const filter = { _id: employeeId };
        const updates = {
            $set: req.body,
        };
        const result = await employeesControllers.updateEmployee(filter, updates);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

appRouter.post("/api/employees/training:id", async (req, res, next) => {
    try {

        
    } catch (err) {
        next(err, "Updated Failed");
    }
});

module.exports = appRouter;
