const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 12,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "`{VALUE}` is not a gender",
      },
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong " + value);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// No arrow functions
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "BLOG@ly$7525", {
    expiresIn: "7d",
  });
  return token;
};

// No arrow function
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
