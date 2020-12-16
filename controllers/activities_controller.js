const express = require("express");
const activities = express.Router();

const ActivityModel = require("../models/activities");
const auth = require("../middleware/auth");

// Index
activities.get("/", auth, (req, res) => {
  ActivityModel.find({})
    .populate({ path: "comments" })
    .exec((error, foundActivity) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res
        .status(200)
        .json(
          foundActivity.map((activity) => activity.toJSON({ virtuals: true }))
        );
    });
});

// Create
activities.post("/", auth, (req, res) => {
  ActivityModel.create(
    { activityName: req.body.activityName, owner: req.user.name },
    (error, createdActivity) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json(createdActivity);
    }
  );
});

// Delete
activities.delete("/:id", auth, (req, res) => {
  ActivityModel.findByIdAndRemove(req.params.id, (error, deletedActivity) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedActivity);
  });
});

module.exports = activities;
