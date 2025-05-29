// src/pages/AdminPage.tsx
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItemForm from "@/components/admin/MenuItemForm";
import MenuItemList from "@/components/admin/MenuItemList";
import AdminLayout from "@/components/Layout/AdminLayout"; // 👈 Nuevo Layout
import { MenuItem } from "@/types";

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.isAdmin) {
      navigate("/");
    } else {
      fetchMenuItems();
    }
  }, [user, navigate]);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/menuItems");
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error cargando los platos", error);
    }
  };

  const handleItemCreated = () => {
    console.log("Nuevo plato creado!");
    fetchMenuItems();
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {/* Formulario para crear nuevo plato */}
      <MenuItemForm onCreated={handleItemCreated} />

      {/* Lista de platos */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Platos existentes</h2>
        <MenuItemList menuItems={menuItems} onUpdated={fetchMenuItems} />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
