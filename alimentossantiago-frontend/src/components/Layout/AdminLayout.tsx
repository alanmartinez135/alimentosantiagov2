import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-burgundy-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-4 flex-grow">
          <a href="/admin" className="hover:underline">Dashboard</a>
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-burgundy-600 hover:bg-burgundy-700 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
