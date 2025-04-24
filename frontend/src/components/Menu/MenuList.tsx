
import { useState } from "react";
import { MenuItem } from "@/types";
import MenuItemCard from "./MenuItemCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface MenuListProps {
  items: MenuItem[];
}

const MenuList = ({ items }: MenuListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get unique categories
  const categories = ["todos", ...Array.from(new Set(items.map(item => item.category)))];
  
  // Filter and search items
  const filterItems = (category: string, search: string) => {
    return items.filter(item => {
      const matchesCategory = category === "todos" || item.category === category;
      const matchesSearch = !search || 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  };

  const categoryLabels: Record<string, string> = {
    "todos": "Todos",
    "platos-principales": "Platos Principales",
    "entrantes": "Entrantes",
    "postres": "Postres"
  };

  return (
    <div className="py-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar platillos, ingredientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-burgundy-200 focus:border-burgundy-500 focus:ring-burgundy-500"
        />
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="todos" className="mb-8">
        <TabsList className="w-full justify-start overflow-x-auto py-2">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:bg-burgundy-700 data-[state=active]:text-white"
            >
              {categoryLabels[category] || category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent 
            key={category} 
            value={category}
            className="pt-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filterItems(category, searchTerm).map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
            
            {filterItems(category, searchTerm).length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg text-gray-500">No se encontraron resultados</h3>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuList;
