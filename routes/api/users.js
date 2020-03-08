const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.route("/test").get(usersController.test);

router
  .route("/")
  .get(usersController.getAll)
  .post(usersController.create)
  // ========================================= REMOVE AFTER DEVELOPMENT ====================================
  .delete(usersController.deleteAllUsers);

router.route("/:id").delete(usersController.deleteById);

module.exports = router;
