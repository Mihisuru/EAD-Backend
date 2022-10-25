const mongoose = require("mongoose");

const FuelSchema = new mongoose.Schema({
    shedName: {type: String},
    type: { type: String }, 
    arrivalTime: { type: Date }, 
    finishedTime: { type: Date }, 
    qty: { type: String },
    price:{type: String}
});

module.exports = User = mongoose.model("fuel",FuelSchema);