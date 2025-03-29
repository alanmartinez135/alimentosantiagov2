
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { sampleOrders } from "@/lib/data";

type OrderContextType = {
  orders: Order[];
  createOrder: (items: CartItem[], total: number, deliveryMethod: "pickup" | "delivery", deliveryAddress?: string) => Promise<Order>;
  getPreviousOrders: () => Order[];
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load orders from localStorage or use sample data if available
  useEffect(() => {
    if (!user) return;

    const storedOrders = localStorage.getItem(`orders_${user.id}`);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Error parsing orders from localStorage", e);
        // Fallback to sample orders
        setOrders(sampleOrders.filter(order => order.userId === user.id));
      }
    } else {
      // Use sample orders for demo
      setOrders(sampleOrders.filter(order => order.userId === user.id));
    }
  }, [user]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
  }, [orders, user]);

  const createOrder = async (
    items: CartItem[], 
    total: number, 
    deliveryMethod: "pickup" | "delivery", 
    deliveryAddress?: string
  ): Promise<Order> => {
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      items,
      total,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      deliveryMethod,
      deliveryAddress
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);

    toast({
      title: "Pedido creado",
      description: `Tu pedido #${newOrder.id.slice(-4)} ha sido recibido`,
      variant: "default",
    });

    return newOrder;
  };

  const getPreviousOrders = (): Order[] => {
    if (!user) return [];
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getPreviousOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
