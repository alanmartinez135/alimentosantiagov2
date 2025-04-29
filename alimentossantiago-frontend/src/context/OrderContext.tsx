import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:3001";

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}/orders?userId=${user.id}`);
        if (!response.ok) throw new Error('No se pudo obtener los pedidos');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar los pedidos", error);
      }
    };

    fetchOrders();
  }, [user]);

  const createOrder = async (
    items: CartItem[],
    total: number,
    deliveryMethod: "pickup" | "delivery",
    deliveryAddress?: string
  ): Promise<Order> => {
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

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

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) throw new Error('Error al crear el pedido');

      const createdOrder = await response.json();
      setOrders(prev => [...prev, createdOrder]);

      toast({
        title: "Pedido creado",
        description: `Tu pedido #${createdOrder.id.slice(-4)} ha sido recibido`,
        variant: "default",
      });

      return createdOrder;
    } catch (error) {
      console.error("Error al crear el pedido", error);
      throw error;
    }
  };

  const getPreviousOrders = (): Order[] => {
    if (!user) return [];
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getPreviousOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
