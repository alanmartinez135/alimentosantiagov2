
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import OrderHistory from "@/components/Profile/OrderHistory";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-burgundy-800 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tus pedidos y preferencias</p>
          </div>
          
          <Button
            variant="outline"
            onClick={logout}
            className="border-burgundy-700 text-burgundy-700 hover:bg-burgundy-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-burgundy-100 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-burgundy-700" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Información de Contacto</h3>
                  <p className="text-sm text-gray-500">
                    Email: {user.email}
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Preferencias</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span>Notificaciones por email</span>
                    <span className="text-burgundy-700">Activado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <OrderHistory userId={user.id} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
