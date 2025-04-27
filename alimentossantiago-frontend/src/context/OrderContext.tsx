import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:3000";  // 

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

  // Cargar los pedidos desde json-server
  useEffect(() => {
    if (!user) return;

    // Llamada a json-server para obtener los pedidos
    fetch(`${API_URL}/orders?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error al cargar los pedidos", error);
      });
  }, [user]);

  // Guardar los pedidos en express cuando cambian
  useEffect(() => {
    if (!user) return;

    // Guardar los pedidos en json-server
    orders.forEach((order) => {
      fetch(`${API_URL}/orders/${order.id}`, {
        method: "PUT", // Utilizamos PUT para actualizar los pedidos
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }).catch((error) => console.error("Error al guardar el pedido", error));
    });
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

    // Simular un retraso en la llamada API
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

    // Enviar la nueva orden al servidor json-server
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",  // Usamos POST para crear una nueva orden
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    const createdOrder = await response.json();

    setOrders(prevOrders => [...prevOrders, createdOrder]);

    toast({
      title: "Pedido creado",
      description: `Tu pedido #${createdOrder.id.slice(-4)} ha sido recibido`,
      variant: "default",
    });

    return createdOrder;
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
