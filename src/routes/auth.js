const express = require("express");
const {
  validateUserPwd,
  findUser,
} = require("../mongo/controllers/userController");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res) => {
 
  const { email, password } = req.body;

  const user = await findUser(email);

  //check password
  if (!user || !validateUserPwd(email, password)) {
    res.status(400).send("Can't authenticate user");
    res.end();
  }

  res.cookie(
    "accessToken",
    jwt.sign(JSON.stringify(user), process.env.SECRET_KEY),
    {
      httpOnly: true,
      secure: true,
    }
  );
  res.end();
  

  //todo : implement referesh token
});

authRouter.get("/signout", (req, res) => {
  //clear cookie
  res.clearCookie("accessToken");
  res.end();
});

module.exports = authRouter;
