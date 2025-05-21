const mongoose = require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
  regno: { type: String, required: [true, "Reg no is required"], unique: true },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: String,
  role: { type: String, enum: ["admin", "user"] , default : "user"},
  timetable: {
    type: [[{ course_code: String, course_title: String }]],
    default: () => {
      const rows = 8;
      const cols = 9;
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          courseTitle: "",
          courseCode: "",
        }))
      );
    },
  },
});
const UserModel = mongoose.model("User", UserSchema, "users");

//exporting all models
module.exports = { UserModel };
