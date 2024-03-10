const express = require("express");
const Person = require("./../models/Person");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt");

//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");

    //payload for generating the token
    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);
    console.log(token);

    res.status(200).send({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    //Extract username and password from the request body
    const { username, password } = req.body;

    //Find the user from the username
    const user = await Person.findOne({ username: username });

    //if the user does not exist or password does not match ,return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ meaasge: "Invalid Username or password" });
    }

    //Genreate Token now
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Profile Route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData = req.user;
    console.log("User Data: ",userData);

    const userID = req.user.id;
    const user = await Person.findById(userID)
    
    res.status(200).json(user)

  }catch(err){
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
})

//Get method to get the person and return on the client
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Saved");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//parameterized GET Method API for the Person on the Basis of work Type

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//PUT/PATCH Method API to delete the Person Records  ( person/:id )

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personUpdatedData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      personUpdatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//DELETE Method API to delete the Person Records  ( person/:id )

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(400).json({ message: "Person not Found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
