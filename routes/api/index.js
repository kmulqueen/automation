const router = require("express").Router();
const postRoutes = require("./post");
const adminRoutes = require("./admin");
const authRoutes = require("./auth");

// User Routes
router.use("/post", postRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);

module.exports = router;
