const express = require("express");
const signup = express.Router();

const User = require("../models/user");

function authenticate(req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) {
      res.status(404).send("Invalid signup Info...Sorry!");
    } else if (user) {
      res.json(user);
    }
  });
}

signup.post("/", authenticate);
module.exports = signup;
