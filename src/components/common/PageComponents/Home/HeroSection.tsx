import banner from "../../../../assets/banner.jpg";

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Displaying the responsive image */}
      <img
        src={banner}
        alt="Hero Banner"
        className="w-full h-auto max-h-[600px] object-cover"
      />
    </section>
  );
};

export default HeroSection;
