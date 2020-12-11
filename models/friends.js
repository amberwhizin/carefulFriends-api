const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCarefulFriend = new Schema({
  name: { type: String, required: true, unique: true },
  entry: String,
  img: String,
  // userId: { type: Schema.ObjectId, ref: "User", required: true, unique: true },
});

const Friend = mongoose.model("Friend", PostCarefulFriend);

module.exports = Friend;
