const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
});

module.exports = mongoose.model("user", userSchema);
