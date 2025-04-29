const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://SatyaPrakash:vDvf42UtvpC6serW@cluster0.wwwqpnc.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0")

};

// connectDB().then(()=>{
//     console.log("Database connection established");
    
// }).catch((err)=>{
//     console.log("Database connection failed");
    
// })

module.exports = connectDB;