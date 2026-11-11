import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * Webhook Oficial de Mercado Pago para SantoSpirito
 * Recibe eventos en tiempo real cuando un pago es aprobado.
 */
export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature, X-Request-Id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Mercado Pago envia notificaciones vía POST o GET de verificación
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'SantoSpirito Mercado Pago Webhook' });
  }

  // 1. Extraer ID del recurso notificado
  const query = req.query || {};
  const body = req.body || {};

  const type = query.type || query.topic || body.type || body.topic;
  const paymentId = query['data.id'] || query.id || body?.data?.id || body?.id;

  // Si no es un evento de pago o falta ID, responder 200 para evitar reintentos innecesarios
  if (!paymentId) {
    return res.status(200).json({ received: true, message: 'Notificación recibida sin ID de pago.' });
  }

  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) {
    console.warn('[Webhook] MERCADO_PAGO_ACCESS_TOKEN no configurado en Vercel.');
    return res.status(200).json({ received: true, warning: 'MERCADO_PAGO_ACCESS_TOKEN no presente.' });
  }

  try {
    // 2. Consultar el estado real del pago en la API de Mercado Pago
    const client = new MercadoPagoConfig({ 
      accessToken: token,
      options: { timeout: 7000 }
    });

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: String(paymentId) });

    if (!paymentData) {
      return res.status(200).json({ received: true, error: 'Pago no encontrado en Mercado Pago' });
    }

    const isApproved = paymentData.status === 'approved';
    const statusDetail = paymentData.status_detail;

    console.log(`[Mercado Pago Webhook] Pago #${paymentId}: ${paymentData.status} (${statusDetail})`);

    // Solo procesamos y notificamos si el pago está APROBADO
    if (isApproved) {
      const meta = paymentData.metadata || {};
      const orderId = meta.order_id || paymentData.external_reference || `SP-${String(paymentId).slice(-6)}`;
      
      const customer = {
        name: meta.customer_name || `${paymentData.payer?.first_name || ''} ${paymentData.payer?.last_name || ''}`.trim() || 'Cliente',
        email: meta.customer_email || paymentData.payer?.email || '',
        phone: meta.customer_phone || paymentData.payer?.phone?.number || '',
        address: meta.customer_address || '',
        city: meta.customer_city || 'Tucumán',
        province: meta.customer_province || 'Tucumán',
        postalCode: meta.customer_postal_code || '',
        notes: meta.customer_notes || ''
      };

      const shipping = {
        title: meta.shipping_title || 'Envío estándar',
        cost: Number(meta.shipping_cost) || 0,
        isTucuman: (customer.province || '').toLowerCase().includes('tucum') || (customer.city || '').toLowerCase().includes('tucum')
      };

      const itemsSummary = meta.items_summary || (paymentData.additional_info?.items || [])
        .map(it => `${it.quantity}x ${it.title}`)
        .join(' | ') || 'Ambo Médico SantoSpirito';

      const totalPaid = paymentData.transaction_amount || 0;
      const installments = paymentData.installments || 1;
      const paymentMethodName = paymentData.payment_method_id?.toUpperCase() || 'TARJETA';

      const estimatedDelivery = shipping.isTucuman 
        ? '24 a 48 hs hábiles (Cadetería / Entrega en San Miguel de Tucumán)'
        : '2 a 5 días hábiles por Correo Argentino (Interior y resto del país)';

      // 3. Preparar Orden Estructurada
      const orderSummary = {
        orderId,
        paymentId: String(paymentId),
        date: new Date().toISOString(),
        customer,
        shipping,
        itemsSummary,
        totalPaid,
        installments,
        paymentMethodName,
        estimatedDelivery
      };

      console.log('📦 [ORDEN CONFIRMADA PARA DESPACHO]:', JSON.stringify(orderSummary, null, 2));

      // 4. Disparar Notificaciones por Email (Resend API si está configurado)
      await sendOrderEmails(orderSummary);

      // 5. Disparar Webhook para WhatsApp (Make / Zapier / WhatsApp Bot si está configurado)
      await sendWhatsAppWebhook(orderSummary);
    }

    return res.status(200).json({
      received: true,
      paymentId,
      status: paymentData.status,
      action: isApproved ? 'NOTIFICATIONS_TRIGGERED' : 'WAITING_APPROVAL'
    });

  } catch (error) {
    console.error('[Mercado Pago Webhook Error]:', error);
    // Retornamos 200 para que Mercado Pago no reintente indefinidamente por errores de servidor
    return res.status(200).json({ received: true, error: error.message });
  }
}

/**
 * Función para despachar correos vía Resend API (si está la key) o loguear plantilla
 */
