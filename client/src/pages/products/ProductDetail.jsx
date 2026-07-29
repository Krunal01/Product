import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Btn from "../../components/Btn";
import { useGetProductByIdQuery } from "../../redux/apis/productApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);

  const product = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-xl font-medium text-gray-600 animate-pulse">
          Loading product details...
        </h1>
      </div>
    );
  }
  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">
        <h1 className="text-xl text-red-500 font-semibold">
          {error?.data?.message} or failed to load!
        </h1>
        <Btn
          title="Back to Products"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        />
      </div>
    );
  }

  const finalPrice = product.discountPrice
    ? product.price - product.discountPrice
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Top Header Navigation */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <Btn
          title="← Back to Home"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded"
          onClick={() => navigate("/")}
        />
        <div className="text-sm text-gray-500 uppercase font-medium">
          {product.category} &gt; {product.subCategory}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl border shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden border flex items-center justify-center relative">
              {product.productImageUrl ? (
                <img
                  src={product.productImageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="text-gray-400 font-medium">
                  No Image Available
                </div>
              )}

              {/* Discount Badge */}
              {product.discountPrice > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  SAVE {product.currency} {product.discountPrice}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Key Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand Tag */}
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                {product.brand}
              </span>

              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-gray-600 text-sm mb-4 italic">
                  "{product.shortDescription}"
                </p>
              )}

              {/* Price Section */}
              <div className="flex items-baseline gap-3 my-4 p-3 bg-gray-50 rounded-lg border">
                <span className="text-3xl font-extrabold text-gray-900">
                  {product.currency} {finalPrice.toLocaleString()}
                </span>
                {product.discountPrice > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.currency} {product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded border"
                      >
                        <span className="text-green-500 mr-2 font-bold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Timestamps Info */}
            <div className="mt-6 pt-4 border-t text-xs text-gray-400 flex justify-between">
              <span>
                Added on: {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <span>ID: {product._id}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Description & Specifications */}
        <div className="mt-10 pt-8 border-t grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Description */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {product.description || "No full description available."}
            </p>
          </div>

          {/* Specifications Table */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Specifications
            </h2>
            {product.specifications && product.specifications.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-2 border-b">Feature</th>
                      <th className="px-4 py-2 border-b">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 border-b font-medium text-gray-700">
                          {spec.key}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No specifications provided.
              </p>
            )}
          </div>
        </div>

        {/* Tags Section */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full border transition cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
