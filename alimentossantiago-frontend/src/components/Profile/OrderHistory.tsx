
import { useOrder } from "@/context/OrderContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Clock, MapPin, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OrderHistory = () => {
  const { getPreviousOrders } = useOrder();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const orders = getPreviousOrders();

  const handleReorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    order.items.forEach(item => {
      addItem(item.menuItem);
    });
    
    toast({
      title: "Artículos agregados al carrito",
      description: "Los productos han sido añadidos a tu carrito",
      variant: "default",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregado";
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-burgundy-800">Historial de Pedidos</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No tienes pedidos anteriores</h3>
          <p className="text-gray-500 mt-1">Cuando realices un pedido, aparecerá aquí.</p>
          <Button asChild className="mt-4 bg-burgundy-700 hover:bg-burgundy-800">
            <a href="/menu">Explorar Menú</a>
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {orders.map((order, index) => (
            <AccordionItem 
              key={order.id} 
              value={order.id}
              className="border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                <div className="flex flex-1 justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <span className="font-medium text-burgundy-800">
                        Pedido #{order.id.slice(-4)}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 py-4 border-t">
                <div className="space-y-4">
                  {/* Order items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="h-12 w-12 rounded overflow-hidden mr-3">
                          <img 
                            src={item.menuItem.image} 
                            alt={item.menuItem.name}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.menuItem.name}</p>
                          <p className="text-sm text-gray-500">
                            ${item.menuItem.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery method */}
                  <div className="text-sm bg-gray-50 p-3 rounded">
                    <div className="flex items-center mb-1 font-medium">
                      <MapPin className="h-4 w-4 mr-1 text-burgundy-700" />
                      {order.deliveryMethod === "delivery" ? "Entrega a domicilio" : "Retiro en tienda"}
                    </div>
                    {order.deliveryAddress && (
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    )}
                  </div>
                  
                  {/* Reorder button */}
                  <Button 
                    className="w-full bg-burgundy-700 hover:bg-burgundy-800 mt-2"
                    onClick={() => handleReorder(order.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Volver a pedir
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default OrderHistory;
