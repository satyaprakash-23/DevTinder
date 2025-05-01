const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("can't fetch the data " + err.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const allowedEdits = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEdits.includes(key)
  );
  console.log(isEditAllowed);

  if (isEditAllowed) {
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    res.send("profile updated succesfully!!");
    await loggedInUser.save()
  } else {
    res.send("profile doesn't updated successfully");
  }
});

profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
  const {newPassword} = req.body;
  const loggedInUser = req.user;
  // console.log("what was i made for " + hash);
  loggedInUser.password = newPassword;
  await loggedInUser.save();
  res.send("Password updated successfully !!");
  
})

module.exports = {
  profileRouter,
};
