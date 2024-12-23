import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      email: "john.doe@example.com",
      comment: "The quality of the products exceeded my expectations!",
      rating: 5,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      email: "jane.smith@example.com",
      comment: "Quick delivery and excellent customer service.",
      rating: 4,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      email: "sam.wilson@example.com",
      comment: "Affordable prices and a wide range of choices.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="carousel w-full">
          {testimonials.map(({ id, image, email, comment, rating }) => (
            <div
              key={id}
              id={`slide${id}`}
              className="carousel-item w-full flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
            >
              <img
                src={image}
                alt={`User ${id}`}
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="italic text-gray-600">{`"${comment}"`}</p>
              <p className="font-bold mt-4">{email}</p>
              <div className="flex mt-2">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-xl">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Carousel Navigation */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map(({ id }) => (
            <a
              key={id}
              href={`#slide${id}`}
              className="btn btn-sm btn-circle btn-outline"
            >
              {id}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
