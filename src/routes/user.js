//get the timetable here
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel, CourseModel } = require("../mongo/config/schema");

userRouter.get("/getTimetable", async (req, res) => {
  try {
    const user = await resolveAccessToken(req.cookies.accessToken);
    const timetable = await UserModel.findOne({ _id: user._id }).select(
      "timetable"
    );

    res.send(timetable);
    res.end();
  } catch (e) {
    res.status(400);
    res.send("error occured" + e.message).end();
  }
});

//get users according to their department
userRouter.get("/getUsersByDept", async (req, res) => {
  const { dept } = req.query;

  try {
    const users = await UserModel.find({ dept: dept });
    res.send(users).end();
  } catch (e) {
    res.send("some error occured" + e.message).end();
  }
});

//getting all participants of the group
//getting participants of a course,
//allow only if you are a faculty or a participant in the group
userRouter.get("/participants", async (req, res) => {
  try {
    //get the class no from the query
    const { class_no } = req.query;
    //get the course from the class no
    const course = await CourseModel.findOne({ class_no: class_no });

    //check if the request is sent by a faculty or a student
    const user = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);

    let isUser;
    await UserModel.findOne(user).then(
      (user) => (isUser = user ? true : false)
    );

    //check if user is a faculty in the course or check if user is a participant in the course
    if (!(isUser && course.participants.includes(user._id)))
      return res.send("not a participant ");

    //return all the participants
    res.send(course.participants).end();
  } catch (e) {
    res.send("some error occured" + e.message).end();
  }
});

const resolveAccessToken = async (accessToken) => {
  const user = await jwt.verify(accessToken, process.env.SECRET_KEY);

  return user && user;
};

module.exports = userRouter;
