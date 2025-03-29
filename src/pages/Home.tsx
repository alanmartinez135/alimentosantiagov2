
import MainLayout from "@/components/Layout/MainLayout";
import HeroSection from "@/components/Home/HeroSection";
import FeaturedDishes from "@/components/Home/FeaturedDishes";
import PromoSection from "@/components/Home/PromoSection";
import { menuItems } from "@/lib/data";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedDishes items={menuItems} />
      <PromoSection />
    </MainLayout>
  );
};

export default Home;
