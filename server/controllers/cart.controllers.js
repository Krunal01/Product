const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response");

const getCartItems = async (req, res) => {
  const result = await Cart.find({ userId: req.user._id });
  return successResponse(res, 200, "Cart items fetched", result);
};
const addToCart = async (req, res) => {
  const cartItem = await Cart.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });
  if (cartItem) {
    throw new AppError(409, "Cart Item Already Exists");
  }
  const obj = {
    userId: req.user._id,
    ...req.body,
  };
  const result = await Cart.create(obj);
  return successResponse(res, 201, "Cart item added", result);
};
const removeFromCart = async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);
  if (!cartItem) {
    throw new AppError(404, "Cart Item not found");
  }
  const result = await Cart.findByIdAndDelete(req.params.id);
  return successResponse(res, 200, "remove from cart items");
};

module.exports = { getCartItems, addToCart, removeFromCart };
