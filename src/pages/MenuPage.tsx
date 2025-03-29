
import MainLayout from "@/components/Layout/MainLayout";
import MenuList from "@/components/Menu/MenuList";
import { menuItems } from "@/lib/data";

const MenuPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-burgundy-800 mb-2">Nuestro Menú</h1>
          <p className="text-gray-600">
            Explora nuestra selección de platillos gourmet, preparados con ingredientes frescos y de la mejor calidad.
          </p>
        </div>

        <MenuList items={menuItems} />
      </div>
    </MainLayout>
  );
};

export default MenuPage;
