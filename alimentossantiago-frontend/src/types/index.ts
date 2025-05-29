export interface User {
  id: string;
  email: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: Review[];
  stock: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface OrderItem {
  id?: string; // opcional para permitir items simples
  menuItem?: MenuItem;
  menuItemId?: string; // usado al guardar solo la referencia
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled" | "preparing";
  date: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
}