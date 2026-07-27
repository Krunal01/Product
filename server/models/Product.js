const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "product price cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    productImageUrl: {
      type: String,
      default: null,
    },
    productImagePublicId: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
