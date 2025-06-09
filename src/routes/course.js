const express = require("express");
const courseRouter = express.Router();
const {
  CourseModel,
  FacultyModel,
  UserModel,
} = require("../mongo/config/schema");
const { adminMiddleware } = require("../middlewares/authMiddleware");
const { randomInt } = require("crypto");

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
  try {
    //get the course no, course title and the faculty name
    const { course_no, course_title, emp_id, slot } = req.body;

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
// select participant using the dept -> user list sent in the request
// add course to the participants also
courseRouter.post("/addParticipants", async (req, res) => {
  const { users, class_no } = req.body;

  try {
    // check the slot of all the participants and if the slot clashes then return a error

    const course = await CourseModel.findOne({ class_no: class_no });
    if (!course) return res.send("invalid class no").end();

    const slot = course.slot;

    // add a check to not allow confliting slots
    for (let user_id of users) {
      const user = await UserModel.findOne({ _id: user_id })
        .select("courses")
        .populate({ path: "courses", select: "slot" });

      //user.courses for each course.slot
      //from this check with the slot, course.slot == slot , return err if true
      // also return the list of users

        res.end();
    }

    //add participants to the course
    // if program has reached here then there are no errors 


    //add course to the partcipants

    
  } catch (e) {
    res.send("some error ocurred" + e.message).end();
  }
});

//updating faculty in the course

module.exports = courseRouter;
