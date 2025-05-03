const validator = require("validator");
const validation = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName || !emailID || !password) {
    throw new Error(
      "You have missed adding firstName, lastName, emailID or password"
    );
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Enter a valid emailID");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password !!");
  }
};

const validateEditProfile = (req) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = req.body;

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
  
  if (!isEditAllowed) {
    throw new Error("Invalid Edit Request");
  }
  
  if (firstName && !validator.isAlpha(firstName, "en-US", { ignore: " " })) {
    throw new Error("First name should contain only letters");
  }
  console.log("in edit validation");

  if (lastName && !validator.isAlpha(lastName, "en-US", { ignore: " " })) {
    throw new Error("Last name should contain only letters");
  }

  if (age && !validator.isInt(age.toString(), { min: 0, max: 120 })) {
    throw new Error("Age should be a valid number between 0 and 120");
  }

  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Gender should be 'male', 'female', or 'other'");
  }

  if (about && typeof about !== "string" ) {
    throw new Error("About section must be a string");
  }

  if (skills && !Array.isArray(skills)) {
    throw new Error("Skills must be an array");
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Photo URL must be a valid URL");
  }
};

module.exports = {
  validation,
  validateEditProfile
};
