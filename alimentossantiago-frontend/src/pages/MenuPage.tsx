import MenuItemForm from "@/components/admin/MenuItemForm";  //
import MainLayout from "@/components/Layout/MainLayout";
import MenuList from "@/components/Menu/MenuList";
import { useQuery, useQueryClient } from "@tanstack/react-query";  // Importar useQueryClient para refrescar caché

// Función para obtener los elementos del menú desde la API
const fetchMenuItems = async () => {
  const response = await fetch("http://localhost:3001/menuItems");
  if (!response.ok) {
    throw new Error("Error al cargar los elementos del menú");
  }
  return response.json();
};

const MenuPage = () => {
  const queryClient = useQueryClient();  // Usar para refrescar la caché cuando se actualizan los datos

  // Usar React Query para obtener los elementos del menú
  const { data: menuItems, error, isLoading } = useQuery({
    queryKey: ["menuItems"],  // Correcta especificación de la queryKey
    queryFn: fetchMenuItems,  // Función para obtener los datos
  });

  // Función para refrescar los datos del menú
  const refreshMenuItems = () => {
    queryClient.invalidateQueries({ queryKey: ["menuItems"] });
  };

  // Manejar el estado de carga y error
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-burgundy-800 mb-2">Nuestro Menú</h1>
          <p className="text-gray-600">
            Explora nuestra selección de platillos gourmet, preparados con ingredientes frescos y de la mejor calidad.
          </p>
        </div>
  
        {/* Formulario para agregar nuevos platos */}
        <MenuItemForm onCreated={refreshMenuItems} />
  
        {/* Lista del menú */}
        <MenuList items={menuItems} />
      </div>
    </MainLayout>
  );
  
};

export default MenuPage;
