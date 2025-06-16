const express = require("express");
const courseRouter = express.Router();
const {
  CourseModel,
  FacultyModel,
  UserModel,
} = require("../mongo/config/schema");
const { adminMiddleware } = require("../middlewares/authMiddleware");
courseRouter.use(adminMiddleware);
const jwt = require('jsonwebtoken')

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
  
  try {
    const { users, class_no } = req.body; //send the reg nos and class_no of the course
    
    //check if list of users is valid
    for(let regno of users){
    }


    // check the slot of all the participants and if the slot clashes then return a error
    const course = await CourseModel.findOne({ class_no: class_no });
    if (!course) return res.send("invalid class no").end();

    const slot = course.slot;

    // add a check to not allow confliting slots
    for (let regno of users) {

      const user = await UserModel.findOne({regno:regno})
      .populate({ path: "courses", select: "slot" });;
      
      //check if user valid
      if(!user) return res.send("invalid list of user").end();


      //user.courses for each course.slot
      let err_users = []; //list of users with confilicting slots
      for (let course of user.courses) {
        //from this check with the slot, course.slot == slot
        if (course.slot == slot) err_users.push(user._id);
      }

      // return err if true
      // also return the list of users
      if (err_users.length > 0)
        return res.send("conflicting slots" + err_users).end();

      //adding
      err_users = [];
      if (!course.participants.includes(user._id)) {
        //user not a participatn
        //add participant to the course
        course.participants.push(user._id);
        await course.save();
        user.courses.push(course._id);
      } else {
        err_users.push(regno);
      }

      if (err_users.length > 0)
        return res.send("conflicting slots" + err_users).end();
  
    }

   
    res.send("participants added successfully"),end();
  } catch (e) {
    res.send("some error ocurred" + e.message).end();
  }
});

courseRouter.get("/participants", async (req,res)=>{
  try{
    //get the class_no from query and the course from the class_no
    const {class_no} = req.query;
    const course = await CourseModel.findOne({class_no : class_no});

    res.send(course.participants).end();
  }catch(e){
    res.send("some error occured" + e.message).end();
  }
})
//updating faculty in the course
// roll out with slow update

module.exports = courseRouter;
