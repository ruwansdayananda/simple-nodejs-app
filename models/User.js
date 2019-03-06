const mongoose = require("mongoose");

const { Schema } = mongoose;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: new Date()
  },
  avatar: {
    type: String
  }
});
module.exports = User = mongoose.model("users", UserSchema);
