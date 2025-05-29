import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { loadDB, saveDB } from "../models/db";

const router = express.Router();
const NGROK_URL = 'https://5e68-2800-300-6bb1-f560-b49e-d701-a720-4c5e.ngrok-free.app'; 

const mp = new MercadoPagoConfig({
  accessToken: 'APP_USR-8739958393455610-052822-bab9b089c7f0615372cc48e0ca812ab8-2463130587', // Reemplaza con tu token real
});

const preference = new Preference(mp);

router.post('/crear-preferencia', async (req, res) => {
  try {
    const { items, usuarioEmail } = req.body;

    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.nombre,
          unit_price: Math.round(Number(item.precio)),
          quantity: item.cantidad,
          currency_id: 'CLP',
        })),
        payer: {
          email: usuarioEmail,
        },
        back_urls: {
          success: `${NGROK_URL}/Pago-exitoso`,
          failure: `${NGROK_URL}/Pago-fallido`,
          pending: `${NGROK_URL}/Pago-pendiente`,
        },
        auto_return: 'approved',
      },
    });

    console.log('Resultado de preference.create:', result);

    if (!result.id || !result.init_point) {
      console.error('No se recibió id o init_point del servicio MercadoPago');
      return res.status(500).json({ error: 'No se recibió el link de pago' });
    }

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

router.get("/Pago-exitoso", async (req, res) => {
  const orderId = req.query.orderId as string;

  if (orderId) {
    try {
      const db = await loadDB();
      const index = db.orders.findIndex((o: any) => o.id === orderId);
      if (index !== -1) {
        db.orders[index].status = "confirmed";
        await saveDB(db);
        console.log(`Pedido ${orderId} confirmado correctamente.`);
      }
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  }

  // Redirigir al frontend (ajusta si tu frontend está en otro dominio)
  res.redirect(`${NGROK_URL}/perfil`);
});

export default router;
