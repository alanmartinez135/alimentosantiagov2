
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 hero-pattern"></div>
      
      {/* Hero content */}
      <div className="relative z-11 container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-800 leading-tight mb-4">
              Alimentos Santiago
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
              Disfruta de los más exquisitos platillos gourmet, preparados con los mejores 
              ingredientes y servidos con pasión. Una experiencia culinaria inolvidable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-burgundy-700 hover:bg-burgundy-800">
                <Link to="/menu">
                  Ver Menú <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-burgundy-700 text-burgundy-700 hover:bg-burgundy-50">
                <a href="#promociones">
                  Promociones
                </a>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-burgundy-300 rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
                alt="Deliciosa comida gourmet" 
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
