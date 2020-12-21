const express = require("express");
const signup = express.Router();

const User = require("../models/user");

function authenticate(req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) {
      res.status(404).send("Invalid signup Info...Sorry!");
    } else if (user) {
      user.generateToken((err, user) => {
        if (err) {
          res.status(404).send("Something went wrong...");
        }
        res
          .cookie("ths_auth", user.token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development" ? true : "none",
            secure: process.env.NODE_ENV === "development" ? false : true,
          })
          .status(200)
          .json({ "Login Success": true });
      });
    }
  });
}

signup.post("/", authenticate);
module.exports = signup;
