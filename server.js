const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to our Hotel");
});


//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the routes 
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);



app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
