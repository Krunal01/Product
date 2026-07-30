import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout, showError, successToast } from "../utils/global";
import Btn from "../components/Btn";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/apis/productApi";

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Safely extract products array from response payload
  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-medium text-gray-600 animate-pulse">
          Loading products, please wait...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-xl text-red-500 font-semibold">
          Failed to load products!
        </h1>
        <Btn title="Refresh Page" onClick={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg shadow-sm border mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Dashboard</h1>

        <div className="flex flex-wrap items-center gap-2">
          <Btn
            title="My Profile"
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded"
            onClick={() => navigate("/my-profile")}
          />
          {user?.role === "admin" && (
            <Btn
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded"
              title="Add Product"
              onClick={() => navigate("/add-product")}
            />
          )}
          <Btn
            title="Logout"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded"
            onClick={() => handleLogout()}
          />
        </div>
      </div>

      {/* Product List Section */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const finalPrice = product.discountPrice
              ? product.price - product.discountPrice
              : product.price;

            return (
              <div
                key={product._id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                {/* Product Image Container */}
                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center border-b">
                  {product.productImageUrl ? (
                    <img
                      src={product.productImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm font-medium">
                      No Image Available
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.discountPrice > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      SAVE {product.currency} {product.discountPrice}
                    </span>
                  )}

                  {/* Brand Tag */}
                  <span className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded uppercase">
                    {product.brand}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Path */}
                    <div className="text-xs text-gray-500 mb-1 uppercase font-medium">
                      {product.category} &gt; {product.subCategory}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </h2>

                    {/* Short Description */}
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>

                    {/* Features Badges */}
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Specifications Preview */}
                    {product.specifications &&
                      product.specifications.length > 0 && (
                        <div className="mt-3 pt-2 border-t text-xs text-gray-500 space-y-1">
                          {product.specifications
                            .slice(0, 2)
                            .map((spec, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  {spec.key}:
                                </span>
                                <span>{spec.value}</span>
                              </div>
                            ))}
                        </div>
                      )}
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="mt-4 pt-3 border-t flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {product.currency} {finalPrice.toLocaleString()}
                      </div>
                      {product.discountPrice > 0 && (
                        <div className="text-xs text-gray-400 line-through">
                          {product.currency} {product.price.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition"
                    >
                      View
                    </button>
                  </div>
                  {user?.role === "admin" && (
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => navigate(`/add-product/${product._id}`)}
                        className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium px-3 py-1.5 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const response = await deleteProduct(
                              product._id,
                            ).unwrap();
                            if (
                              response?.success &&
                              response?.statusCode === 200
                            ) {
                              console.log(response);
                              successToast(response?.message);
                            }
                          } catch (error) {
                            showError(error);
                          }
                        }}
                        disabled={isDeleteLoading}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded transition"
                      >
                        {isDeleteLoading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
