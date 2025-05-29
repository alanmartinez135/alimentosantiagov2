import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import simpleRestProvider from 'ra-data-simple-rest';
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import AdminPage from "./pages/AdminPage";

// Componentes de la app
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import PagoExitoso from "./pages/PagoExitoso";
import PagoFallido from "./pages/PagoFallido";

// Configuración del cliente de React Query
const queryClient = new QueryClient();
const dataProvider = simpleRestProvider('http://localhost:3001');

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} />
              <Route path="/pago-fallido" element={<PagoFallido />} />

            </Routes>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
