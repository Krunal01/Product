const express = require("express");
const authRouter = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const { authMiddleware } = require("../middlewares/middleware");
const productRoutes = require("./productRoutes");
const aiRouter = require("./chatRoutes");
const cartRoute = require("./cart.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/ai", aiRouter);
router.use("/profile", authMiddleware, profileRoutes);
router.use("/product", authMiddleware, productRoutes);
router.use("/cart", authMiddleware, cartRoute);

module.exports = router;
