const express = require("express");
const comment = express.Router();

const CommentsModel = require("../models/comment");
const auth = require("../middleware/auth");

// Index ? maybe
comment.get("/", auth, (req, res) => {
  CommentsModel.find({}, (error, foundComment) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundComment);
  });
});

// Create
comment.post("/", auth, (req, res) => {
  CommentsModel.create(
    {
      text: req.body.text,
      _activityId: req.body._activityId,
      owner: req.user.name,
    },
    (error, createdComment) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json(createdComment);
    }
  );
});

// Delete
comment.delete("/:id", auth, (req, res) => {
  CommentsModel.findByIdAndRemove(req.params.id, (error, deletedComment) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedComment);
  });
});

module.exports = comment;
