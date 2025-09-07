const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, emailId, password } = req.body;
  if (!name) {
    throw new Error("Name is not valid");
  } else if (name.length < 4 || name.length > 50) {
    throw new Error("name should be between 4 to 50 characters");
  } else if (validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email Id");
  } else if (validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password!!!");
  }
};

module.exports = {
  validateSignUpData,
};
