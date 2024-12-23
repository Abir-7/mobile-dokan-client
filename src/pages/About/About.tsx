import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        About Us
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Welcome to Your Mobile Shop!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          At Your Mobile Shop, we are passionate about bringing the latest
          smartphones and mobile accessories to your doorstep. With a vast
          selection of top brands and the latest models, we aim to provide our
          customers with the best mobile shopping experience possible.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Whether you're looking for a budget-friendly option, a high-end
          device, or the newest release from your favorite brand, we have you
          covered. Our team is dedicated to offering top-notch customer service,
          quick delivery, and secure payment options to ensure that you have a
          smooth shopping experience every time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is simple: to make mobile shopping easy, reliable, and
          enjoyable. We strive to offer the best products at competitive prices,
          ensuring that our customers have access to the most cutting-edge
          mobile technology available.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          We believe that your mobile device is more than just a phone—it's a
          tool that connects you to the world. That's why we focus on providing
          high-quality products that help you stay connected, productive, and
          entertained on the go.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Our Promise
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          We promise to deliver exceptional value with every purchase. We are
          committed to providing excellent customer support and offering a
          hassle-free return policy. Your satisfaction is our priority, and we
          are here to assist you with any questions or concerns you may have
          about your purchase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Have any questions? Feel free to reach out to our customer service
          team, and we'll be happy to assist you. We're here to make your mobile
          shopping experience the best it can be!
        </p>
      </section>
    </div>
  );
};

export default About;
