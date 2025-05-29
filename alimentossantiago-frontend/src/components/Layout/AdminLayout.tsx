import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Pedidos", to: "/admin/ordenes" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-burgundy-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">Panel de Admin</h1>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                location.pathname === link.to
                  ? "bg-burgundy-600 font-semibold"
                  : "hover:bg-burgundy-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 bg-burgundy-600 hover:bg-burgundy-700 text-white py-2 px-4 rounded text-sm"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
