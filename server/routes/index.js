const express = require("express");
const authRouter = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const { authMiddleware } = require("../middlewares/middleware");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", authMiddleware, profileRoutes);

module.exports = router;
