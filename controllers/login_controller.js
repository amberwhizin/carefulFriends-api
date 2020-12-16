const express = require("express");
const login = express.Router();

const User = require("../models/user");

function authenticate(req, res, next) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) {
      throw err;
    }
    if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          res.status(404).send("Something went wrong...");
        }
        if (isMatch) {
          res.json(user);
        } else {
          res.status(404).send("Invalid Login Info...Sorry!");
        }
      });
    }
  });
}

login.post("/", authenticate);
module.exports = login;
