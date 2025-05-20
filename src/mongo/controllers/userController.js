const { UserModel } = require("../config/schema");

//find instance
const findUser = async (email) => {
  const user = await UserModel.where("email")
    .equals(email)
    .select("_id name email");

  if (user && user != {}) return user[0];

  return false;
};

//check password
const validateUserPwd = async (email, password) => {
  const password_org = await UserModel.where("email")
    .equals(email)
    .select("password");

  //implement bcrypt decoding later here

  if (password == password_org) return true;

  return false;
};

module.exports = { findUser, validateUserPwd };
