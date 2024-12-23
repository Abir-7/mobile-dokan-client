import { Link } from "react-router-dom";
import { IProduct } from "../../../../../interface/product.interface";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { brand, model, variants, ratings, _id, image } = product;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-full h-56 bg-gray-100">
        <img
          src={image[0] || "/default-product.jpg"} // Fallback image for better UX
          alt={model}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
          ⭐ {ratings.average.toFixed(1)}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/products/${_id}`} className="block mb-2 hover:underline">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {brand} {model}
          </h2>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            ${variants[0]?.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-600">
            ({ratings.count} reviews)
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t p-4 text-center">
        <Link
          to={`/products/${_id}`}
          className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
