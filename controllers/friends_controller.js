const express = require("express");
const activities = express.Router();

const ActivityOptions = require("../models/friends");

//test
activities.get("/", (req, res) => {
  const list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

//Create
activities.post("/", (req, res) => {
  ActivityOptions.create(req.body, (error, createdActivities) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    // sending it back here!
    res.status(200).json(createdActivities);
  });
});

module.exports = activities;
