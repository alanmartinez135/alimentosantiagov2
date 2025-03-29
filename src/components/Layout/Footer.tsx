
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-burgundy-950 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Alimentos Santiago</h3>
            <p className="text-gray-300">
              Disfruta de la auténtica cocina gourmet con sabores únicos y 
              presentaciones exquisitas. Nos esforzamos por ofrecerte una experiencia 
              culinaria inolvidable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors">
                  Menú
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="text-gray-300 hover:text-white transition-colors">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="text-gray-300 hover:text-white transition-colors">
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <p className="text-gray-300 mb-2">Av. Gastronómica 123, Santiago</p>
            <p className="text-gray-300 mb-2">Teléfono: +56 2 2345 6789</p>
            <p className="text-gray-300 mb-4">Email: info@alimentossantiago.cl</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-burgundy-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-burgundy-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-burgundy-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-burgundy-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Alimentos Santiago. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
