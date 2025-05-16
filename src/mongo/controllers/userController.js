const { UserModel } = require("../config/schema")

//find instance 
const findUser = (email)=>{
    const user = UserModel.where("email").equals(email).select("name email");

    if(user) return user;

    return false;
}

//check password
const validateUserPwd = (email, password)=>{

    const password_org = UserModel.where("email").equals(email).select("password");

    //implement bcrypt decoding later here

    if(password == password_org) return true;

    return false;
}

module.exports = {findUser, validateUserPwd};