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
    image: "",
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

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        handleChange("image", data.url); // 👈 Guardamos la URL del backend
      } else {
        throw new Error(data.error || "Error subiendo imagen");
      }
    } catch (err) {
      console.error(err);
      setError("Error subiendo imagen");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/menuItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: [],
          rating: 0,
          reviews: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el plato");
      }

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
        <Label>Imagen</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Vista previa"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
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
