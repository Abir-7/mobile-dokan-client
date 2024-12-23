import { Link } from "react-router-dom";
import { IProduct } from "../../../../interface/product.interface";
import { useGetProductByAvarageRatingQuery } from "../../../../redux/api/productApi/productApi";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useGetProductByAvarageRatingQuery("");

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        Failed to load products
      </div>
    );
  }

  const products = data?.data as IProduct[];

  return (
    <section className="featured-products py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <figure className="relative h-48">
                <img
                  src={product.image[0] || "https://via.placeholder.com/300"}
                  alt={`${product.brand} ${product.model}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">
                  {product.brand} {product.model}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Price: ${product.variants[0]?.price.toFixed(2)}
                </p>
                <p className="text-yellow-500 text-sm mb-2">
                  Rating: {product.ratings.average.toFixed(1)} (
                  {product.ratings.count} reviews)
                </p>
                <Link
                  to={`/products/${product?._id}`}
                  className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
