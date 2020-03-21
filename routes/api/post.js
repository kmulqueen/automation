const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/test").get(postController.test);

router
  .route("/")
  .get(postController.getAll)
  .post(postController.create)
  // ========================================= REMOVE AFTER DEVELOPMENT ====================================
  .delete(postController.deleteAllPosts);

router.route("/:id").delete(postController.deleteById);

module.exports = router;
