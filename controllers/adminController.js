const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

module.exports = {
  test: function(req, res) {
    res.send("Admin Route");
  },
  create: async function(req, res) {
    const { username, password } = req.body;

    try {
      let admin = await db.Admin.findOne({ username });
      if (admin) {
        return res.staus(400).json({ msg: "Admin already exists" });
      }

      admin = new Admin({
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        user: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, admin });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  deleteById: async function(req, res) {
    try {
      const admin = await db.Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin does not exist" });
      }
      await admin.remove();
      res.json({ msg: "Admin deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
};
