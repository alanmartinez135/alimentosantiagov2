// backend/config/mercadoPago.ts o directamente en tu route

import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: 'TEST-8450664436614964-033114-10c328d07194bbbc55633db89f669132-153592705', // Usa tu Access Token
});
