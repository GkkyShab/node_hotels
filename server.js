const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const passport = require("./auth");


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false })

//MiddleWare configuration
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next(); // move to the next phase
};

app.use(logRequest);

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello World! Welcome to our Hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Use the routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Server is listening at port 3000");
});
