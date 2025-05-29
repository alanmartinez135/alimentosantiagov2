import { useEffect, useState } from "react";
import { Order } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/Layout/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const API_URL = "http://localhost:3001";

const estadoLabel = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  entregado: "Entregado",
  cancelado: "Cancelado",
} as const;

const estadoColor = {
  pendiente: "bg-yellow-200 text-yellow-800",
  confirmado: "bg-blue-200 text-blue-800",
  entregado: "bg-green-200 text-green-800",
  cancelado: "bg-red-200 text-red-800",
} as const;

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    fetchOrders();
  }, [user]);

const fetchOrders = async () => {
  setLoading(true);
  try {
    const [ordersRes, menuItemsRes] = await Promise.all([
      fetch(`${API_URL}/orders`),
      fetch(`${API_URL}/menuItems`)
    ]);

    const [ordersData, menuItemsData] = await Promise.all([
      ordersRes.json(),
      menuItemsRes.json()
    ]);

    // Enlazar cada item con el objeto menuItem completo
    const enrichedOrders = ordersData.map((order: Order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        menuItem: menuItemsData.find((m) => m.id === item.menuItemId)
      }))
    }));

    setOrders(enrichedOrders);
  } catch (err) {
    console.error("Error cargando pedidos", err);
  } finally {
    setLoading(false);
  }
};

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Error al actualizar el pedido");

      toast({
        title: "Estado actualizado",
        description: `Pedido #${orderId.slice(-4)} ahora está ${estadoLabel[newStatus as keyof typeof estadoLabel]}`,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error al actualizar pedido", err);
      toast({
        title: "Error",
        description: "No se pudo actualizar el pedido",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (!user || !user.isAdmin) return <p>Acceso denegado</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-md bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Pedido #{order.id.slice(-4)}</p>
                  <p className="text-sm text-gray-500">Usuario: {order.userId}</p>
                  <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                  <p className="text-sm text-gray-500">Total: ${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Entrega: {order.deliveryMethod === "pickup" ? "Retiro en tienda" : "Envío a domicilio"}</p>
                  <Badge className={`mt-2 ${estadoColor[order.status]}`}>
                    {estadoLabel[order.status]}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                    disabled={updating === order.id}
                  >
                    <SelectTrigger className="w-[160px]">
                      {updating === order.id ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <span>{estadoLabel[order.status]}</span>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="confirmado">Confirmado</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Platos:</p>
                <ul className="list-disc list-inside space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.menuItem?.name || item.menuItemId} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
