const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth.js");
const {profileRouter} = require("./routes/profile.js")
const {request} = require("./routes/request.js")
const {userRouter} = require("./routes/user.js")
const {bookRouter} = require("./routes/book.js")
// const 

// console.log(authRouter);

app.use(express.json());
app.use(cookieParser());
app.use("/",bookRouter)
app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",request)
app.use("/",userRouter)
app.use("/",bookRouter)


connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(7777, () => {
      console.log("server is listening to the requests on port 7777...");
    });
  })
  .catch((err) => {
    console.log("DataBase is not connected successfully ");
  });



  