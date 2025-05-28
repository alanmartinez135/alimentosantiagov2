import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = express.Router();
const NGROK_URL = 'https://afe7-2800-300-6bb1-f560-a11f-22cd-cdf8-409a.ngrok-free.app '; 

const mp = new MercadoPagoConfig({
  accessToken: 'TEST-8450664436614964-033114-10c328d07194bbbc55633db89f669132-153592705', // Reemplaza con tu token real
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
          success: `${NGROK_URL}/pago-exitoso`,
          failure: `${NGROK_URL}/pago-fallido`,
          pending: `${NGROK_URL}/pago-pendiente`,
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

export default router;
