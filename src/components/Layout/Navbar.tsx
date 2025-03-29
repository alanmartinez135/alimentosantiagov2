
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserCircle2, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: '/', label: 'Inicio' },
    { to: '/menu', label: 'Menú' },
    { to: user ? '/perfil' : '/login', label: user ? 'Mi Perfil' : 'Iniciar Sesión' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-burgundy-800">Sabor Burdeos</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-8 items-center">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 hover:text-burgundy-700 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-burgundy-700"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="py-4">
                    <h2 className="text-lg font-semibold">Tu Carrito</h2>
                    {totalItems === 0 ? (
                      <p className="text-gray-500 mt-4">Tu carrito está vacío</p>
                    ) : (
                      <div className="mt-4">
                        <Link to="/carrito">
                          <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800">
                            Ver Carrito ({totalItems})
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/carrito" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 hover:text-burgundy-700 py-2 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <Button
                  variant="ghost"
                  className="justify-start px-0 text-gray-700 hover:text-burgundy-700"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
