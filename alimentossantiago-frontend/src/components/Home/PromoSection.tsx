
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const PromoSection = () => {
  return (
    <section id="promociones" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-burgundy-50 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-burgundy-800 mb-4">
                Promociones Especiales
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                  <div className="flex items-center mb-2">
                    <CalendarDays className="h-5 w-5 text-burgundy-700 mr-2" />
                    <h3 className="text-lg font-bold text-burgundy-700">Martes de Vino</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Todos los martes, 30% de descuento en copas de vino seleccionadas con la compra de cualquier plato principal.
                  </p>
                  <div className="text-sm font-medium text-burgundy-900">
                    Válido cada martes • 18:00 - 22:00
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                  <div className="flex items-center mb-2">
                    <CalendarDays className="h-5 w-5 text-burgundy-700 mr-2" />
                    <h3 className="text-lg font-bold text-burgundy-700">Menú Especial de Fin de Semana</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Prueba nuestro menú degustación de 4 tiempos con postre incluido por solo $40 por persona.
                  </p>
                  <div className="text-sm font-medium text-burgundy-900">
                    Viernes a Domingo • Todo el día
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-8 bg-burgundy-700 hover:bg-burgundy-800 self-start">
                <Link to="/menu">
                  Ver Menú
                </Link>
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="h-full">
                <img 
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop" 
                  alt="Promociones especiales" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
