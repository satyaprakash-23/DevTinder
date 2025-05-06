const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async ()=>{
    
    await mongoose.connect(process.env.MONGODB_URI);
};

// connectDB().then(()=>{
//     console.log("Database connection established");
    
// }).catch((err)=>{
//     console.log("Database connection failed");
    
// })

module.exports = connectDB;