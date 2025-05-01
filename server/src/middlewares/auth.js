const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  console.log("yes i am running");
  
  try {
    const { token } = req.cookies;
    
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    console.log(token);
    
    const decoded = jwt.verify(token,"radhe@radhe");
    const {_id} = decoded;
    console.log(_id);
    
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user not found");
    }
    req.user = user;
  } catch(err) {
    res.status(400).send("Error" + err.message);

    
  }
  next();

};

module.exports = {
  userAuth
}
