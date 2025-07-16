const express = require('express');
const { UserModel, FacultyModel } = require('../../mongo/config/schema');
const { adminMiddleware } = require('../../middlewares/authMiddleware');
const adminUserUtilRouter = express.Router();

adminUserUtilRouter.use(adminMiddleware);


adminUserUtilRouter.get("/findUsersByRegNo" , async (req,res)=>{
    const {searchQuery} = req.query
    const users = await UserModel.find({regno : {$regex : searchQuery}}).select("name regno");
    res.send(users);
})

//getting students by dept and year filter 
adminUserUtilRouter.get("findUsersByFilter", async (req,res)=>{
    try{
        const {dept, year} = req.query;

        //find users 
        const users = await UserModel.find({dept:dept, year:year}).select("regno name dept year");// only return regno name year and dept 

        //send the user list
        res.send(users).end();
    }catch(e){
        res.status(400).send("some error occurred : " + e.messgae).end();
    }
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

//return search query of faculties
adminUserUtilRouter.get("/facultiesByEmpId",async(req,res)=>{
    try{
        const {search_query} = req.query;

        //serach by emp id
        const faculty_emp = await  FacultyModel.find({emp_id : {$regex : search_query}}).select("emp_id name");

        //search by name
        //case insensitive search 
        const faculty_name = await FacultyModel.find({name: {$regex : search_query,$options : 'i'}}).select("emp_id name");

        //concat both lists and send the response
        
        res.send([...faculty_emp, ...faculty_name]).end();

    }catch(e){
        res.status(400).send("some error occured "+e.message).end();
    }
})

module.exports = adminUserUtilRouter ;
