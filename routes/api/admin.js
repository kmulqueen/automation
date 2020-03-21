const router = require("express").Router();
const adminController = require("../../controllers/adminController");

router.route("/test").get(adminController.test);

router.route("/").post(adminController.create);

router.route("/:id").delete(adminController.deleteById);

module.exports = router;
