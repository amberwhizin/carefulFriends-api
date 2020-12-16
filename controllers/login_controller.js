const express = require("express");
const login = express.Router();

const User = require("../models/user");

function authenticate(req, res, next) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err || !user) {
      res.status(404).send("Invalid Login Info...Sorry!");
    }
    if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          res.status(404).send("Something went wrong...");
        }
        if (isMatch) {
          user.generateToken((err, user) => {
            if (err) {
              res.status(404).send("Something went wrong...");
            }
            res
              .cookie("ths_auth", user.token)
              .status(200)
              .json({ "Login Success": true });
          });
        } else {
          res.status(404).send("Invalid Login Info...Sorry!");
        }
      });
    }
  });
}

login.post("/", authenticate);
module.exports = login;
