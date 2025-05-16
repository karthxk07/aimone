const express = require('express');
const { validateUserPwd, findUser } = require('../mongo/controllers/userController');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post("/login",(req,res)=>{

    console.log('hit login route')
    console.log(req.body)
    const {email, password} = req.body;

    const user = findUser(email);

    //check password
    if(!user || !validateUserPwd(email,password)) {
        res.status(400).send("Can't authenticate user");
        res.end();
    };

    //sign accessToken
    const accessToken  = jwt.sign(user,process.env.SECRET_KEY);

    res.cookie('token' , accessToken , {
        httpOnly : true,
        secure : true,
    });
    res.end();
})

module.exports = authRouter