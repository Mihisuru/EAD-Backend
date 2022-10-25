const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const User = require("../model/user");
const Shed = require("../model/shed");
const Queue = require("../model/queue");
const Vehicle = require("../model/vehicle");
const connectDB = require("../config/database");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

//User API

Router.post("/createUser",(req,res)=>{
    const user = new User(req.body);

    user.save(err => {
        console.log(err);
        if (err) return res.send(err);
        return res.send(user)
    });
    
    console.log("User Registered Successfully..");
});

Router.put("/updateUser",async (req, res)=>{
    if(req.body){
        let username = req.body.username;
        var result = await User.findOneAndUpdate({username: username}, req.body);
        res.send(result);
    }
});

Router.delete("/deleteUser",async (req, res)=>{
    if (req.params.id) {
        await User.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) {
                return res.send(err)
            };
            return res.send(result);
        });
    }
});

Router.get("/getUsers",async (req, res)=>{
    await User.find()
        .then((data) => {
            res.send(data);
        });
});

Router.post("/findUser",async (req, res)=>{
    if(req.body){
        let username = req.body.username;
        var result = await User.findOne({username: username}).then((data) => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });

    }
});

//Shed API

Router.post("/createShed",(req,res)=>{
    const shed = new Shed(req.body);

    shed.save(err => {
        console.log(err);
        if (err) return res.send(err);
        return res.send(shed)
    });
    
    console.log("Shed Registered Successfully..");
});

Router.put("/updateShed",async (req, res)=>{
    if(req.body){
        let shedName = req.body.shedName;
        var result = await Shed.findOneAndUpdate({shedName: shedName}, req.body);
        res.send(result);
    }
});

Router.delete("/deleteShed",async (req, res)=>{
    if (req.params.id) {
        await Shed.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) {
                return res.send(err)
            };
            return res.send(result);
        });
    }
});

Router.get("/getSheds",async (req, res)=>{
    await Shed.find()
        .then((data) => {
            res.send(data);
        });
});

Router.post("/findShed",async (req, res)=>{
    if(req.body){
        let shedName = req.body.shedName;
        var result = await Shed.findOne({shedName: shedName}).then((data) => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });

    }
});

Router.post("/findShedByOwner",async (req, res)=>{
    if(req.body){
        let ownerId = req.body.ownerId;
        var result = await Shed.find({ownerId: ownerId}).then((data) => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });

    }
});
//Fuel API

Router.post("/createFuel",(req,res)=>{
    const fuel = new Fuel(req.body);

    fuel.save(err => {
        console.log(err);
        if (err) return res.send(err);
        return res.send(shed)
    });
    
    console.log("Fuel Registered Successfully..");
});

Router.put("/updateFuel",async (req, res)=>{
    if(req.body){
        let shedName = req.body.shedName;
        let type = req.body.type;
        var result = await Fuel.findOneAndUpdate({shedName: shedName, type: type}, req.body);
        res.send(result);
    }
});

Router.delete("/deleteFuel",async (req, res)=>{
    if (req.params.id) {
        await Fuel.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) {
                return res.send(err)
            };
            return res.send(result);
        });
    }
});

Router.get("/getFuels",async (req, res)=>{
    await Fuel.find()
        .then((data) => {
            res.send(data);
        });
});

Router.post("/findFuel",async (req, res)=>{
    if(req.body){
        let shedName = req.body.shedName;
        let type = req.body.type;
        var result = await Fuel.findOne({shedName: shedName, type: type}).then((data) => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });

    }
});

//Queue API

Router.post("/createQueue",(req,res)=>{
    const queue = new Queue(req.body);

    queue.save(err => {
        console.log(err);
        if (err) return res.send(err);
        return res.send(queue)
    });
    
    console.log("Queue Registered Successfully..");
});

Router.put("/updateQueue",async (req, res)=>{
    if(req.body){
        let userId = req.body.userId;
        var result = await Queue.findOneAndUpdate({userId: userId, inQueue: true }, req.body);
        res.send(result);
    }
});

Router.delete("/deleteQueue",async (req, res)=>{
    if (req.params.id) {
        await Queue.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) {
                return res.send(err)
            };
            return res.send(result);
        });
    }
});

Router.get("/getQueue",async (req, res)=>{
    await Queue.find()
        .then((data) => {
            res.send(data);
        });
});

Router.post("/getQueueVehicleCount",async (req, res)=>{
    var arr = [];
    let shedName = req.body.shedName;

    await Queue.find({ inQueue: true, shedName: shedName })
    .then((data) => {
        console.log(data)
        for (const doc of data) {
            arr.push(doc.vehicleType)
        }
    
        const obj = {
            threeWheel:0,
            bike:0,
            car:0,
            van:0,
            bus:0,
            truck:0,
        };
    
        for (const element of arr) {
            if(element == "ThreeWheel"){
                obj.threeWheel += 1;
            }else if(element == "Truck"){
                obj.truck += 1;
            }else if(element == "Car"){
                obj.car += 1;
            }else if(element == "Van"){
                obj.van += 1;
            }else if(element == "Bike"){
                obj.bike += 1;
            }else if(element == "Bus"){
                obj.bus += 1;
            }
        }
        res.send(obj);
    });

    
});

//Vehicle API

Router.post("/createVehicle",(req,res)=>{
    const vehicle = new Vehicle(req.body);

    vehicle.save(err => {
        console.log(err);
        if (err) return res.send(err);
        return res.send(vehicle)
    });
    
    console.log("Vehicle Registered Successfully..");
});

Router.put("/updateVehicle",async (req, res)=>{
    if(req.body){
        let vehicleNo = req.body.vehicleNo;
        var result = await Vehicle.findOneAndUpdate({vehicleNo: vehicleNo}, req.body);
        res.send(result);
    }
});

Router.delete("/deleteVehicle",async (req, res)=>{
    if (req.params.id) {
        await Vehicle.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) {
                return res.send(err)
            };
            return res.send(result);
        });
    }
});

Router.get("/getVehicle",async (req, res)=>{
    await Vehicle.find()
        .then((data) => {
            res.send(data);
        });
});

Router.post("/findVehicle",async (req, res)=>{
    if(req.body){
        let ownerId = req.body.ownerId;
        let type = req.body.type;
        var result = await Vehicle.find({ownerId: ownerId}).then((data) => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });

    }
});

module.exports = Router;