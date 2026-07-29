import * as yup from "yup";

export const addProductValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Product name is required")
    .max(150, "Product name cannot exceed 150 characters"),

  price: yup
    .number()
    .typeError("Price is required")
    .required("Price is required")
    .min(0, "Price cannot be negative"),

  discountPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Discount price cannot be negative")
    .test(
      "discount-price",
      "Discount price cannot be greater than price",
      function (value) {
        if (value == null) return true;
        return value <= this.parent.price;
      },
    ),

  currency: yup
    .string()
    .oneOf(["INR", "USD", "EUR"])
    .required("Currency is required"),

  description: yup.string().trim().required("Description is required"),

  shortDescription: yup
    .string()
    .trim()
    .max(250, "Short description cannot exceed 250 characters"),

  category: yup.string().trim().required("Category is required"),

  subCategory: yup.string().trim(),

  brand: yup.string().trim(),

  productImage: yup.mixed().required("Product image is required"),

  //   specifications: yup.array().of(
  //     yup.object({
  //       key: yup.string().trim(),
  //       value: yup.string().trim(),
  //     }),
  //   ),
  specifications: yup.array().of(
    yup.object({
      key: yup.string().trim().required("Specification name is required"),

      value: yup.string().trim().required("Specification value is required"),
    }),
  ),

  features: yup.array().of(yup.string().trim()),

  tags: yup.array().of(yup.string().trim().lowercase()),
});
