const express = require("express");
const { ObjectId } = require("mongodb");
const appRouter = express.Router();
const ApiError = require("../API-Error");
const employeesControllers = require("../controllers/Employees.controller.js");
const accountsControllers = require("../controllers/Accounts.controller.js");
const shiftsControllers = require("../controllers/Shifts.controller.js");
const scheduleControllers = require("../controllers/Schedule.controller.js");
const timekeepingControllers = require("../controllers/Timekeeping.controller.js");

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

appRouter.post("/api/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await accountsControllers.Login(username, password);
        return res.json(result);
    } catch (err) {
        throw err;
    }
});
appRouter.post("/api/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await accountsControllers.Register(username, password);
        return res.json(result);
    } catch (err) {
        throw err;
    }
});

appRouter.get("/api/employees/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await employeesControllers.getAnEmployee(id);
        res.json(employee);
    } catch (err) {
        throw err;
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

appRouter.post("/api/employees/training/:id", async (req, res, next) => {
    try {
        const id = new ObjectId(req.params.id);
        // Tạo đối tượng training
        const training = req.body;
        // Loại bỏ các thuộc tính không cần thiết
        delete training.IDEmployee;
        delete training.fullName;
        const result = await employeesControllers.traingingEmployee(id, training);
        res.json(result);
    } catch (err) {
        next(err, "Updated Failed");
    }
});

appRouter.get("/api/shift", async (req, res, next) => {
    try {
        const result = await shiftsControllers.getShifts();
        res.json(result);
    } catch (err) {
        throw err;
    }
});
appRouter.post("/api/shift", async (req, res, next) => {
    try {
        const data = req.body;
        const result = await shiftsControllers.addNewShift(data);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

appRouter.get("/api/schedule", async (req, res, next) => {
    try {
        const result = await scheduleControllers.getSchedule();
        res.json(result);
    } catch (err) {
        throw err;
    }
});
appRouter.post("/api/schedule", async (req, res, next) => {
    try {
        const data = req.body;
        const result = await scheduleControllers.addSchedule(data);
        return result;
    } catch (err) {
        throw next(new ApiError(400, "Lịch đã tồn tại"));
    }
});

appRouter.post("/api/checkin", async (req, res, next) => {
    try {
        const data = req.body;
        const result = await timekeepingControllers.checkIn(data);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

appRouter.get("/api/get-all-time", async (req, res, next) => {
    try {
        const result = await timekeepingControllers.getAllTime();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

module.exports = appRouter;
