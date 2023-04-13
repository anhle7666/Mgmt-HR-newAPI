const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
});
const Account = mongoose.model("Accounts", accountSchema);

module.exports = Account;
