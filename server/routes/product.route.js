const express = require("express");
const {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");
const { adminMiddleware } = require("../middlewares/auth.middleware");
const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post(
  "/add",
  adminMiddleware,
  upload.single("productImage"),
  addProduct,
);
productRoutes.put(
  "/:id",
  adminMiddleware,
  upload.single("productImage"),
  updateProduct,
);
productRoutes.delete("/:id", adminMiddleware, deleteProduct);

module.exports = productRoutes;
