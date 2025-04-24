
import { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-16 h-16 mr-4 rounded overflow-hidden flex-shrink-0">
        <img 
          src={item.menuItem.image} 
          alt={item.menuItem.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-burgundy-800">{item.menuItem.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.menuItem.description}</p>
        <p className="text-burgundy-700 font-bold mt-1">${item.menuItem.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border rounded-md overflow-hidden mr-4">
          <Button 
            type="button" 
            onClick={handleDecrement}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="px-3">{item.quantity}</span>
          
          <Button 
            type="button" 
            onClick={handleIncrement}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button
          type="button"
          onClick={() => removeItem(item.id)}
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemRow;
