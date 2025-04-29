// src/pages/MenuPage.tsx
import { useAuth } from "@/context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/components/Layout/MainLayout";
import MenuList from "@/components/Menu/MenuList";

// Función para obtener los elementos del menú desde la API
const fetchMenuItems = async () => {
  const response = await fetch("http://localhost:3001/menuItems");
  if (!response.ok) {
    throw new Error("Error al cargar los elementos del menú");
  }
  return response.json();
};

const MenuPage = () => {
  const { user } = useAuth(); // 🔥 Traemos el usuario logueado
  const queryClient = useQueryClient();

  const { data: menuItems, error, isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  const refreshMenuItems = () => {
    queryClient.invalidateQueries({ queryKey: ["menuItems"] });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          Cargando menú...
        </div>
      </MainLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center text-red-500">
          Error: {error.message}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Título y descripción */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-burgundy-800 mb-2">Nuestro Menú</h1>
          <p className="text-gray-600">
            Explora nuestra selección de platillos gourmet, preparados con ingredientes frescos y de la mejor calidad.
          </p>
        </div>
        {/* Lista de platos para todos los usuarios */}
        <MenuList items={menuItems} />
      </div>
    </MainLayout>
  );
};

export default MenuPage;
