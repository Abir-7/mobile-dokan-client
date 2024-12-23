import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductByIdQuery } from "../../redux/api/productApi/productApi";
import { IProduct, IVariant } from "../../interface/product.interface";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });

  const product: IProduct = data?.data; // Extract product data from API response

  // State for selected variant and image
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Set default values once the product data is loaded
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      setSelectedImage(product.image[0]); // Default to the first image
    }
  }, [product]);

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error || !product) return <div>Error loading product details.</div>;

  // Handle variant selection
  const handleVariantSelect = (variantId: string) => {
    const variant = product.variants.find((v) => v._id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  // Handle thumbnail image selection
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Image Section */}
      <div className="flex justify-center mb-6">
        <img
          src={selectedImage || "/default-product.jpg"} // Default image if none is selected
          alt={product.model}
          className="w-80 h-80 object-cover rounded-lg"
        />
      </div>

      {/* Thumbnails Section */}
      <div className="flex justify-center space-x-4 mb-6">
        {product.image.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-300"
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>

      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {product.brand} - {product.model}
      </h1>

      {/* Variant Options */}
      <div className="flex justify-center space-x-4 mb-6">
        {product.variants.map((variant) => (
          <button
            key={variant._id}
            onClick={() => handleVariantSelect(variant._id)}
            className={`px-6 py-2 border rounded-lg ${
              selectedVariant?._id === variant._id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {variant.ram}/{variant.storage}
          </button>
        ))}
      </div>

      {/* Variant and Product Details Section */}
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold">Storage</td>
                <td className="px-4 py-2">{selectedVariant?.storage}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">RAM</td>
                <td className="px-4 py-2">{selectedVariant?.ram}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Colors</td>
                <td className="px-4 py-2">
                  {selectedVariant?.color.join(", ")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Price</td>
                <td className="px-4 py-2">
                  ${selectedVariant?.price.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Stock Quantity</td>
                <td className="px-4 py-2">{selectedVariant?.stockQuantity}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Screen Size</td>
                <td className="px-4 py-2">{product.features.screenSize}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Battery</td>
                <td className="px-4 py-2">{product.features.battery}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Camera</td>
                <td className="px-4 py-2">{product.features.camera}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Processor</td>
                <td className="px-4 py-2">{product.features.processor}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Operating System</td>
                <td className="px-4 py-2">{product.features.os}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
