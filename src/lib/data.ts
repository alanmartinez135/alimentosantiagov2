import { MenuItem, Order } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Risotto de Funghi Porcini",
    description: "Risotto cremoso con hongos porcini, aceite de trufa y queso parmesano.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c7?q=80&w=1000&auto=format&fit=crop",
    category: "platos-principales",
    tags: ["vegetariano", "italiano"],
    rating: 4.8,
    stock: 15,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "María García",
        rating: 5,
        comment: "¡Increíble sabor! Definitivamente volveré por más.",
        date: "2023-10-15"
      }
    ]
  },
  {
    id: "2",
    name: "Filete de Res al Vino Tinto",
    description: "Filete de res premium cocinado al punto, servido con reducción de vino tinto y puré de papas trufado.",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop",
    category: "platos-principales",
    tags: ["carne", "gourmet"],
    rating: 4.9,
    stock: 10,
    reviews: [
      {
        id: "r2",
        userId: "u2",
        userName: "Carlos Rodríguez",
        rating: 5,
        comment: "La carne estaba perfectamente cocinada. Una delicia.",
        date: "2023-09-20"
      }
    ]
  },
  {
    id: "3",
    name: "Pasta Negra con Frutos del Mar",
    description: "Pasta de tinta de calamar con camarones, mejillones y calamares en salsa de vino blanco.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
    category: "platos-principales",
    tags: ["mariscos", "pasta"],
    rating: 4.7,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Ana Martínez",
        rating: 4,
        comment: "Excelente mezcla de sabores. Los mariscos muy frescos.",
        date: "2023-11-05"
      }
    ]
  },
  {
    id: "4",
    name: "Ensalada Burrata",
    description: "Tomates heirloom, burrata fresca, albahaca, reducción de balsámico y aceite de oliva premium.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1000&auto=format&fit=crop",
    category: "entrantes",
    tags: ["vegetariano", "fresco"],
    rating: 4.6,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Laura Sánchez",
        rating: 5,
        comment: "La burrata es increíblemente cremosa. Deliciosa combinación.",
        date: "2023-10-28"
      }
    ]
  },
  {
    id: "5",
    name: "Souffle de Chocolate",
    description: "Soufflé de chocolate negro con corazón líquido e helado de vainilla bourbon.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1000&auto=format&fit=crop",
    category: "postres",
    tags: ["chocolate", "caliente"],
    rating: 4.9,
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Pedro Gómez",
        rating: 5,
        comment: "El mejor soufflé que he probado. Perfecto balance entre dulce y amargo.",
        date: "2023-11-10"
      }
    ]
  },
  {
    id: "6",
    name: "Ceviche de Camarones",
    description: "Camarones frescos marinados en limón con cebolla roja, cilantro, maíz cancha y batata.",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1533308642793-78be57c1a8d5?q=80&w=1000&auto=format&fit=crop",
    category: "entrantes",
    tags: ["mariscos", "fresco", "cítrico"],
    rating: 4.7,
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Sofía Torres",
        rating: 4,
        comment: "Muy refrescante y sabroso. Los camarones estaban perfectos.",
        date: "2023-09-15"
      }
    ]
  }
];

export const sampleOrders: Order[] = [
  {
    id: "o1",
    userId: "u1",
    items: [
      {
        id: "ci1",
        menuItem: menuItems[0],
        quantity: 1
      },
      {
        id: "ci2",
        menuItem: menuItems[3],
        quantity: 1
      }
    ],
    total: 33.49,
    status: "delivered",
    date: "2023-10-20",
    deliveryMethod: "delivery",
    deliveryAddress: "Av. Principal 123"
  },
  {
    id: "o2",
    userId: "u1",
    items: [
      {
        id: "ci3",
        menuItem: menuItems[1],
        quantity: 2
      },
      {
        id: "ci4",
        menuItem: menuItems[4],
        quantity: 2
      }
    ],
    total: 79.96,
    status: "delivered",
    date: "2023-11-05",
    deliveryMethod: "pickup"
  }
];
