import Categories from "../../components/common/PageComponents/Home/Categories";
import ContactInfo from "../../components/common/PageComponents/Home/ContactInfo";
import FAQs from "../../components/common/PageComponents/Home/FAQs";
import FeaturedProducts from "../../components/common/PageComponents/Home/FeaturedProducts";
import HeroSection from "../../components/common/PageComponents/Home/HeroSection";
import Testimonials from "../../components/common/PageComponents/Home/Testimonials";

const Home = () => {
  return (
    <div className="space-y-1">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Testimonials />

      <FAQs />
      <ContactInfo />
    </div>
  );
};

export default Home;
