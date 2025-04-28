import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import HeroSection from "@/components/Home/HeroSection";
import FeaturedDishes from "@/components/Home/FeaturedDishes";
import PromoSection from "@/components/Home/PromoSection";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);  // Estado para los items del menú

  useEffect(() => {
    // Hacer la solicitud fetch a express para obtener los elementos del menú
    fetch("http://localhost:3001/menuItems")  
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error al cargar los items del menú", error));
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
