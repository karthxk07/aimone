const mongoose = require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
  regno: { type: String, required: [true, "Reg no is required"], unique: true },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: { type: String, reequired: true, select: false },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  dept: { type: String },
  year: { type: Number },
});
const UserModel = mongoose.model("User", UserSchema);

//course schema
const CourseSchema = new mongoose.Schema({
  class_no: {type:String,unique:true}, // Unique Id indentifing a particular class 
  course_no: String,
  course_title: String,
  year : {type:Number, default : ()=> new Date().getFullYear()},
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mark" }],
  attendence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendence" }],
  slot: {
    type: String,
    enums: [
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "M7",
      "M8",
      "M9",
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "W1",
      "W2",
      "W3",
      "W4",
      "W5",
      "W6",
      "W7",
      "W8",
      "W9",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "H7",
      "H8",
      "H9",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
      "S6",
      "S7",
      "S8",
      "S9",
      "U1",
      "U2",
      "U3",
      "U4",
      "U5",
      "U6",
      "U7",
      "U8",
      "U9",
    ],
  },
});
const CourseModel = mongoose.model("Course", CourseSchema);

//attendence schema
const AttendenceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attendence: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceEntry" },
  ],
});
const AttendenceModel = mongoose.model("Attendence", AttendenceSchema);

//attendence entry schema
const AttendenceEntrySchema = new mongoose.Schema({
  entry_date: { type: Date },
  entry_status: { type: String, enum: ["present", "absent"] },
});
const AttendenceEntryModel = mongoose.model(
  "AttendenceEntry",
  AttendenceEntrySchema
);

// mark schema
const MarkSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mark: [{ type: mongoose.Schema.Types.ObjectId, ref: "MarkEntry" }],
});
const MarkModel = mongoose.model("Mark", MarkSchema);

//marks entry schema
const MarkEntrySchema = new mongoose.Schema({
  entry_label: String,
  entry_score: Number,
});
const MarkEntryModel = mongoose.model("MarkEntry", MarkEntrySchema);

//faculty schema
const FacultySchema = new mongoose.Schema({
  emp_id: { type: String, required: true, unique: true },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: { type: String, reequired: true, select: false },
  role: { type: String, enum: ["admin", "academic"], default: "academic" },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const FacultyModel = mongoose.model("Faculty", FacultySchema);

//exporting all models
module.exports = { UserModel, CourseModel, FacultyModel };
