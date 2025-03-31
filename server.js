import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create_payment", async (req, res) => {
  try {
    const { items, total } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.nombre,
        unit_price: item.precio,
        quantity: item.cantidad,
      })),
      back_urls: {
        success: "http://localhost:3000/pago-exitoso",
        failure: "http://localhost:3000/pago-fallido",
        pending: "http://localhost:3000/pago-pendiente",
      },
      auto_return: "approved",
    };

    // Realizar la solicitud POST a la API de MercadoPago
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.access_token}`, // Token de acceso desde .env
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error en la creación del pago');
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
