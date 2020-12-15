const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCarefulActivity = new Schema({
  name: { type: String, required: true },
  entry: String,
  img: String,
  // userId: { type: Schema.ObjectId, ref: "User", required: true, unique: true },
});

const Activity = mongoose.model("Activity", PostCarefulActivity);

module.exports = Activity;
