const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Account = require("../models/Accounts");

exports.Login = async (username, password) => {
    const accessTokenSecret = "loginsuccessfull";
    const user = await Account.findOne({ username });

    if (!user) {
        return "";
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return "Incorrect Password";
    }

    let accessToken = jwt.sign({ username: user.username }, accessTokenSecret);

    if (user.role === "admin") {
        accessToken = jwt.sign({ username: user.username, role: "admin" }, accessTokenSecret, { expiresIn: "1h" });
    }
    return accessToken;
};

exports.Register = async (username, password) => {
    const existingUser = await Account.findOne({ username: username });
    if (existingUser) {
        return "User already exists";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Account({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    return savedUser;
};
