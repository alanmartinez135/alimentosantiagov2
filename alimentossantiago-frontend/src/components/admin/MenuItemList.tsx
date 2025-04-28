import { useState } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  menuItems: MenuItem[];
  onUpdated: () => void;
};

const MenuItemList = ({ menuItems, onUpdated }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (field: keyof MenuItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const response = await fetch(`http://localhost:3001/menuItems/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error actualizando el plato");
      }

      onUpdated();
      cancelEditing();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este plato?")) return;

    try {
      const response = await fetch(`http://localhost:3001/menuItems/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error eliminando el plato");
      }

      onUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {menuItems.map((item) => (
        <div key={item.id} className="border p-4 rounded-md shadow-sm">
          {editingId === item.id ? (
            <div className="space-y-4">
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
                <Label>Imagen URL</Label>
                <Input
                  value={formData.imageUrl || ""}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
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
              {/* No editamos tags, reviews ni rating desde acá por simplicidad */}

              <div className="flex gap-2">
                <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700">
                  Guardar
                </Button>
                <Button onClick={cancelEditing} variant="secondary">
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover rounded" />
              )}
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Categoría: {item.category}</p>
              <p className="text-sm text-gray-500">Stock: {item.stock}</p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => startEditing(item)} variant="outline">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700">
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;
