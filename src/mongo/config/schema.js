const mongoose = require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const UserModel = mongoose.model("User", UserSchema, "users");

//exporting all models
module.exports = { UserModel };
