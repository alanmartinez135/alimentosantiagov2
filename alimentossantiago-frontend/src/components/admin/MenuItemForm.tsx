// src/components/admin/MenuItemForm.tsx
import { useState } from "react";
import { MenuItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  onCreated: () => void;
};

const MenuItemForm = ({ onCreated }: Props) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    image: "", // ✅ cambiado a image
    category: "",
    stock: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof MenuItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cleanImageUrl = (url: string) => {
    if (!url) return "";
    return url.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    setIsLoading(true);

    const cleanedImage = cleanImageUrl(formData.image || "");

    try {
      const response = await fetch("http://localhost:3001/menuItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: cleanedImage, // ✅ usamos imagen limpia
          tags: [],         // Por defecto vacío
          rating: 0,        // Nuevo plato empieza con 0 estrellas
          reviews: [],      // Sin reseñas al crear
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el plato");
      }

      // Resetear formulario
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        stock: 0,
      });
      onCreated();
    } catch (error) {
      console.error(error);
      setError("Error al crear el plato");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Plato</h2>

      <div>
        <Label>Nombre</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Descripción</Label>
        <Input
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Precio</Label>
        <Input
          type="number"
          value={formData.price ?? 0}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          required
        />
      </div>

      <div>
        <Label>URL de Imagen</Label>
        <Input
          value={formData.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
          onBlur={(e) => handleChange("image", cleanImageUrl(e.target.value))} // ✅ limpia espacios al salir del input
        />
      </div>

      <div>
        <Label>Categoría</Label>
        <Input
          value={formData.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
        />
      </div>

      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={formData.stock ?? 0}
          onChange={(e) => handleChange("stock", Number(e.target.value))}
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button 
        type="submit" 
        className="w-full bg-burgundy-700 hover:bg-burgundy-800"
        disabled={isLoading}
      >
        {isLoading ? "Agregando..." : "Agregar Plato"}
      </Button>
    </form>
  );
};

export default MenuItemForm;
