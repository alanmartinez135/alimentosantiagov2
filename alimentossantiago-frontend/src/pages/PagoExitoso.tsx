import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/Layout/MainLayout";

export default function PagoExitoso() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-green-700">¡Pago realizado con éxito!</h1>
        <p className="mt-4">Gracias por tu compra. Tu pedido está siendo procesado.</p>

        <div className="mt-8">
          <Button onClick={() => navigate("/perfil")} className="bg-burgundy-700 hover:bg-burgundy-800">
            Volver a mi perfil
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
