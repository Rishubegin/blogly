const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
