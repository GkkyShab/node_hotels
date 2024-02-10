const express = require("express");
const Person = require("./../models/Person");
const router = express.Router();

//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Get method to get the person and return on the client
router.get("/", async (req, res) => {
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
