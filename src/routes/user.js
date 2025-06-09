//get the timetable here
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../mongo/config/schema");

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
userRouter.get("/getUsersByDept", async (req,res)=>{
  const {dept} = req.query;

  try{
    const users = await UserModel.find({dept:dept})
    res.send(users).end();
  }catch(e){
    res.send("some error occured" + e.message).end();
  }
})


const resolveAccessToken = async (accessToken) => {
  const user = await jwt.verify(accessToken, process.env.SECRET_KEY);

  return user && user;
};

module.exports = userRouter;
