
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import CartItemRow from "@/components/Cart/CartItemRow";
import CartSummary from "@/components/Cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { items, clearCart, totalItems } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-burgundy-800">Tu Carrito</h1>
          <p className="text-gray-600">
            {totalItems === 0
              ? "Tu carrito está vacío"
              : `Tienes ${totalItems} ${totalItems === 1 ? "producto" : "productos"} en tu carrito`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 border rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">
              Parece que aún no has agregado nada a tu carrito.
            </p>
            <Button asChild className="bg-burgundy-700 hover:bg-burgundy-800">
              <Link to="/menu">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Explorar Menú
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-grow">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="font-medium">Productos</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Vaciar Carrito
                  </Button>
                </div>

                <div className="divide-y px-4">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>

                <div className="p-4 border-t bg-gray-50">
                  <Link to="/menu" className="text-burgundy-700 hover:text-burgundy-800 inline-flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
