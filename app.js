const express = require("express");
const AppRouter = require("./routes/employees");
const cors = require("cors");

const ApiError = require("./API-Error");
const app = express();
app.use(express.json());
app.use(cors());

//accept all domain
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/", AppRouter);

//Error
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
