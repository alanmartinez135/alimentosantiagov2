import { useState } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

type Props = {
  menuItems: MenuItem[];
  onUpdated: () => void;
};

const MenuItemList = ({ menuItems, onUpdated }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({});
    setUploading(false);
  };

  const handleChange = (field: keyof MenuItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file: File) => {
    const body = new FormData();
    body.append("image", file);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (res.ok) {
        handleChange("image", data.url);
      } else {
        throw new Error(data.error || "Error al subir imagen");
      }
    } catch (error) {
      console.error("Error subiendo imagen", error);
    } finally {
      setUploading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await fetch(`http://localhost:3001/menuItems/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      onUpdated();
      cancelEditing();
    } catch (error) {
      console.error("Error actualizando plato", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este plato?")) return;

    try {
      await fetch(`http://localhost:3001/menuItems/${id}`, {
        method: "DELETE",
      });
      onUpdated();
    } catch (error) {
      console.error("Error eliminando plato", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div key={item.id} className="border p-4 rounded-lg shadow-sm flex flex-col">
          {editingId === item.id ? (
            <div className="space-y-4">
              <Label>Nombre</Label>
              <Input value={formData.name || ""} onChange={(e) => handleChange("name", e.target.value)} />

              <Label>Descripción</Label>
              <Input value={formData.description || ""} onChange={(e) => handleChange("description", e.target.value)} />

              <Label>Precio</Label>
              <Input type="number" value={formData.price ?? 0} onChange={(e) => handleChange("price", Number(e.target.value))} />

              <Label>Categoría</Label>
              <Input value={formData.category || ""} onChange={(e) => handleChange("category", e.target.value)} />

              <Label>Stock</Label>
              <Input type="number" value={formData.stock ?? 0} onChange={(e) => handleChange("stock", Number(e.target.value))} />

              <Label>Imagen</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={clsx(
                  "border-2 border-dashed rounded p-4 text-center cursor-pointer transition",
                  isDragging ? "border-burgundy-500 bg-burgundy-50" : "border-gray-300"
                )}
              >
                <p className="text-sm mb-2">Arrastra y suelta una imagen aquí o selecciona un archivo</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                />
                {uploading && <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>}
                {formData.image && (
                  <img
                    src={formData.image.startsWith("http") ? formData.image : `http://localhost:3001${formData.image}`}
                    alt="Vista previa"
                    className="mt-3 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700">Guardar</Button>
                <Button onClick={cancelEditing} variant="secondary">Cancelar</Button>
              </div>
            </div>
          ) : (
            <>
              {item.image && (
                <img
                  src={item.image.startsWith("http") ? item.image : `http://localhost:3001${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
              <p className="text-xs text-gray-400">Categoría: {item.category}</p>
              <p className="text-xs text-gray-400">Stock: {item.stock}</p>

              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => startEditing(item)}>Editar</Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(item.id)}>Eliminar</Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;
