const express = require('express');
const { UserModel } = require('../../mongo/config/schema');
const { adminMiddleware } = require('../../middlewares/authMiddleware');
const adminUserUtilRouter = express.Router();

adminUserUtilRouter.use(adminMiddleware);


adminUserUtilRouter.get("/findUsersByRegNo" , async (req,res)=>{
    const {searchQuery} = req.query
    const users = await UserModel.find({regno : {$regex : searchQuery}}).select("name regno");
    res.send(users);
})

adminUserUtilRouter.get("/getTimetableByRegNo" , async (req,res)=>{
    const {regno} = req.query;

    const timetable = await UserModel.findOne({regno}).select("timetable");

    res.send(timetable.timetable).end();
})

adminUserUtilRouter.post("/setTimetableByRegNo" ,async (req,res)=>{
    const {regno} = req.query;

    const {timetable} = req.body;

    const user = await UserModel.findOne({regno});
    user.timetable = timetable;
    await user.save();


    res.status(200).end();
})



module.exports = adminUserUtilRouter ;
