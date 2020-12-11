const express = require("express");
const activities = express.Router();

const ActivityOptions = require("../models/friends");

//test
activities.get("/", (req, res) => {
   ActivityOptions.find({}, (error, foundList) => {
     if (error) {
       res.status(400).json({ error: error.message });
     }
     res.status(200).json(foundList);
   });
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
