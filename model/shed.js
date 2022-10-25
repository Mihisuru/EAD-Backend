const mongoose = require("mongoose");

const ShedSchema = new mongoose.Schema({
    ownerId : "String",
    shedName : "String",
    shedAddress: "String"
});

module.exports = Shed = mongoose.model("shed",ShedSchema);