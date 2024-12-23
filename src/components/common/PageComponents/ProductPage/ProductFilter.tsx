import React from "react";

interface Filters {
  search: string;
  sort: string;
  category: string;
  brand: string;
}

interface ProductFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  brands: string[] | [];
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  brands = [],
  filters,
  setFilters,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by product name"
        className="input input-bordered"
      />
      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
        className="select select-bordered"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      {/* <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="select select-bordered"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
      </select> */}
      <select
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        className="select select-bordered"
      >
        <option value="">All Brands</option>
        {brands.map((brand: string) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
