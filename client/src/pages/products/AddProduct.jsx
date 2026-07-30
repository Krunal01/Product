import React from "react";
import { FieldArray, useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  brands,
  categories,
  showError,
  subCategories,
  successToast,
} from "../../utils/global";
import FieldError from "../../components/FieldError";
import Btn from "../../components/Btn";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdQuery,
} from "../../redux/apis/productApi";
const AddProduct = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: isEditLoading }] =
    useEditProductMutation();
  const { data } = useGetProductByIdQuery(id, { skip: !isEditMode });
  const product = data?.data;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      price: product?.price || "",
      discountPrice: product?.discountPrice || "",
      currency: product?.currency || "INR",

      description: product?.description || "",
      shortDescription: product?.shortDescription || "",

      category: product?.category || "",
      subCategory: product?.subCategory || "",
      brand: product?.brand || "",

      productImage: null,

      specifications: product?.specifications || [
        {
          key: "",
          value: "",
        },
      ],

      features: product?.features || [""],

      tags: product?.tags || [""],
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("discountPrice", values.discountPrice || "");
        formData.append("currency", values.currency);
        formData.append("description", values.description);
        formData.append("shortDescription", values.shortDescription || "");
        formData.append("category", values.category);
        formData.append("subCategory", values.subCategory || "");
        formData.append("brand", values.brand || "");

        const userId = JSON.parse(localStorage.getItem("user"))?._id;
        formData.append("createdBy", userId);

        if (isEditMode) {
          formData.append("_id", id);
        }

        formData.append("features", JSON.stringify(values.features));
        formData.append("tags", JSON.stringify(values.tags));
        formData.append(
          "specifications",
          JSON.stringify(values.specifications),
        );

        if (values.productImage) {
          formData.append("productImage", values.productImage);
        }

        let response;
        if (isEditMode) {
          response = await updateProduct(formData).unwrap();
        } else {
          response = await addProduct(formData).unwrap();
        }
        console.log(response);
        if (response?.success && response?.statusCode === 200) {
          successToast(response?.message);
          navigate("/");
        }
      } catch (error) {
        showError(error);
      }
    },
  });

  return (
    <div className="flex justify-center">
      <div className="max-w-115 w-full mt-25 border rounded p-1 border-blue-400">
        <div className="text-2xl my-2 text-center text-blue-400">
          {isEditMode ? "Update" : "Add"} Product Here
        </div>
        <Btn title="Home" onClick={() => navigate("/")} />
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <label htmlFor="name" className="mb-1 text-gray-600">
              Product Name
            </label>

            <input
              type="text"
              placeholder="enter product name"
              name="name"
              id="name"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            <FieldError
              error={formik.errors.name}
              touched={formik.touched.name}
            />
          </div>
          <div className="p-1">
            <label htmlFor="price" className="mb-1 text-gray-600">
              Price
            </label>

            <input
              type="number"
              placeholder="enter product price"
              name="price"
              id="price"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />

            <FieldError
              error={formik.errors.price}
              touched={formik.touched.price}
            />
          </div>
          <div className="p-1">
            <label htmlFor="discountPrice" className="mb-1 text-gray-600">
              Discount Price
            </label>

            <input
              type="number"
              placeholder="enter discount price"
              name="discountPrice"
              id="discountPrice"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discountPrice}
            />

            <FieldError
              error={formik.errors.discountPrice}
              touched={formik.touched.discountPrice}
            />
          </div>
          <div className="p-1">
            <label htmlFor="currency" className="mb-1 text-gray-600">
              Currency
            </label>

            <select
              name="currency"
              id="currency"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currency}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <FieldError
              error={formik.errors.currency}
              touched={formik.touched.currency}
            />
          </div>
          <div className="p-1">
            <label htmlFor="shortDescription" className="mb-1 text-gray-600">
              Short Description
            </label>

            <textarea
              placeholder="enter short description"
              name="shortDescription"
              id="shortDescription"
              rows={3}
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shortDescription}
            />

            <FieldError
              error={formik.errors.shortDescription}
              touched={formik.touched.shortDescription}
            />
          </div>
          <div className="p-1">
            <label htmlFor="description" className="mb-1 text-gray-600">
              Description
            </label>

            <textarea
              placeholder="enter product description"
              name="description"
              id="description"
              rows={5}
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />

            <FieldError
              error={formik.errors.description}
              touched={formik.touched.description}
            />
          </div>
          <div className="p-1">
            <label htmlFor="category" className="mb-1 text-gray-600">
              Category
            </label>

            <select
              name="category"
              id="category"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("subCategory", "");
              }}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category?.toUpperCase()}
                </option>
              ))}
            </select>

            <FieldError
              error={formik.errors.category}
              touched={formik.touched.category}
            />
          </div>
          <div className="p-1">
            <label htmlFor="subCategory" className="mb-1 text-gray-600">
              Sub Category
            </label>

            <select
              name="subCategory"
              id="subCategory"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subCategory}
              disabled={!formik.values.category}
            >
              <option value="">Select Sub Category</option>

              {formik.values.category &&
                subCategories[formik.values.category]?.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory?.toUpperCase()}
                  </option>
                ))}
            </select>

            <FieldError
              error={formik.errors.subCategory}
              touched={formik.touched.subCategory}
            />
          </div>
          <div className="p-1">
            <label htmlFor="brand" className="mb-1 text-gray-600">
              Brand
            </label>

            <select
              name="brand"
              id="brand"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
            >
              <option value="">Select Brand</option>

              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand?.toUpperCase()}
                </option>
              ))}
            </select>

            <FieldError
              error={formik.errors.brand}
              touched={formik.touched.brand}
            />
          </div>
          <div className="p-1">
            <label htmlFor="productImage" className="mb-1 text-gray-600">
              Product Image
            </label>

            <input
              type="file"
              name="productImage"
              id="productImage"
              accept="image/*"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={(event) => {
                formik.setFieldValue(
                  "productImage",
                  event.currentTarget.files[0],
                );
              }}
              onBlur={formik.handleBlur}
            />

            <FieldError
              error={formik.errors.productImage}
              touched={formik.touched.productImage}
            />
          </div>
          <div className="p-1">
            <label className="mb-1 text-gray-600">Specifications</label>

            {formik.values.specifications.map((spec, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <input
                  type="text"
                  placeholder="Specification name (eg: RAM)"
                  name={`specifications[${index}].key`}
                  className="w-full outline-blue-400 p-1 border rounded mb-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={spec.key}
                />

                <FieldError
                  error={formik.errors.specifications?.[index]?.key}
                  touched={formik.touched.specifications?.[index]?.key}
                />

                <input
                  type="text"
                  placeholder="Specification value (eg: 8GB)"
                  name={`specifications[${index}].value`}
                  className="w-full outline-blue-400 p-1 border rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={spec.value}
                />

                <FieldError
                  error={formik.errors.specifications?.[index]?.value}
                  touched={formik.touched.specifications?.[index]?.value}
                />

                {formik.values.specifications.length > 1 && (
                  <button
                    type="button"
                    className="mt-2 bg-red-400 text-white px-3 py-1 rounded"
                    onClick={() => {
                      const updatedSpecifications =
                        formik.values.specifications.filter(
                          (_, i) => i !== index,
                        );

                      formik.setFieldValue(
                        "specifications",
                        updatedSpecifications,
                      );
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-400 text-white px-3 py-1 rounded"
              onClick={() =>
                formik.setFieldValue("specifications", [
                  ...formik.values.specifications,
                  {
                    key: "",
                    value: "",
                  },
                ])
              }
            >
              + Add Specification
            </button>
          </div>
          {/* Features */}
          <div className="p-1 mt-2">
            <label className="mb-1 text-gray-600 block">Features</label>

            {formik.values.features.map((feature, index) => (
              <div key={index} className="mb-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="enter feature (eg: Water Resistant)"
                    name={`features[${index}]`}
                    className="w-full outline-blue-400 p-1 border rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={feature}
                  />

                  {formik.values.features.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer shrink-0"
                      onClick={() => {
                        const updatedFeatures = formik.values.features.filter(
                          (_, i) => i !== index,
                        );
                        formik.setFieldValue("features", updatedFeatures);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <FieldError
                  error={formik.errors.features?.[index]}
                  touched={formik.touched.features?.[index]}
                />
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-400 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() =>
                formik.setFieldValue("features", [
                  ...formik.values.features,
                  "",
                ])
              }
            >
              + Add Feature
            </button>
          </div>

          {/* Tags */}
          <div className="p-1 mt-2">
            <label className="mb-1 text-gray-600 block">Tags</label>

            {formik.values.tags.map((tag, index) => (
              <div key={index} className="mb-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="enter tag (eg: electronics)"
                    name={`tags[${index}]`}
                    className="w-full outline-blue-400 p-1 border rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={tag}
                  />

                  {formik.values.tags.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer shrink-0"
                      onClick={() => {
                        const updatedTags = formik.values.tags.filter(
                          (_, i) => i !== index,
                        );
                        formik.setFieldValue("tags", updatedTags);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <FieldError
                  error={formik.errors.tags?.[index]}
                  touched={formik.touched.tags?.[index]}
                />
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-400 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() =>
                formik.setFieldValue("tags", [...formik.values.tags, ""])
              }
            >
              + Add Tag
            </button>
          </div>
          <div className="w-full p-1 mt-2">
            <button
              type="submit"
              className="text-white w-full bg-blue-400 p-1 rounded cursor-pointer"
              disabled={isLoading || isEditLoading}
            >
              {isEditMode
                ? isEditLoading
                  ? "Updating..."
                  : "Update"
                : isLoading
                  ? "Submitting..."
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
