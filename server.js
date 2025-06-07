require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb } = require("./src/mongo/db");
const authRouter = require("./src/routes/auth");
const {authMiddleware, adminMiddleware } = require("./src/middlewares/authMiddleware");
const adminUserUtilRouter = require("./src/routes/admin/adminUserUtils");
const userUtilRouter = require("./src/routes/userUtils");
const courseRouter = require("./src/routes/admin/course");
const facultyRouter = require("./src/routes/admin/faculty");


//middleware function
app.use(cors({origin : ["http://localhost:5173"]}));
app.use(bodyParser.json());
app.use(cookieParser());


//api routes
app.use("/api/auth", authRouter);
app.use("/api/admin/user_util", adminUserUtilRouter);
app.use("/api/user_util/", userUtilRouter);
app.use("/api/course",courseRouter);
app.use("/api/faculty", facultyRouter);

//init function
connectDb(); //connect to mongodb -> func in ./src/mongo.db

//Serving static files
app.use(express.static(path.join(__dirname, "/dist")));

// Always return index.html for SPA routes
app.use(authMiddleware); //auth gaurd middleware
app.use("/admin/*", adminMiddleware); // gaurd admin routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

//Server driver
app.listen(3001, () => {
  console.log("server started at port 3001");
});
