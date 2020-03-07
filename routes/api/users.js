const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//  GET api/users/test
//  Test Route
router.get("/test", (req, res) => res.send("Users Test Route"));

//  POST api/users
//  Create User
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, age } = req.body;

  try {
    // Check if user already exists by email
    let user = await User.findOne({
      email
    });

    if (user) {
      return res.status(400).json({
        msg: "User with that email already exists."
      });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      age
    });

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

//  GET api/users
//  Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
