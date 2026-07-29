const Product = require("../../models/Product");
const AppError = require("../../utils/AppError");
const { successResponse } = require("../../utils/response");

const getProducts = async (req, res) => {
  const products = await Product.find().lean();
  return successResponse(res, 200, "Products Data Fetched", products);
};
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return successResponse(res, 200, "Product Data Fetched", product);
};

const addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  return successResponse(
    res,
    200,
    "New Product Added Successfully",
    newProduct,
  );
};

module.exports = { addProduct, getProducts, getProductById };
