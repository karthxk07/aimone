const express = require("express");
const {
  FacultyModel,
  CourseModel,
  UserModel,
  MarkEntryModel,
  MarkModel,
} = require("../mongo/config/schema");
const facultyRouter = express.Router();
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/authMiddleware");



//add a faculty
facultyRouter.post("/login", async (req, res) => {
  //get the email and the password
  const { email, password } = req.body;

  //check if faculty with the email exists
  try {
    let faculty = await FacultyModel.findOne({ email: email }).select(
      "password"
    );
    //check if password matched
    // todo - implement bcrypt hashing
    if (password == faculty.password) {
      //sign jwt and then send the access token
      faculty = await FacultyModel.findOne({ email: email });
      const accessToken = jwt.sign(
        JSON.stringify(faculty),
        process.env.SECRET_KEY
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.send("login successfull").end();
    } else {
      res.send("password incorrect").end();
    }
  } catch (e) {
    res.status(400).send("error occurred" + e.message).end();
  }
});

//signup a faculty
//route to be removed and faculty add func to be added to the admin faculty route
facultyRouter.post("/signup",adminMiddleware, async (req, res) => {
  const { email, password, emp_id, name } = req.body;

  try {
    const faculty = FacultyModel({
      name,
      emp_id,
      email,
      password,
    });
    await faculty.save();

    res.send("faculty creation successfull").end();
  } catch (e) {
    res.status(400).send("some error occured" + e.message).end();
  }
});

//getting all participants of the group
//getting participants of a course,
//allow only if you are a faculty or a participant in the group
facultyRouter.get("/participants", async (req, res) => {
  try {
    //get the class no from the query
    const { class_no } = req.query;
    //get the course from the class no
    const course = await CourseModel.findOne({ class_no: class_no });

    //check if the request is sent by a faculty or a student
    const user = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);

    let isFaculty;
    await FacultyModel.findOne(user).then(
      (faculty) => (isFaculty = faculty ? true : false)
    );

    //check if user is a faculty in the course or check if user is a participant in the course
    if (!(isFaculty && course.faculty == user._id))
      return res.send("not a  faculty");

    //return all the participants
    res.send(course.participants).end();
  } catch (e) {
    res.status(400).send("some error occured" + e.message).end();
  }
});

//todo : archiving a course
//roll out with slow updates

//updating marks -> marks entry in the course of a particular student
//make a mark entry with title and marks
//make/update a mark model with the id of the participant
//add this mark model to the marks field in the course
facultyRouter.post("/mark", async (req, res) => {
  try {
    //get the course , user id and mark entry{title, score}

    const { class_no, regno, mark_title, mark_score } = req.body;

    //check if the class_no is correct
    const course = await CourseModel.findOne({ class_no: class_no });
    if (!course) return res.send("course not found").end();

    //check if regno is correct
    const user = await UserModel.findOne({ regno: regno });
    if (!user) return res.send("user not found").end();


    //check if regno is a participant in the course
    if(!course.participants.includes(user._id)) return res.send("not a participant").end();

    //check if mark_title and mark_score have correct types
    if (typeof(mark_title) != "string" && typeof(mark_score) != "number")
      return res.send("not a correct entry").end();

    //make a mark entry with the title and the score
    const mark_entry = new MarkEntryModel({
      entry_label : mark_title,
      entry_score : mark_score
    })
    await mark_entry.save();

    // assign mark to the particular user_id
    const mark = new MarkModel({
      user_id : user._id,
      mark : mark_entry._id
    })
    await mark.save();

    //add mark to the course
    course.marks.push(mark._id);
    await course.save();

    res.send("mark added successfully").end();
  } catch (e) {
    res.status(400).send("some error occured : " + e.message).end();
  }
});

//updating attendence off the student in the course
//similar to the marks

module.exports = facultyRouter;
