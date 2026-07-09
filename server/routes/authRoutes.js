const express = require("express");
const {
  login,
  register,
  changePassword,
} = require("../controllers/auth/authCtrl");
const { authMiddleware } = require("../middlewares/middleware");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/change-password", authMiddleware, changePassword);

module.exports = authRouter;
