import { useState } from "react";
import { MenuItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

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
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (field: keyof MenuItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const body = new FormData();
    body.append("image", file);
    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (res.ok) handleChange("image", data.url);
      else throw new Error(data.error);
    } catch (err) {
      console.error(err);
      setError("Error al subir imagen");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
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

      if (!response.ok) throw new Error("Error al crear el plato");

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
      setError("Error al crear el plato");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold">Agregar Nuevo Plato</h2>

      {/* Datos del plato */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nombre *</Label>
          <Input required value={formData.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
        </div>

        <div>
          <Label>Precio *</Label>
          <Input required type="number" min={0} value={formData.price ?? 0} onChange={(e) => handleChange("price", Number(e.target.value))} />
        </div>

        <div className="md:col-span-2">
          <Label>Descripción *</Label>
          <Input required value={formData.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
        </div>

        <div>
          <Label>Categoría</Label>
          <Input value={formData.category || ""} onChange={(e) => handleChange("category", e.target.value)} />
        </div>

        <div>
          <Label>Stock</Label>
          <Input type="number" value={formData.stock ?? 0} onChange={(e) => handleChange("stock", Number(e.target.value))} />
        </div>
      </div>

      {/* Imagen */}
      <div>
        <Label>Imagen</Label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={clsx(
            "border-2 border-dashed rounded-md p-4 text-center",
            isDragging ? "border-burgundy-500 bg-burgundy-50" : "border-gray-300"
          )}
        >
          <p className="text-sm text-gray-600 mb-2">Arrastra una imagen aquí o selecciona un archivo</p>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded mx-auto"
            />
          )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Botón */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-burgundy-700 hover:bg-burgundy-800"
      >
        {isLoading ? "Agregando..." : "Agregar Plato"}
      </Button>
    </form>
  );
};

export default MenuItemForm;
