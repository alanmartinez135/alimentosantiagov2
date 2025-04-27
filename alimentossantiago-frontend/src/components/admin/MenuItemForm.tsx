import { useState } from "react";

type MenuItem = {
  name: string;
  description: string;
  price: number;
};

type Props = {
  onCreated: () => void; // Para refrescar la lista
};

const MenuItemForm = ({ onCreated }: Props) => {
  const [form, setForm] = useState<MenuItem>({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/menuItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price) 
        }),
      });
    
      if (response.ok) {
        setForm({ name: "", description: "", price: 0 });
        onCreated();  // refrescar la lista
      } else {
        alert("Error al crear el plato");
      }
    };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Agregar nuevo plato</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Precio</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-burgundy-800 text-white px-4 py-2 rounded hover:bg-burgundy-700"
      >
        Crear Plato
      </button>
    </form>
  );
};

export default MenuItemForm;
