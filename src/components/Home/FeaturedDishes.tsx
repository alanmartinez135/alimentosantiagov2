
import { useState } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import MenuItemCard from "@/components/Menu/MenuItemCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedDishesProps {
  items: MenuItem[];
}

const FeaturedDishes = ({ items }: FeaturedDishesProps) => {
  // Get the top 3 rated items
  const topRatedItems = [...items]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-burgundy-800 mb-4">
            Nuestros Platillos Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estos son los platillos favoritos de nuestros clientes, preparados con los
            ingredientes más frescos y con todo nuestro amor por la gastronomía.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRatedItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-burgundy-700 hover:bg-burgundy-800">
            <Link to="/menu">
              Ver Todo El Menú <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
