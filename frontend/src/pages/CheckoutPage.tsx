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
import { Home, CreditCard, MapPin } from "lucide-react";
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

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = await createOrder(
        items, 
        totalPrice, 
        deliveryMethod,
        deliveryMethod === "delivery" ? address : undefined
      );
      
      clearCart();
      
      toast({
        title: "¡Pedido completado!",
        description: `Tu pedido #${order.id.slice(-4)} ha sido procesado correctamente.`,
        variant: "default",
      });
      
      navigate("/perfil");
    } catch (error) {
      toast({
        title: "Error al procesar el pago",
        description: "Ha ocurrido un error al procesar tu pago. Por favor, intenta de nuevo.",
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

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-burgundy-700" />
                  Información de pago
                </h2>
                
                <p className="text-sm text-yellow-600 mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  Nota: Esta es una demostración. No se procesará ningún pago real.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Número de tarjeta</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-expiry">Fecha de expiración (MM/AA)</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvc">CVC</Label>
                      <Input
                        id="card-cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-burgundy-700 hover:bg-burgundy-800" 
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Completar Pedido"}
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
