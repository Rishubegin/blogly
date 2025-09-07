const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!");
    }

    // validate the token
    const decodedObj = await jwt.verify(token, "BLOG@ly$7525");

    const { _id } = decodedObj;

    // find the user
    const user = await User.findById({ _id: _id });

    if (!user) {
      throw new Error("User not found!!!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
