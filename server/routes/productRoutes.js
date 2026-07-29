const express = require("express");
const {
  getProducts,
  addProduct,
  getProductById,
} = require("../controllers/product/productCtrl");
const { adminMiddleware } = require("../middlewares/middleware");
const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/add", adminMiddleware, addProduct);

module.exports = productRoutes;
