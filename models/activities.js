const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCarefulActivity = new Schema({
  activityName: { type: String, required: true },
  owner: { type: String, required: true },
});

PostCarefulActivity.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "_activityId",
  justOne: false,
});

const Activity = mongoose.model("Activity", PostCarefulActivity);

module.exports = Activity;
