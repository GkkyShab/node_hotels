const express = require("express");
const MenuItem = require("./../models/MenuItem");
const router = express.Router();


//POST route to add MenuItems
router.post("/", async (req, res) => {
  try {
    const menuItemData = req.body;
    const menuItem = new MenuItem(menuItemData);
    const menu_data = await menuItem.save();
    console.log("Menu item saved");
    res.status(201).json(menu_data);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//GET route to Show Menu Details
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//parameterized GET Method API for the Menu Item on the Basis of taste Type
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "Sweet" || tasteType == "Spicy" || tasteType == "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


//PUT Method API to update the MenuItem Records ( menu/:id )
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItemUpdatedData = req.body;
    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      menuItemUpdatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


//DELETE Method API to delete the MenuItem Records  ( menu/:id )
router.delete('/:id',async(req,res) => {
  try {
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(400).json({ message: "Menu item not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
})


//comment added for testing purposes only
module.exports = router;