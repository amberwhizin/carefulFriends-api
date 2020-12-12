const express = require("express");
const activities = express.Router();

const ActivityOptions = require("../models/friends");

//test
activities.get("/", (req, res) => {
   ActivityOptions.find({}, (error, foundActivity) => {
     if (error) {
       res.status(400).json({ error: error.message });
     }
     res.status(200).json(foundActivity);
   });
});

//Create
activities.post("/", (req, res) => {
  ActivityOptions.create(req.body, (error, createdActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    // sending it back here!
    res.status(200).json(createdActivity);
  });
});

// delete
activities.delete("/:id", (req, res) => {
  ActivityOptions.findByIdAndRemove(req.params.id, (error, deletedActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedActivity);
  });
});

module.exports = activities;
