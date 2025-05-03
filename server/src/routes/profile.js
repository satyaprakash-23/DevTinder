const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfile } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(401).send("can't fetch the data " + err.message);
  }
});

profileRouter.post("/profile/update", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  try {
    validateEditProfile(req);
    // console.log("hey" + err);
    

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));


    await loggedInUser.save();
    res.json({ message: "Profile updated successfully", loggedInUser });
  } catch (err) {
    console.log(err.message);
    
    res.status(400).json({ error: err.message });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { newPassword } = req.body;
  const loggedInUser = req.user;
  // console.log("what was i made for " + hash);
  loggedInUser.password = newPassword;
  await loggedInUser.save();
  res.send("Password updated successfully !!");
});

module.exports = {
  profileRouter,
};