async function sendOrderEmails(order) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const dispatchEmail = process.env.DISPATCH_NOTIFICATION_EMAIL || 'santospirito.ok@gmail.com';

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #faf9f8; padding: 20px; color: #222;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden;">
        <div style="background: #134e4a; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px;">SANTOSPIRITO</h1>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.85;">Expresa tu Stilo • Colección 2026</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #134e4a; font-size: 18px; margin-top: 0;">¡Muchas gracias por tu compra, ${order.customer.name}!</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #444;">
            Tu pago con <strong>${order.paymentMethodName}</strong> ha sido aprobado exitosamente. Ya tenemos tu orden en preparación.
          </p>
          
          <div style="background: #f4fbf9; border-left: 4px solid #134e4a; padding: 14px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>N° de Pedido:</strong> ${order.orderId}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Prendas:</strong> ${order.itemsSummary}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Total Abonado:</strong> $${order.totalPaid.toLocaleString('es-AR')},00 (${order.installments} cuotas)</p>
            <p style="margin: 0; font-size: 13px;"><strong>Tiempo estimado de entrega:</strong> <span style="color: #0f766e; font-weight: bold;">${order.estimatedDelivery}</span></p>
          </div>

          <h3 style="font-size: 14px; color: #333; margin-bottom: 8px;">Datos de Entrega:</h3>
          <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.4;">
            ${order.customer.address ? `${order.customer.address}, ` : ''}${order.customer.city} (${order.customer.province}) [CP: ${order.customer.postalCode || '4000'}]<br>
            <strong>Método de Envío:</strong> ${order.shipping.title}
            ${order.customer.notes ? `<br><em>Nota: ${order.customer.notes}</em>` : ''}
          </p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="https://wa.me/5493815307474?text=Hola%20SantoSpirito%2C%20tengo%20una%20consulta%20sobre%20mi%20pedido%20${order.orderId}" 
               style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: bold; font-size: 13px; display: inline-block;">
               Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const dispatchHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #111;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; border: 2px solid #134e4a; padding: 20px;">
        <div style="border-bottom: 2px solid #eee; padding-bottom: 12px; margin-bottom: 16px;">
          <span style="background: #10b981; color: white; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 11px;">PAGADO CON TARJETA</span>
          <h2 style="margin: 8px 0 0 0; color: #111;">🚨 NUEVA ORDEN PARA DESPACHAR: ${order.orderId}</h2>
        </div>

        <h3 style="color: #134e4a; margin-top: 0;">1. Prendas a preparar:</h3>
        <p style="font-size: 15px; font-weight: bold; background: #f9fafb; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
          ${order.itemsSummary}
        </p>

        <h3 style="color: #134e4a;">2. Destinatario y Dirección:</h3>
        <p style="font-size: 13px; line-height: 1.6; margin: 0;">
          <strong>Cliente:</strong> ${order.customer.name}<br>
          <strong>Teléfono:</strong> <a href="tel:${order.customer.phone}">${order.customer.phone}</a> | <a href="https://wa.me/${order.customer.phone.replace(/\\D/g,'')}">Abrir WhatsApp</a><br>
          <strong>Email:</strong> ${order.customer.email}<br>
          <strong>Dirección:</strong> ${order.customer.address || 'A coordinar retiro'}<br>
          <strong>Localidad / CP:</strong> ${order.customer.city}, ${order.customer.province} (CP: ${order.customer.postalCode})<br>
          <strong>Método de Envío:</strong> ${order.shipping.title}<br>
          ${order.customer.notes ? `<strong>Nota / Observación:</strong> <span style="background: #fef3c7; padding: 2px 4px;">${order.customer.notes}</span><br>` : ''}
          <strong>Total Cobrado:</strong> $${order.totalPaid.toLocaleString('es-AR')},00
        </p>
      </div>
    </body>
    </html>
  `;

  if (!resendApiKey) {
    console.log('[Email Notifier] RESEND_API_KEY no configurado en Vercel. Mostrando vista previa en logs:');
    console.log(`- Enviar a Cliente (${order.customer.email}): Pedido Confirmado ${order.orderId}`);
    console.log(`- Enviar a Encargado (${dispatchEmail}): Hoja de Despacho ${order.orderId}`);
    return;
  }

  try {
    // 1. Email al Cliente
    if (order.customer.email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SantoSpirito <pedidos@santospirito.com.ar>',
          to: [order.customer.email],
          subject: `¡Tu pedido SantoSpirito está confirmado! (${order.orderId})`,
          html: customerHtml
        })
      });
    }

    // 2. Email al Encargado de Despacho
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SantoSpirito Tienda <alertas@santospirito.com.ar>',
        to: [dispatchEmail],
        subject: `🚨 NUEVA ORDEN PARA DESPACHO: ${order.orderId} - ${order.customer.name}`,
        html: dispatchHtml
      })
    });

    console.log('[Email Notifier] Correos enviados exitosamente vía Resend.');
  } catch (err) {
    console.error('[Email Notifier Error]:', err);
  }
}

/**
 * Función para disparar webhook hacia Make / Zapier / WhatsApp Bot
 */
async function sendWhatsAppWebhook(order) {
  const webhookUrl = process.env.DISPATCH_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'order.approved',
        orderId: order.orderId,
        customerName: order.customer.name,
        customerPhone: order.customer.phone,
        customerEmail: order.customer.email,
        address: `${order.customer.address}, ${order.customer.city} (${order.customer.province})`,
        items: order.itemsSummary,
        shippingTitle: order.shipping.title,
        total: order.totalPaid,
        estimatedDelivery: order.estimatedDelivery,
        notes: order.customer.notes
      })
    });
    console.log('[WhatsApp Webhook] Evento enviado a endpoint externo.');
  } catch (err) {
    console.error('[WhatsApp Webhook Error]:', err);
  }
}
