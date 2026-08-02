const express = require("express");
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controllers");
const cartRoute = express.Router();

cartRoute.get("/", getCartItems);
cartRoute.post("/", addToCart);
cartRoute.delete("/:id", removeFromCart);

module.exports = cartRoute;
