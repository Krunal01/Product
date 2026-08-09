const express = require("express");
const cartRoute = require("./cart.route");
const aiRouter = require("./chat.route");
const authRouter = require("./auth.route");
const profileRoutes = require("./profile.route");
const productRoutes = require("./product.route");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/ai", aiRouter);
router.use("/profile", authMiddleware, profileRoutes);
router.use("/product", authMiddleware, productRoutes);
router.use("/cart", authMiddleware, cartRoute);

module.exports = router;
