const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : "String",
    username : "String",
    type: "String"
});

module.exports = User = mongoose.model("user",UserSchema);