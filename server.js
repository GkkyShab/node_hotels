const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to our Hotel");
});


//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the routes 
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);



app.listen(PORT, () => {
  console.log("Server is listening at port 3000");
});
