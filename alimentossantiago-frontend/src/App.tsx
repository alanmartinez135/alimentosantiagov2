import { Admin, Resource } from "react-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import simpleRestProvider from 'ra-data-simple-rest';
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

// Componentes de la app
import AdminPanel from "./Admin/AdminPanel";
import MenuItemList from "./Admin/MenuItemList";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

// Configuración del cliente de React Query
const queryClient = new QueryClient();

// DataProvider apuntando a tu backend JSON

const dataProvider = simpleRestProvider('http://localhost:3000');

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
              
              {/* Panel de administración */}
              <Route path="/admin" element={
                <Admin dataProvider={dataProvider}>
                  <Resource name="menuItems" list={MenuItemList} />
                </Admin>
              } />
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
