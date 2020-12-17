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
  CommentsModel.findById(req.params.id, (error, comment) => {
    if (comment.owner === req.user.name) {
      CommentsModel.findByIdAndRemove(
        req.params.id,
        (error, deletedComment) => {
          if (error) {
            res.status(400).json({ error: error.message });
          }
          res.status(200).json(deletedComment);
        }
      );
    } else {
      res.status(400).json({ error: "You can't delete other users comments" });
    }
  });
});
// Edit
comment.put("/:id", auth, (req, res) => {
  CommentsModel.findById(req.params.id, (error, comment) => {
    if (comment.owner === req.user.name) {
      CommentsModel.findByIdAndUpdate(
        req.params.id,
        {
          text: req.body.text,
          _activityId: req.body._activityId,
          owner: req.user.name,
        },
        { new: true },
        (error, updatedComment) => {
          if (error) {
            res.status(400).json({ error: error.message });
          }
          res.status(200).json(updatedComment);
        }
      );
    } else {
      res.status(400).json({ error: "You can't edit other users comments" });
    }
  });
});

module.exports = comment;
