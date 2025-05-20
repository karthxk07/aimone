const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies.accessToken && validateAccessToken(cookies.accessToken)) {
    if (req.path == "/login") {
      res.redirect("/dashboard")
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

module.exports = { authMiddleware };
