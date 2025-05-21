const express = require("express");
const {
  validateUserPwd,
  findUser,
} = require("../mongo/controllers/userController");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../mongo/config/schema");

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


authRouter.post("/signup", async (req, res) => {
  const { regno, name, email, password } = req.body;

  try {const user = new UserModel({
    name,
    regno,
    email,
    password
  })

  await user.save();


  res.cookie(
    "accessToken",
    jwt.sign(JSON.stringify(user), process.env.SECRET_KEY),
    {
      httpOnly: true,
      secure: true,
    }
  );
  res.end();
}catch(e){
  res.status(400).send(e).end();
}


  //todo : implement referesh token
  //todo : implement bcrypt
});



//check if isAdmin
authRouter.get("/isAdmin", (req, res) => {
  const user = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);

  if (UserModel.find(user).select("role") == "admin") {
    res.status(200).send("admin").end();
  } else {
    res.status(400).send("not admin").end();
  }
});

module.exports = authRouter;
