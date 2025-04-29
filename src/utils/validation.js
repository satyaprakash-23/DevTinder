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

module.exports = {
  validation,
};
