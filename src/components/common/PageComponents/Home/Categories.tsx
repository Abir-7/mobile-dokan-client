import { useGetAllProductQuery } from "../../../../redux/api/productApi/productApi";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Categories = () => {
  const { data, isLoading, isError } = useGetAllProductQuery("");

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Failed to load categories.</div>;
  }

  const categories = data?.data?.uniqueBrand || [];

  return (
    <section className="categories py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Browse Categories
        </h2>
        {categories.length > 0 ? (
          <Swiper
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {categories.map((category: string) => (
              <SwiperSlide key={category}>
                <button className="btn btn-outline w-full text-center py-4">
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>No categories available.</div>
        )}
      </div>
    </section>
  );
};

export default Categories;
