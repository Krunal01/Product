const express = require("express");
const authRouter = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const { authMiddleware } = require("../middlewares/middleware");
const productRoutes = require("./productRoutes");
const aiRouter = require("./chatRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/ai", aiRouter);
router.use("/profile", authMiddleware, profileRoutes);
router.use("/product", authMiddleware, productRoutes);

module.exports = router;
