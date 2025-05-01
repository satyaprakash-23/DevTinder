const mongoose = require("mongoose");

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  { timestamps: true }
);

connectRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
        throw new Error("you can't send connection request to ypurself!!")
    }
    next();
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectRequestSchema);

module.exports = ConnectionRequest;