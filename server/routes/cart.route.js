const express = require("express");
const {
  getCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cart.controller");
const cartRoute = express.Router();

cartRoute.get("/", getCartItems);
cartRoute.post("/", addToCart);
cartRoute.delete("/:id", removeFromCart);
cartRoute.put("/:id", updateQuantity);

module.exports = cartRoute;
