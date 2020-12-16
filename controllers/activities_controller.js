const express = require("express");
const activities = express.Router();

const ActivityOptions = require("../models/activities");
const auth = require("../middleware/auth");

// Index
activities.get("/", auth, (req, res) => {
  ActivityOptions.find({}, (error, foundActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundActivity);
  });
});

// Create
activities.post("/", auth, (req, res) => {
  ActivityOptions.create(req.body, (error, createdActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(createdActivity);
  });
});

// Delete
activities.delete("/:id", auth, (req, res) => {
  ActivityOptions.findByIdAndRemove(req.params.id, (error, deletedActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedActivity);
  });
});

module.exports = activities;
