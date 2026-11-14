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

  const { items, payer, shippingCost, shippingTitle, shippingMethod } = req.body || {};

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
        title: shippingTitle || 'Costo de Envío / Entrega',
        quantity: 1,
        unit_price: Number(shippingCost),
        currency_id: 'ARS'
      });
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host || 'santospirito-store.vercel.app';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    const orderId = `SP-${Date.now().toString().slice(-6)}`;

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
          success: `${baseUrl}/?mp_back=success&order=${orderId}`,
          failure: `${baseUrl}/?mp_back=failure&order=${orderId}`,
          pending: `${baseUrl}/?mp_back=pending&order=${orderId}`
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/mercadopago-webhook`,
        external_reference: orderId,
        statement_descriptor: 'SANTOSPIRITO',
        payment_methods: {
          installments: 3 // Up to 3 installments as advertised
        },
        metadata: {
          order_id: orderId,
          customer_name: payer?.name || 'Cliente',
          customer_email: payer?.email || '',
          customer_phone: payer?.phone || '',
          customer_address: payer?.address || '',
          customer_city: payer?.city || '',
          customer_province: payer?.province || '',
          customer_postal_code: payer?.postalCode || '',
          customer_notes: payer?.notes || '',
          shipping_title: shippingTitle || 'Envío',
          shipping_method: shippingMethod || '',
          shipping_cost: Number(shippingCost) || 0,
          items_summary: (items || []).map(it => `${it.quantity}x ${it.name} (Talle: ${it.selectedSize})`).join(' | ')
        }
      }
    };

    const response = await preference.create(preferenceData);

    return res.status(200).json({
      isDemo: false,
      id: response.id,
      orderId,
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
