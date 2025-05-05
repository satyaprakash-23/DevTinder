const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 1,
      maxLength: 50,
      validate(value) {
        console.log(value);

        if (/\d/.test(value) || /[^a-zA-Z0-9]/.test(value)) {
          throw new Error("Name should be String");
        }
      },
      set: (value) => {
        value = value.toLowerCase();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      required: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 20,
      validate(value) {
        console.log(value);

        if (/\d/.test(value) || /[^a-zA-Z0-9]/.test(value)) {
          throw new Error("Name should be String");
        }
      },
      set: (value) => {
        value = value.toLowerCase();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      required: true,
    },
    emailID: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 100,
      required: true,
      validate: (value) => {
        if (!(/[a-zA-Z0-9]/.test(value) && /[^a-zA-Z0-9]/.test(value))) {
          throw new Error(
            "Password must contain alphabet, number and special character"
          );
        }
        if (/[a-z]/.test(value.charAt(0))) {
          throw new Error("First letter of password must be capital");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "to young for this platform"],
      max: 100,
    },
    gender: {
      type: String,
      validate: (value) => {
        value = value.toLowerCase();
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
      set: (value) => {
        value = value.toLowerCase();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    about: {
      type: String,
      maxLength: 160,
      default: "Hey I'm software developer nice to meet you",
    },
    skills: {
      type: [String],
      default: ["react", "Nodejs", "DSA"],
      validate(value) {
        if (value.length > 10) {
          throw new Error("You can add maximum 10 skills");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid URL");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.sayHello = function () {
  return "hi i am " + this.firstName;
};
userSchema.methods.compareHashPass = async function (enteredPassword) {
  const hashPassword = this.password;
  // console.log(this);

  // console.log("enteredPass " + enteredPassword);
  // console.log("hashPassword " + hashPassword);

  const isPasswordValid = await bcrypt.compare(enteredPassword, hashPassword);
  return isPasswordValid;
};

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id : user._id},"radhe@radhe");
  return token;

}
userSchema.pre("save",async function(next){
  const user = this;
  
  if(user.isModified("password")){
    const hashPassword = await bcrypt.hash(user.password,10);
    user.password = hashPassword;
  }
  next(); // move to saving
})

// const User =
module.exports = mongoose.model("User", userSchema);
