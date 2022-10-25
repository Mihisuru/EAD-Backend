const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    ownerId: { type: String },
    vehicleNo: { type: String},
    type:{ type: String}
});

const Vehicle = mongoose.model('vehicle', VehicleSchema);
module.exports = Vehicle;