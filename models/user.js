const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");

const usersSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

usersSchema.pre("save", function (next) {
  let user = this;

  // only hash the pass if it has been modified or new
  if (!user.isModified("password")) {
    return next();
  }
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash pass using new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override user written pass with the hashed pass
      user.password = hash;
      next();
    });
  });
});

usersSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

users = mongoose.model("Users", usersSchema);
module.exports = users;
