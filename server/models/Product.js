const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      maxlength: [150, "Product name cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "product price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "product discount price cannot be negative"],
      default: null,
      validate: {
        validator: function (value) {
          if (this instanceof mongoose.Query) {
            const update = this.getUpdate();
            if (update.price !== undefined) {
              return value <= update.price;
            }
          }
          return true;
        },
        message: "Discount price cannot be greater than the original price",
      },
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxLength: 250,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      index: true,
      trim: true,
    },
    productImageUrl: {
      type: String,
      default: null,
    },
    productImagePublicId: {
      type: String,
      default: null,
    },
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    embeddings: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

ProductSchema.pre("save", async function (next) {
  if (!this.isModified("name")) {
    return;
  }
  let generatedSlug = slugify(this.name, { lower: true, strict: true });
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  this.slug = `${generatedSlug}-${randomSuffix}`;
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
