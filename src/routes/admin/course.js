const express = require("express");
const courseRouter = express.Router();
const { CourseModel, FacultyModel } = require("../../mongo/config/schema");
const { adminMiddleware } = require("../../middlewares/authMiddleware");

courseRouter.use(adminMiddleware);

//make a course and assign a course id using a function
// the course willl be created by the admin
// the faculty to the course will be assigned by the admin
// students of the particular dept can be added to the course

// inside user router, users can view all there courses
// view marks in each course
// view attendance in each course

//add a course and automatically set its course id
courseRouter.post("/add", async (req, res) => {
  //get the course no, course title and the faculty name
  const { course_no, course_title, emp_id, slot } = req.body;

  try {
    //find faculty from the emp id
    const faculty = await FacultyModel.findOne({ emp_id: emp_id });

    //generate a class number
    const class_no = "CH" + Date.now().toString(); //timestamp

    //make a new course with the following details
    const course = CourseModel({
      class_no: class_no,
      course_no: course_no,
      course_title: course_title,
      faculty: faculty._id,
      slot: slot,
    });
    await course.save();

    res.send("course added successfully").end();
  } catch (e) {
    res.send(e.message).end();
  }
});

//getting all courses
courseRouter.get("/allCourses", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.send(courses).end();
  } catch (e) {
    res.send("some error occured " + e.message).end();
  }
});

//find course by class no
courseRouter.get("/getCourseByClassNo", async (req, res) => {
  const { class_no } = req.params;

  try {
    const course = await CourseModel.findOne({ class_no: class_no });
    res.send(course).end();
  } catch (e) {
    res.send("some error occured " + e.message).end();
  }
});

//adding participants in the course
// select participant using the dept
// add a check to not allow confliting slots
// check the slot of all the participants and if the slot clashes then return a error

//updating faculty in the course


module.exports = courseRouter;
