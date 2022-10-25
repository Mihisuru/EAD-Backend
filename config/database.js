const mongoose = require("mongoose");

// const URI = "mongodb+srv://nnj16:nnj16@cluster0.wmc1l.mongodb.net/Lab6dB?retryWrites=true&w=majority";
const URI = "mongodb+srv://mihisuru:mihisuru@cluster0.rrh87ee.mongodb.net/eadDB?retryWrites=true&w=majority";

const connectDB = async ()=>{
    await mongoose.connect(URI,{useNewUrlParser: true,  useUnifiedTopology: true});
    console.log("Database Connected....");
}

module.exports = connectDB;