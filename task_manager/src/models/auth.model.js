const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const auth = mongoose.model("User", authSchema);
module.exports = auth;
