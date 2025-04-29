const express = require("express");
const request = express.Router();
// const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");

request.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  // const {toUserId,status} = req.params;
  const status = req.params.status;
  const toUserId = req.params.toUserId;
  console.log(toUserId);
  console.log(status);

  try {
    const toUserIdIsValid = await User.findById(toUserId);
    const fromUserId = req.user._id;
    console.log("toUserIdIsValid " + toUserIdIsValid);

    if (!toUserIdIsValid) {
      throw new Error("given userId is not valid bruh !!");
    }
    const validStatus = ["interested", "ignored"];
    const isStatusValid = validStatus.includes(status);
    console.log("isStatusValid " + isStatusValid);
    if (!isStatusValid) {
      throw new Error("given status is not applicable dear!!");
    }
    //now i am validating that whether the connection request is already present there in the database or not
    const isSameRequestPresent = await ConnectionRequest.findOne({
      $or: [
        { toUserId: toUserId, fromUserId: fromUserId },
        { toUserId: fromUserId, fromUserId: toUserId },
      ],
    });
    if (isSameRequestPresent) {
      throw new Error("Request has made already!!");
    }
    const connectionRequest = new ConnectionRequest({
      toUserId,
      fromUserId,
      status,
    });
    await connectionRequest.save();
    if (status === "interested") {
      res
        .status(200)
        .send(
          `${req.user.firstName} is interested in ${toUserIdIsValid.firstName}`
        );
    } else {
      res
        .status(200)
        .send(`${req.user.firstName} ignored ${toUserIdIsValid.firstName}`);
    }
  } catch (err) {
    res.status(400).send("connectionRequest is invalid " + err.message);
  }
});

request.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const status = req.params.status;
    const requestId = req.params.requestId;
    const loggedInUser = req.user;
    try {
      const statusAllowed = ["accepted", "rejected"];
      const isStatusAllowed = statusAllowed.includes(status);
      if (!isStatusAllowed) {
        res.status(404).json({ message: "Given status is not allowed dear" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(404).send("Bad request " + err.message);
    }
  }
);

module.exports = {
  request,
};
