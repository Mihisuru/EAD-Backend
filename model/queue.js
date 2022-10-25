const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
    userId: { type: String},
    shedName: { type: String},
    vehicleType: { type: String},
    arrivalTime: { type: Date},
    departTime: { type: Date},
    inQueue: { type: Boolean},
    exitBeforePump :  { type: Boolean},
    exitAfterPump : { type: Boolean},
});

const Queue = mongoose.model('queue', QueueSchema);
module.exports = Queue;