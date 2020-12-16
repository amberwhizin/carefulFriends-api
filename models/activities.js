const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCarefulActivity = new Schema({
  activityName: { type: String, required: true },
  owner: { type: String, required: true, unique: true },
});

const Activity = mongoose.model("Activity", PostCarefulActivity);

module.exports = Activity;
