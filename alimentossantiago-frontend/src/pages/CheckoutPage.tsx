import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import CartSummary from "@/components/Cart/CartSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useToast } from "@/components/ui/use-toast";
import { Home, MapPin } from "lucide-react";
import DeliveryMap from "@/components/Map/DeliveryMap";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const { toast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/carrito");
    }
  }, [items, navigate]);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Debes iniciar sesión para completar tu compra",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    toast({
      title: "Error",
      description: "Debes iniciar sesión para completar tu compra",
      variant: "destructive",
    });
    return;
  }

  setIsProcessing(true);

  try {
    // 1. Guardar pedido en backend
    const createOrderResponse = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        items,
        total: totalPrice,
        status: "pending",
        date: new Date().toISOString(),
        deliveryMethod,
        deliveryAddress: deliveryMethod === "delivery" ? address : undefined,
      }),
    });

    if (!createOrderResponse.ok) {
      throw new Error("No se pudo guardar el pedido");
    }

    const savedOrder = await createOrderResponse.json();

    // 2. Crear preferencia en MercadoPago
    const paymentResponse = await fetch("http://localhost:3001/api/crear-preferencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          nombre: item.menuItem.name,
          precio: item.menuItem.price,
          cantidad: item.quantity,
        })),
        usuarioEmail: user.email,
        orderId: savedOrder.id,
      }),
    });

    const data = await paymentResponse.json();

    if (!data || !data.init_point) {
      throw new Error("No se recibió el link de pago");
    }

    // 3. Redirigir a MercadoPago
    window.location.href = data.init_point;

  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "No se pudo procesar el pago",
      variant: "destructive",
    });
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-burgundy-800 mb-2">Finalizar compra</h1>
          <p className="text-gray-600">Complete los detalles a continuación para procesar su pedido.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">Método de entrega</h2>

                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={(value) => setDeliveryMethod(value as "pickup" | "delivery")}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-grow cursor-pointer">
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-2 text-burgundy-700" />
                        <div>
                          <span className="font-medium">Retiro en tienda</span>
                          <p className="text-sm text-gray-500">Recoge tu pedido en nuestro local</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-grow cursor-pointer">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-burgundy-700" />
                        <div>
                          <span className="font-medium">Envío a domicilio</span>
                          <p className="text-sm text-gray-500">Recibe tu pedido donde estés</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryMethod === "delivery" && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border-t">
                      <Label htmlFor="address" className="block mb-2">
                        Dirección de entrega
                      </Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ingresa tu dirección completa"
                        required
                      />
                    </div>
                    <DeliveryMap />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-burgundy-700 hover:bg-burgundy-800"
                disabled={isProcessing}
              >
                {isProcessing ? "Redirigiendo a Mercado Pago..." : "Pagar con Mercado Pago"}
              </Button>
            </form>
          </div>

          <div className="md:w-1/3">
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
