const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { find } = require("../models/user");
const { connection } = require("mongoose");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "id firstName lastName gender age about photoUrl"
    );
    // if(!connectionRequest){
    //     res.status(404).json({message : "You don't have any requests"});
    // }
    if (connectionRequest.length === 0) {
      res.json({ message: "You don't have any requests", connectionRequest });
    } else {
      res.json({ connectionRequest });
    }
  } catch (err) {
    res.status(404).json({ error: "Something went wrong " + err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connectionsDoc = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser }, { fromUserId: loggedInUser }],
      status: "accepted",
    });
    if (connectionsDoc.length === 0) {
      res.json({
        message: "Its seems there is no connections ",
        connections: [],
      });
    }
    const data = connectionsDoc.map((connection) => {
      return connection.toUserId.equals(loggedInUser._id)
        ? connection.fromUserId
        : connection.toUserId;
    });

    const userPromises = data.map(async function (id) {
      return await User.findOne({ _id: id });
    });
    const connections = await Promise.all(userPromises);

    res.json({ message: "Your connections", connections });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong " + err.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const requestsInLogUserPresent = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("toUserId fromUserId");
    const allUser = await User.find({});
    const userToHide = requestsInLogUserPresent.map((connection) => {
      return connection.toUserId.equals(loggedInUser._id)
        ? connection.fromUserId
        : connection.toUserId;
    });

    userToHide.push(loggedInUser);

    const feed = [];
    allUser.forEach((user) => {
      const _id = user._id;
      console.log(_id);

      const isPresent = userToHide.some((user) => user.equals(_id)); //both are object other way it to conert both array element to string
      if (!isPresent) {
        feed.push(user);
      }
      console.log(isPresent);
    });
    if (feed.length === 0) {
      throw new Error("Theres no feed for you currently");
    }
    res.json(feed);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = { userRouter };
