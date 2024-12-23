import { useState, useMemo } from "react";
import ProductFilter from "../../components/common/PageComponents/ProductPage/ProductFilter";
import ProductCard from "../../components/common/PageComponents/ProductPage/ProductCard/ProductCard";
import { useGetAllProductQuery } from "../../redux/api/productApi/productApi";
import { IProduct } from "../../interface/product.interface";

const ProductsPage = () => {
  const { data, error, isLoading } = useGetAllProductQuery("");

  const [filters, setFilters] = useState({
    search: "",
    sort: "",
    category: "",
    brand: "",
  });
  console.log(data);
  const filteredProducts = useMemo(() => {
    if (!data?.data?.products) return [];

    return data.data.products
      .filter((product: IProduct) => {
        let isValid = true;

        // Filter by search (case-insensitive)
        if (
          filters.search &&
          !product.model.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          isValid = false;
        }

        // Filter by category (case-insensitive)
        if (
          filters.category &&
          product.category.toLowerCase() !== filters.category.toLowerCase()
        ) {
          isValid = false;
        }

        // Filter by brand (case-insensitive)
        if (
          filters.brand &&
          product.brand.toLowerCase() !== filters.brand.toLowerCase()
        ) {
          isValid = false;
        }

        return isValid;
      })
      .sort(
        (
          a: { variants: { price: number }[] },
          b: { variants: { price: number }[] }
        ) => {
          if (filters.sort === "asc") {
            return a.variants[0].price - b.variants[0].price;
          } else if (filters.sort === "desc") {
            return b.variants[0].price - a.variants[0].price;
          }
          return 0;
        }
      );
  }, [data, filters]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <ProductFilter
        brands={data?.data?.uniqueBrand}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
