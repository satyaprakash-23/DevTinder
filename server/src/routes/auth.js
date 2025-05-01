const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {validation} = require("../utils/validation");
const { JsonWebTokenError } = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  const data = new User(req.body);
  const { password } = data;

  try {
    validation(req);
    const hashPassword = await bcrypt.hash(password, 10);
    data.password = hashPassword;
    await data.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("User does not added successfully " + err.message);
  }
});

//when someone try to login we first validate
// emailID AND password
//
authRouter.post("/login", async (req, res) => {
  const { emailID, password } = req.body;
 
  

  try {
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Incorrect details");
    }
    const isPasswordValid = user.compareHashPass(password); //use await as compareHashPass is an async function
    // console.log(isPasswordValid);
    
    if (isPasswordValid) {
      const token = await user.getJWT();
    //   console.log(token);
      
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Enter the correct password");
    }
  } catch (err) {
    res.status(400).send("something is wrong " + err.message);
  }
});

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null, { expires: new Date(Date.now()) })
    res.send("Logged out successfully");

})

module.exports = {
  authRouter,
};
