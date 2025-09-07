const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { name, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password);

    // create a new instance of user model
    const user = new User({
      name,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Enter a valid emailId");
    }
    const user = User.find({ emailId: emailId });
    if (user.length === 0) {
      throw new Error("Email or password is incorrect!");
    }

    const passwordHash = user.password;
    const isPasswordValid = user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Email or password is incorrect!");
    }

    // Create a JWT Token
    const token = await user.getJWT();
    // Add the token to cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
    });
    // sent the response
    res.send(user.name + " login successfully...");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("An Error Occured... " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("An error Occured..." + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const ALLOWED_UPDATES = ["userId", "name", "age", "gender"];

  const isUpdateAllowed = Object.keys(data).every((k) => {
    ALLOWED_UPDATES.includes(k);
  });

  if (!isUpdateAllowed) {
    res.status(400).send("Update not allowed");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen("7777", () => {
      console.log("Server started on port 7777...");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

// rules
// 1. use async await whenever you do a db operation
// 2. always do the transaction in a try catch block
// 3.
