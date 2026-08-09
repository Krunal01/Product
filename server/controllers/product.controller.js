const { v2 } = require("cloudinary");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response");
const { generateEmbeddings } = require("../utils/embedding");

const getProducts = async (req, res) => {
  const products = await Product.find().select("-embeddings").lean();
  return successResponse(res, 200, "Products Data Fetched", products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).select("-embeddings");
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return successResponse(res, 200, "Product Data Fetched", product);
};

const addProduct = async (req, res) => {
  if (typeof req.body.features === "string")
    req.body.features = JSON.parse(req.body.features);
  if (typeof req.body.tags === "string")
    req.body.tags = JSON.parse(req.body.tags);
  if (typeof req.body.specifications === "string")
    req.body.specifications = JSON.parse(req.body.specifications);

  if (req.file) {
    req.body.productImageUrl = req.file.path;
    req.body.productImagePublicId = req.file.filename;
  } else {
    req.body.productImageUrl = null;
    req.body.productImagePublicId = null;
  }

  const { name, category, brand, description, shortDescription, price } =
    req.body;

  const embeddingText = `
    Name: ${name}
    Price: ${price}
    Category: ${category}
    Brand: ${brand}
    Description: ${description}
    shortDescription: ${shortDescription}
    Features: ${req?.body?.features?.join(", ")}
    Tags: ${req?.body?.tags?.join(", ")}
  `;

  req.body.embeddings = await generateEmbeddings(embeddingText);

  const newProduct = await Product.create(req.body);
  return successResponse(
    res,
    200,
    "New Product Added Successfully",
    newProduct,
  );
};

const updateProduct = async (req, res) => {
  if (typeof req.body.features === "string")
    req.body.features = JSON.parse(req.body.features);
  if (typeof req.body.tags === "string")
    req.body.tags = JSON.parse(req.body.tags);
  if (typeof req.body.specifications === "string")
    req.body.specifications = JSON.parse(req.body.specifications);

  const { id } = req.params;
  const currentProduct = await Product.findById(id);
  if (!currentProduct) {
    throw new AppError(404, "Product not found");
  }
  if (req.file) {
    if (currentProduct.productImagePublicId) {
      const response = await v2.uploader.destroy(
        currentProduct.productImagePublicId,
      );
      if (response.result !== "ok" && response.result !== "not found") {
        throw new AppError(500, "some error occured in product image update.");
      }
    }
    req.body.productImageUrl = req.file.path;
    req.body.productImagePublicId = req.file.filename;
  }
  const { name, category, brand, description, shortDescription, price } =
    req.body;

  const embeddingText = `
    Name: ${name}
    Price: ${price}
    Category: ${category}
    Brand: ${brand}
    Description: ${description}
    shortDescription: ${shortDescription}
    Features: ${req?.body?.features?.join(", ")}
    Tags: ${req?.body?.tags?.join(", ")}
  `;

  req.body.embeddings = await generateEmbeddings(embeddingText);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return successResponse(res, 200, "Product Updated Successfully", product);
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const currentProduct = await Product.findById(id).select("-embeddings");
  if (!currentProduct) {
    throw new AppError(404, "Product not found");
  }
  if (currentProduct.productImagePublicId) {
    const response = await v2.uploader.destroy(
      currentProduct.productImagePublicId,
    );
    if (response.result !== "ok" && response.result !== "not found") {
      throw new AppError(500, "some error occured in product image delete.");
    }
  }

  await Product.findByIdAndDelete(id);

  return successResponse(res, 200, "Product Deleted Successfully");
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
