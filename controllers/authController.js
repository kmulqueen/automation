const db = require("../models");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  test: function(req, res) {
    res.send("Auth Route");
  },
  login: async function(req, res) {
    const { username, password } = req.body;

    try {
      let admin = db.Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ msg: "Account does not exist" });
      }

      const isMatch = await bcrpyt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

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
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  }
};
