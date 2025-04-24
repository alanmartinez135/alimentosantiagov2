
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

const CartSummary = ({ showCheckoutButton = true }: CartSummaryProps) => {
  const { totalPrice, totalItems } = useCart();
  
  const subtotal = totalPrice;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del pedido</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Impuestos (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-2 mt-2 border-t border-gray-200">
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span className="text-burgundy-800">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {showCheckoutButton && (
        <div className="mt-6">
          <Link to="/checkout">
            <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800">
              Proceder al pago
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
