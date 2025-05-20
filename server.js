require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb } = require("./src/mongo/db");
const authRouter = require("./src/routes/auth");
const {authMiddleware } = require("./src/middlewares/authMiddleware");

//middleware function
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


//api routes
app.use("/api/auth", authRouter);

//init function
connectDb(); //connect to mongodb -> func in ./src/mongo.db

//Serving static files
app.use(express.static(path.join(__dirname, "/dist")));

// Always return index.html for SPA routes
app.use(authMiddleware); //auth gaurd middleware
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

//Server driver
app.listen(3001, () => {
  console.log("server started at port 3001");
});
