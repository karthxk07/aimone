const jwt = require("jsonwebtoken");
const { UserModel, FacultyModel } = require("../mongo/config/schema");

const authMiddleware = async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies.accessToken && validateAccessToken(cookies.accessToken)) {
    if (req.path == "/login") {
      res.redirect("/dashboard");
      res.end();
      return;
    }
    next();
    return;
  } else {
    if (req.path == "/login") {
      next();
      return;
    }
    res.redirect("/login");
    res.end();
  }
};

//only for faculty login
const adminMiddleware = async (req, res, next) => {
  //see if a faculty logged in or a user, if not faculty return error
  try {
    const faculty = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);

    let isAdmin;
    await FacultyModel.find(faculty)
      .select("role")
      .then((user) => {
        isAdmin = user[0].role == "admin";
      });

    isAdmin ? next() : res.send("not admin").end();
  } catch (e) {
    res.send("not a faculty" + e.message).end();
  }
};

const validateAccessToken = async (accessToken) => {
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (user && findUser(user.email)) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

module.exports = { authMiddleware, adminMiddleware, validateAccessToken };
