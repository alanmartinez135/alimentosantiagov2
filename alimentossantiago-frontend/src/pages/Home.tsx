import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import HeroSection from "@/components/Home/HeroSection";
import FeaturedDishes from "@/components/Home/FeaturedDishes";
import PromoSection from "@/components/Home/PromoSection";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);  // Estado para los items del menú

  useEffect(() => {
    fetch("/api/menuItems")
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error al cargar los items del menú", err));
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <FeaturedDishes items={menuItems} />
      <PromoSection />
    </MainLayout>
  );
};

export default Home;
