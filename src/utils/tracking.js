// Meta Pixel (Facebook / Instagram Ads) & Cookie Consent utility for SantoSpirito.
// Option A (Argentina standard): tracking starts cleanly when VITE_META_PIXEL_ID is configured
// unless the visitor explicitly disables marketing/measurement cookies via preferences.

const CONSENT_KEY = 'santospirito_cookie_consent';

export function getMetaPixelId() {
  return (import.meta.env.VITE_META_PIXEL_ID || '').trim();
}

export function getCookieConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // 'accepted' | 'essential' | null
  } catch {
    return null;
  }
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore storage failures (private browsing, etc.)
  }
  if (value === 'accepted') {
    initMetaPixel();
  }
}

export function isMarketingAllowed() {
  return getCookieConsent() !== 'essential';
}

export function initMetaPixel() {
  const pixelId = getMetaPixelId();
  if (!pixelId || !isMarketingAllowed() || typeof window === 'undefined') {
    return false;
  }

  if (window.fbq && window._spPixelInitialized === pixelId) {
    return true;
  }

  if (!window.fbq) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      } else {
        b.head.appendChild(t);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  window._spPixelInitialized = pixelId;
  return true;
}

function safeFbqTrack(eventName, payload) {
  const pixelId = getMetaPixelId();
  if (!pixelId || !isMarketingAllowed() || typeof window === 'undefined') return;
  if (!window.fbq) {
    initMetaPixel();
  }
  if (window.fbq) {
    window.fbq('track', eventName, payload);
  }
}

export function trackViewContent(product) {
  if (!product) return;
  safeFbqTrack('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_category: product.category || 'Ambos',
    content_type: 'product',
    value: product.price || 0,
    currency: 'ARS'
  });
}

export function trackAddToCart(item) {
  if (!item) return;
  safeFbqTrack('AddToCart', {
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value: (item.price || 0) * (item.quantity || 1),
    currency: 'ARS'
  });
}

export function trackInitiateCheckout(cartItems = [], totalValue = 0) {
  const numItems = cartItems.reduce((sum, it) => sum + (it.quantity || 1), 0);
  safeFbqTrack('InitiateCheckout', {
    content_ids: cartItems.map((it) => it.id),
    content_type: 'product',
    num_items: numItems,
    value: totalValue,
    currency: 'ARS'
  });
}

export function trackPurchase(orderId, totalValue = 0, cartItems = []) {
  safeFbqTrack('Purchase', {
    content_ids: cartItems.map((it) => it.id),
    content_type: 'product',
    num_items: cartItems.reduce((sum, it) => sum + (it.quantity || 1), 0) || 1,
    value: totalValue,
    currency: 'ARS',
    order_id: orderId
  });
}
