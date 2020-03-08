const db = require("../models");

module.exports = {
  // GET api/users/test
  // Test Route
  test: function(req, res) {
    res.send("Users Test Route");
  },
  // POST api/users
  // Create New User
  create: async function(req, res) {
    const { firstName, lastName, email, phone, age } = req.body;

    try {
      // Check if user already exists by email
      let user = await db.User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User with that email already exists."
        });
      }

      // Format Phone Number
      const phoneNumberPattern = /\(?(\d{3})\)?\-?\.?(\d{3})\-?\.?\s*(\d{4})/;
      const phoneExists = phoneNumberPattern.test(phone);
      const validPhoneInput = phoneNumberPattern.test(phone);
      if (!validPhoneInput || !phoneExists) {
        return res
          .status(400)
          .json({ msg: "Please enter phone number as format (123)456-7890" });
      }
      const match = phone.match(phoneNumberPattern);
      const phoneNumberFormatted = `(${match[1]})${match[2]}-${match[3]}`;

      // Create new user
      user = new User({
        firstName,
        lastName,
        email,
        phone: phoneNumberFormatted,
        age
      });

      // Save in DB
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // GET api/users
  // Get All Users
  getAll: async function(req, res) {
    try {
      const users = await db.User.find();
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // DELETE api/users/:id
  // Delete User by ID
  deleteById: async function(req, res) {
    try {
      const user = await db.User.findById(req.params.id);

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          msg: "User Not Found"
        });
      }

      await user.remove();
      res.json({
        msg: "User Deleted."
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // ================================================ REMOVE AFTER DEVELOPMENT ========================================================
  // DELETE api/users
  // Delete All Users
  deleteAllUsers: async function(req, res) {
    try {
      const users = await db.User.find();

      if (!users) {
        return res.status(400).json({ msg: "No Users Exist" });
      }

      users.forEach(async user => {
        await user.remove();
      });

      res.json({ msg: "All Users Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  }
};
