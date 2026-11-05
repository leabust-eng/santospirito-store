import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  const { items, payer, shippingCost } = req.body || {};

  // If token is not set yet in Vercel Environment Variables, return demo mode flag
  if (!token) {
    return res.status(200).json({
      isDemo: true,
      message: 'MERCADO_PAGO_ACCESS_TOKEN no configurado aún en Vercel. Operando en modo demostración.'
    });
  }

  try {
    const client = new MercadoPagoConfig({ 
      accessToken: token,
      options: { timeout: 7000 }
    });

    const preference = new Preference(client);

    // Map items to Mercado Pago specifications
    const mpItems = (items || []).map(it => ({
      id: String(it.id),
      title: `${it.name} (Talle: ${it.selectedSize})`,
      quantity: Number(it.quantity) || 1,
      unit_price: Number(it.price) || 0,
      currency_id: 'ARS'
    }));

    // Add shipping cost item if exists
    if (shippingCost && Number(shippingCost) > 0) {
      mpItems.push({
        id: 'costo-envio',
        title: req.body?.shippingTitle || 'Costo de Envío / Entrega',
        quantity: 1,
        unit_price: Number(shippingCost),
        currency_id: 'ARS'
      });
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host || 'santospirito-store.vercel.app';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;

    const preferenceData = {
      body: {
        items: mpItems,
        payer: {
          name: payer?.name || 'Cliente',
          email: payer?.email || 'cliente@santospirito.com.ar',
          phone: {
            number: payer?.phone || ''
          },
          address: {
            street_name: payer?.address || ''
          }
        },
        back_urls: {
          success: `${baseUrl}/?status=approved`,
          failure: `${baseUrl}/?status=rejected`,
          pending: `${baseUrl}/?status=pending`
        },
        auto_return: 'approved',
        statement_descriptor: 'SANTOSPIRITO',
        payment_methods: {
          installments: 3 // Up to 3 installments as advertised
        }
      }
    };

    const response = await preference.create(preferenceData);

    return res.status(200).json({
      isDemo: false,
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });

  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    return res.status(500).json({
      error: 'Error al conectar con la API de Mercado Pago',
      details: error.message
    });
  }
}
