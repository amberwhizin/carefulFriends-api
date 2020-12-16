const express = require("express");
const logout = express.Router();

const User = require("../models/user");

function authenticate(req, res, next) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
}

logout.delete("/", authenticate);
module.exports = logout;
