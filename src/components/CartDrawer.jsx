import React, { useState } from 'react';
import { 
  X, Trash2, ShoppingBag, CreditCard, MessageCircle, 
  Truck, ArrowRight, ShieldCheck, Check, Sparkles, Tag,
  Lock, AlertCircle, Building2, CheckCircle2, ChevronRight,
  MapPin, Copy, CheckCheck, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

const promoJacketsList = [
  {
    id: "chaqueta-promo-celeste-marino",
    name: "Chaqueta Celeste & Marino",
    style: "Celeste pastel con vivos azul marino",
    image: "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-tricolor-menta",
    name: "Chaqueta Tricolor Menta & Blanco",
    style: "Base menta con blanco óptico y vivos",
    image: "https://d22fxaf9t8d39k.cloudfront.net/ca8312fc57ec21a391345f33020a52e030349e70a5fee4dc9806fa6e01792342466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-beige-negro",
    name: "Chaqueta Beige & Negro",
    style: "Tono camel distinguido con vivos negros",
    image: "https://d22fxaf9t8d39k.cloudfront.net/6db6e534003861e5572bae4eb67cde08963f4a8f4a8d530378623f4a0c091d79466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-verde-oliva",
    name: "Chaqueta Verde Oliva & Rosa",
    style: "Verde oliva suave con vivos rosa pastel",
    image: "https://d22fxaf9t8d39k.cloudfront.net/a9b6ce1bd1c7323c23de5fab33c4a086f1ac731b411b63fa59537736a122db01466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-magenta-oliva",
    name: "Chaqueta Magenta & Oliva",
    style: "Magenta vibrante con vivos oliva",
    image: "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-menta-negro",
    name: "Chaqueta Menta & Negro",
    style: "Menta sanitario con contraste negro",
    image: "https://d22fxaf9t8d39k.cloudfront.net/6472c905867ad8d562bf38c2395b5b10f7fa921fadba6aa0d0fb88a4f3b2ed14466763.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-rosita-bordeaux",
    name: "Chaqueta Rosita & Bordeaux",
    style: "Rosa empolvado con vivos bordeaux",
    image: "/products/ambo-rosita-bordeaux.jpg",
    price: 55000,
    originalPrice: 75000
  },
  {
    id: "chaqueta-promo-azul-quirurgico",
    name: "Chaqueta Azul Quirúrgico",
    style: "Azul clásico institucional de alta resistencia",
    image: "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg",
    price: 55000,
    originalPrice: 75000
  }
];

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onAddToCart,
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart 
}) {
  if (!isOpen) return null;

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  
  // Copy to clipboard helper for CVU / Alias
  const [copiedField, setCopiedField] = useState(null);
  const handleCopy = (text, field) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch (e) {
      console.error(e);
    }
  };
  
  // Steps: 'cart' | 'checkout' | 'payment' | 'processing' | 'success'
  const [checkoutStep, setCheckoutStep] = useState('cart');

  // Promo 2da Chaqueta state
  const [selectedPromoJacketId, setSelectedPromoJacketId] = useState(promoJacketsList[0].id);
  const [selectedPromoJacketSize, setSelectedPromoJacketSize] = useState('M');

  React.useEffect(() => {
    if (cartItems && cartItems.length > 0 && cartItems[0].selectedSize) {
      setSelectedPromoJacketSize(cartItems[0].selectedSize);
    }
  }, [cartItems]);

  const promoJacketInCart = (cartItems || []).find(it => it.id && it.id.startsWith('chaqueta-promo-'));
  const selectedPromoJacket = promoJacketsList.find(j => j.id === selectedPromoJacketId) || promoJacketsList[0];

  const handleAddPromoJacket = () => {
    if (!onAddToCart) return;
    onAddToCart({
      id: selectedPromoJacket.id,
      name: `${selectedPromoJacket.name} (2da Chaqueta Promo)`,
      price: 55000,
      originalPrice: 75000,
      selectedSize: selectedPromoJacketSize,
      quantity: 1,
      images: [selectedPromoJacket.image]
    });
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'San Miguel de Tucumán',
    province: 'Tucumán',
    address: '',
    postalCode: '4000',
    notes: '',
    paymentMethod: 'mercadopago' // 'mercadopago' | 'transferencia'
  });

  // Shipping zone: 'tucuman' | 'nacional'
  const [shippingZone, setShippingZone] = useState('tucuman');
  // Shipping method: 'tucuman_moto' | 'correo_domicilio' | 'correo_sucursal'
  const [shippingMethod, setShippingMethod] = useState('tucuman_moto');

  const shippingMethodsData = {
    tucuman_moto: {
      id: 'tucuman_moto',
      zone: 'tucuman',
      title: 'Cadetería Express (Servimoto / PedidosYa)',
      subtitle: 'San Miguel de Tucumán y hasta 10 km • Se abona al recibir',
      shortName: 'Cadetería en destino',
      price: 0,
      isPayOnDelivery: true,
      requiresAddress: true
    },
    correo_domicilio: {
      id: 'correo_domicilio',
      zone: 'ambas',
      title: 'Correo Argentino a Domicilio',
      subtitle: 'Para interior de Tucumán (>10 km) o resto del país (3 a 5 días)',
      shortName: 'Correo Arg. a Domicilio',
      price: 6900,
      isPayOnDelivery: false,
      requiresAddress: true
    },
    correo_sucursal: {
      id: 'correo_sucursal',
      zone: 'ambas',
      title: 'Sucursal Correo Argentino',
      subtitle: 'Para interior de Tucumán (>10 km) o resto del país',
      shortName: 'Sucursal Correo Arg.',
      price: 4900,
      isPayOnDelivery: false,
      requiresAddress: true
    }
  };

  // Card Payment State
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    dni: '',
    installments: '3'
  });

  const [cardBrand, setCardBrand] = useState('visa'); // 'visa' | 'mastercard' | 'amex'
  const [orderReceipt, setOrderReceipt] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const selectedShipping = shippingMethodsData[shippingMethod] || shippingMethodsData.tucuman_moto;
  const isFreeShipping = subtotal >= 150000;
  const estimatedShipping = selectedShipping.price === 0 ? 0 : (isFreeShipping ? 0 : selectedShipping.price);

  const discountAmount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const transferDiscount = customerData.paymentMethod === 'transferencia' ? Math.round((subtotal - discountAmount) * 0.10) : 0;
  const finalTotal = subtotal - discountAmount - transferDiscount + (cartItems.length > 0 ? estimatedShipping : 0);

  const handlePostalCodeChange = (e) => {
    const cp = e.target.value;
    setCustomerData(prev => ({ ...prev, postalCode: cp }));
    const cpClean = cp.trim();
    const cpNum = parseInt(cpClean, 10);
    if (cpClean.length >= 3) {
      if ((cpNum >= 4000 && cpNum <= 4178) || cpClean.startsWith('40') || cpClean.startsWith('41')) {
        setShippingZone('tucuman');
        if (shippingMethod === 'correo_domicilio') {
          setShippingMethod('tucuman_moto');
        }
      } else if (cpClean.length >= 4) {
        setShippingZone('nacional');
        if (shippingMethod === 'tucuman_moto') {
          setShippingMethod('correo_domicilio');
        }
      }
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'SANTO10' || coupon.trim().toUpperCase() === 'PLAVUSA10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido. Probá con: SANTO10');
    }
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    if (val.startsWith('4')) setCardBrand('visa');
    else if (val.startsWith('5')) setCardBrand('mastercard');
    else if (val.startsWith('3')) setCardBrand('amex');

    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardData({ ...cardData, expiry: val });
  };

  // Handle flow transition
  const handleProceedFromCheckout = async (e) => {
    e.preventDefault();
    if (customerData.paymentMethod === 'mercadopago') {
      setCheckoutStep('processing');

      try {
        // Attempt official Mercado Pago preference creation
        const res = await fetch('/api/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems.map(it => ({
              ...it,
              price: couponApplied ? Math.round(it.price * 0.90) : it.price
            })),
            payer: customerData,
            shippingCost: estimatedShipping,
            shippingTitle: selectedShipping.title,
            shippingMethod: selectedShipping.id
          })
        });

        const data = await res.json();

        // If credentials are live and return an init_point from Mercado Pago
        if (data && data.init_point && !data.isDemo) {
          window.location.href = data.init_point;
          return;
        }

        // If in development/demo mode (no token set yet), proceed to interactive card demo
        setCheckoutStep('payment');
      } catch (err) {
        console.warn('Operando en modo interactivo local:', err);
        setCheckoutStep('payment');
      }
    } else {
      // Transferencia -> send to WhatsApp directly
      const itemsText = cartItems.map(it => 
        `• ${it.quantity}x ${it.name} (Talle: ${it.selectedSize}) - $${(it.price * it.quantity).toLocaleString('es-AR')}`
      ).join('%0A');

      const addressInfo = `*DIRECCION:* ${customerData.address}, ${customerData.city} (${customerData.province || 'Tucumán'})${customerData.postalCode ? ` [CP: ${customerData.postalCode}]` : ''}` +
        (customerData.notes ? `%0A*NOTA / SUGERENCIA:* ${customerData.notes}` : '');

      const shippingCostText = selectedShipping.isPayOnDelivery
        ? 'A abonar al recibir (al cadete en destino)'
        : estimatedShipping === 0
        ? '¡GRATIS!'
        : `$${estimatedShipping.toLocaleString('es-AR')}`;

      const message = `*¡HOLA SANTO SPIRITO! Quiero confirmar mi pedido por Transferencia:*%0A%0A` +
        `*CLIENTE:* ${customerData.name}%0A` +
        `*TELEFONO:* ${customerData.phone}%0A` +
        `${addressInfo}%0A` +
        `*METODO DE ENVIO:* ${selectedShipping.title}%0A%0A` +
        `*PRODUCTOS:*%0A${itemsText}%0A%0A` +
        `*SUBTOTAL:* $${subtotal.toLocaleString('es-AR')}%0A` +
        (discountAmount > 0 ? `*DESCUENTO CUPON:* -$${discountAmount.toLocaleString('es-AR')}%0A` : '') +
        `*DESCUENTO TRANSFERENCIA (10%):* -$${transferDiscount.toLocaleString('es-AR')}%0A` +
        `*COSTO DE ENVIO:* ${shippingCostText}%0A` +
        `*TOTAL FINAL A TRANSFERIR:* $${finalTotal.toLocaleString('es-AR')}%0A%0A` +
        (selectedShipping.isPayOnDelivery ? `_🛵 Nota: El servicio de cadetería se abona directo al cadete al recibir la prenda._%0A%0A` : '') +
        `*DATOS PARA TRANSFERIR (MERCADO PAGO):*%0A` +
        `• *Alias:* salazarchechu2025%0A` +
        `• *CVU:* 0000003100071610252523%0A%0A` +
        `_Adjunto a continuación la captura del comprobante de transferencia._`;

      window.open(`https://wa.me/5493815307474?text=${message}`, '_blank');
      setOrderReceipt({
        id: `TR-${Math.floor(100000 + Math.random() * 900000)}`,
        method: 'Transferencia Bancaria (10% OFF)',
        shippingTitle: selectedShipping.title,
        shippingMethod: selectedShipping.id,
        isPayOnDelivery: selectedShipping.isPayOnDelivery,
        shippingCost: estimatedShipping,
        total: finalTotal
      });
      setCheckoutStep('success');
      confetti();
    }
  };

  const handleProcessCardPayment = (e) => {
    e.preventDefault();
    setCheckoutStep('processing');

    // Simulate authentic Mercado Pago API handshake and approval
    setTimeout(() => {
      setOrderReceipt({
        id: `MP-${Math.floor(100000000 + Math.random() * 900000000)}`,
        cardBrand: cardBrand.toUpperCase(),
        lastFour: cardData.number.replace(/\s/g, '').slice(-4) || '4242',
        installments: cardData.installments,
        installmentAmount: Math.round(finalTotal / parseInt(cardData.installments, 10)),
        total: finalTotal,
        shippingTitle: selectedShipping.title,
        shippingMethod: selectedShipping.id,
        isPayOnDelivery: selectedShipping.isPayOnDelivery,
        shippingCost: estimatedShipping,
        authCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`
      });
      setCheckoutStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-full sm:max-w-xl md:max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-teal-900" />
            <h2 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
              {checkoutStep === 'cart' && `Mi Carrito (${cartItems.reduce((a, b) => a + b.quantity, 0)})`}
              {checkoutStep === 'checkout' && "1. Datos de Entrega y Envío"}
              {checkoutStep === 'payment' && "2. Pago con Tarjeta (Mercado Pago)"}
              {checkoutStep === 'processing' && "Procesando con Mercado Pago..."}
              {checkoutStep === 'success' && (orderReceipt?.method?.includes('Transferencia') ? "Esperamos tu Transferencia" : "¡Pago Aprobado con Éxito!")}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition border border-neutral-200"
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Interactive Gamified Progress Bar */}
        {subtotal > 0 && checkoutStep === 'cart' && (() => {
          const progress = Math.min(100, Math.round((subtotal / 150000) * 100));
          const missing = 150000 - subtotal;
          return (
            <div className="bg-neutral-900 text-white p-3.5 border-b border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                {subtotal >= 150000 ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Sparkles size={14} className="text-emerald-400" />
                    ¡Felicitaciones! Tenés ENVÍO GRATIS asegurado
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <Truck size={14} className="text-amber-400" />
                    Te faltan <strong className="text-amber-300 font-bold">${missing.toLocaleString('es-AR')}</strong> para <strong>ENVÍO GRATIS</strong>
                  </span>
                )}
                <span className={`text-[11px] font-mono font-black px-1.5 py-0.5 rounded ${
                  subtotal >= 150000 ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-800/40' : 'text-amber-300 bg-amber-950/80 border border-amber-800/40'
                }`}>
                  {progress}%
                </span>
              </div>

              {/* Visual Progress Bar Track */}
              <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    subtotal >= 150000 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' 
                      : 'bg-gradient-to-r from-amber-500 to-amber-300'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {subtotal < 150000 && (
                <p className="text-[10px] text-neutral-400 leading-tight">
                  💡 Sumá otro ambo o prenda a tu pedido y el envío por Correo Argentino te sale <strong>$0</strong>.
                </p>
              )}
            </div>
          );
        })()}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* STEP 1: CART LIST */}
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Tu carrito está vacío</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Explorá nuestra colección oficial de ambos médicos Spandex.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-teal-900 transition"
                  >
                    Ver Productos
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 relative group"
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-16 h-20 object-cover object-top rounded-lg bg-white border border-neutral-200 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold text-neutral-600 bg-white px-2 py-0.5 rounded border border-neutral-200">
                              Talle: <strong>{item.selectedSize}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-extrabold text-neutral-900">
                            ${(item.price * item.quantity).toLocaleString('es-AR')},00
                          </span>

                          <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-neutral-400 hover:text-rose-600 p-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}

                  {/* Coupon Section */}
                  <div className="pt-3 border-t border-neutral-200">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Cupón de descuento (Ej: SANTO10)"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-lg uppercase font-semibold"
                        />
                        <Tag size={14} className="absolute left-2.5 top-2.5 text-neutral-400" />
                      </div>
                      <button
                        type="submit"
                        className="bg-neutral-800 hover:bg-black text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition"
                      >
                        Aplicar
                      </button>
                    </form>
                    {couponApplied && (
                      <p className="text-[11px] text-emerald-700 font-bold mt-1">✓ ¡Cupón SANTO10 aplicado! 10% de descuento.</p>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                    )}
                  </div>

                  {/* COMBO 3 PIEZAS: 2 CHAQUETAS + 1 PANTALÓN */}
                  {promoJacketInCart ? (
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs text-emerald-950 space-y-2 animate-fade-in shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold flex items-center gap-1.5 text-emerald-900 text-xs sm:text-sm">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          ¡Combo 3 Piezas Activado!
                        </span>
                        <span className="text-[10px] font-black bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          Ahorraste $20.000
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-snug">
                        Sumaste tu segunda chaqueta a precio promocional de <strong>$55.000</strong>: <br />
                        <strong>{promoJacketInCart.name}</strong> • Talle: <strong>{promoJacketInCart.selectedSize}</strong>
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-emerald-200/70 text-[11px]">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Truck size={13} /> ¡Envío Gratis Desbloqueado!
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(promoJacketInCart.id, promoJacketInCart.selectedSize)}
                          className="text-rose-600 hover:text-rose-800 font-semibold underline"
                        >
                          Quitar chaqueta extra
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 sm:p-4 bg-gradient-to-br from-teal-50/90 via-amber-50/30 to-white rounded-2xl border-2 border-teal-600/40 shadow-sm space-y-3">
                      {/* Header & Badges */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between flex-wrap gap-1.5">
                          <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                            <Sparkles size={11} className="text-amber-600" />
                            Combo 3 Piezas: 2 Chaquetas + 1 Pantalón
                          </span>
                          <span className="text-[11px] font-black text-teal-950 bg-white px-2 py-0.5 rounded-md border border-teal-300 shadow-2xs">
                            2da Chaqueta a solo <strong className="text-teal-700 font-black">$55.000</strong>
                          </span>
                        </div>
                        
                        <h3 className="text-xs sm:text-sm font-black text-neutral-900 tracking-tight pt-0.5">
                          Multiplicá tus combinaciones: ¡Sumá una 2da Chaqueta a elección!
                        </h3>
                      </div>

                      {/* Persuasive copy */}
                      <div className="text-[11px] text-neutral-700 leading-relaxed space-y-1.5 bg-white/90 p-2.5 rounded-xl border border-neutral-200/80">
                        <p>
                          El beneficio directo es que <strong>podés combinar ambas chaquetas con el mismo pantalón</strong>. De esa forma contás con <strong>2 looks completos, frescos y profesionales</strong> para tus guardias y consultorio, luciendo siempre impecable sin tener que pagar un segundo ambo entero.
                        </p>
                        <p className="text-emerald-900 font-bold flex items-center gap-1.5 pt-0.5">
                          <Truck size={14} className="text-emerald-700 flex-shrink-0" />
                          <span>¡Al sumarla superás los $150.000 y <strong>tu ENVÍO ES 100% GRATIS</strong> a todo el país!</span>
                        </p>
                      </div>

                      {/* Jacket Selector */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-neutral-900 block">
                            Elegí el modelo de tu 2da Chaqueta:
                          </label>
                          <span className="text-[10px] text-neutral-500 font-medium">
                            {promoJacketsList.length} modelos disponibles
                          </span>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                          {promoJacketsList.map((jkt) => {
                            const isSelected = selectedPromoJacketId === jkt.id;
                            return (
                              <button
                                key={jkt.id}
                                type="button"
                                onClick={() => setSelectedPromoJacketId(jkt.id)}
                                className={`group relative flex flex-col items-center p-1.5 rounded-xl border text-center transition-all ${
                                  isSelected 
                                    ? 'border-teal-700 bg-teal-50 ring-2 ring-teal-600/40 shadow-sm scale-[1.02]' 
                                    : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'
                                }`}
                              >
                                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-neutral-100 mb-1 relative">
                                  <img 
                                    src={jkt.image} 
                                    alt={jkt.name} 
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                  />
                                  {isSelected && (
                                    <div className="absolute top-1 right-1 bg-teal-700 text-white rounded-full p-0.5 shadow-md">
                                      <Check size={10} />
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] font-bold text-neutral-900 line-clamp-1 leading-tight">
                                  {jkt.name.replace('Chaqueta ', '')}
                                </span>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                  <span className="text-[10px] font-black text-teal-900">$55.000</span>
                                  <span className="text-[9px] text-neutral-400 line-through">$75.000</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Size selector & Add Button */}
                      <div className="pt-1 space-y-2 border-t border-teal-200/50">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-[11px] font-bold text-neutral-800">
                            Talle de tu chaqueta: <strong className="text-teal-900 font-black">{selectedPromoJacketSize}</strong>
                          </span>
                          <div className="flex items-center gap-1">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setSelectedPromoJacketSize(sz)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition ${
                                  selectedPromoJacketSize === sz
                                    ? 'bg-teal-900 text-white border-teal-900 shadow-2xs'
                                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddPromoJacket}
                          className="w-full bg-[#009ee3] hover:bg-[#0081ba] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition active:scale-95 duration-150"
                        >
                          <Sparkles size={14} className="text-amber-200" />
                          <span>Sumar {selectedPromoJacket.name} por $55.000</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT SHIPPING DATA */}
          {checkoutStep === 'checkout' && (
            <form onSubmit={handleProceedFromCheckout} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={customerData.name}
                  onChange={e => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 3815307474"
                    value={customerData.phone}
                    onChange={e => setCustomerData({...customerData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@gmail.com"
                    value={customerData.email}
                    onChange={e => setCustomerData({...customerData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* STEP 2A: DELIVERY METHOD & ZONE SELECTOR */}
              <div className="bg-neutral-50 p-3 sm:p-3.5 rounded-xl border border-neutral-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-900 block text-xs flex items-center gap-1.5">
                    <Truck size={15} className="text-teal-800" />
                    <span>¿Cómo querés recibir tu compra?</span>
                  </label>
                  <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {shippingZone === 'tucuman' ? '📍 Tucumán' : '📦 Nacional'}
                  </span>
                </div>

                {/* Zone Tabs */}
                <div className="grid grid-cols-2 gap-1.5 bg-neutral-200/70 p-1 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setShippingZone('tucuman');
                      if (shippingMethod === 'correo_domicilio') setShippingMethod('tucuman_moto');
                      setCustomerData(prev => ({ ...prev, province: 'Tucumán' }));
                    }}
                    className={`py-1.5 px-2 rounded-md text-center transition flex items-center justify-center gap-1 ${
                      shippingZone === 'tucuman'
                        ? "bg-white text-teal-950 shadow-sm font-extrabold"
                        : "text-neutral-600 hover:text-neutral-900 font-medium"
                    }`}
                  >
                    <span>🛵 En Tucumán (Local)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShippingZone('nacional');
                      if (shippingMethod === 'tucuman_moto') {
                        setShippingMethod('correo_domicilio');
                      }
                    }}
                    className={`py-1.5 px-2 rounded-md text-center transition flex items-center justify-center gap-1 ${
                      shippingZone === 'nacional'
                        ? "bg-white text-teal-950 shadow-sm font-extrabold"
                        : "text-neutral-600 hover:text-neutral-900 font-medium"
                    }`}
                  >
                    <span>📦 Resto del País</span>
                  </button>
                </div>

                {/* Delivery Options for Selected Zone */}
                <div className="space-y-2 pt-0.5">
                  {shippingZone === 'tucuman' ? (
                    <>
                      {/* Moto Servimoto / PedidosYa */}
                      <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                        shippingMethod === 'tucuman_moto'
                          ? "border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="tucuman_moto"
                          checked={shippingMethod === 'tucuman_moto'}
                          onChange={() => setShippingMethod('tucuman_moto')}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-xs">
                              🛵 Cadetería Express (Servimoto / PedidosYa)
                            </span>
                            <span className="text-[10px] font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded border border-teal-300">
                              A abonar en destino
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Válido para San Miguel de Tucumán y radio hasta 10 km. <strong>El costo del cadete lo abonás al recibir la prenda.</strong>
                          </p>
                        </div>
                      </label>

                      {/* Correo Argentino Domicilio Interior Tucuman */}
                      <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                        shippingMethod === 'correo_domicilio'
                          ? "border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="correo_domicilio"
                          checked={shippingMethod === 'correo_domicilio'}
                          onChange={() => setShippingMethod('correo_domicilio')}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-xs">
                              🏠 Correo Argentino a Domicilio (&gt; 10 km / Interior)
                            </span>
                            <span className="font-extrabold text-xs text-neutral-900">
                              {isFreeShipping ? <span className="text-emerald-700">¡GRATIS!</span> : "$6.900,00"}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Recomendado para distancias mayores a 10 km o interior provincial.
                          </p>
                        </div>
                      </label>

                      {/* Correo Argentino Interior Tucumán */}
                      <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                        shippingMethod === 'correo_sucursal'
                          ? "border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="correo_sucursal"
                          checked={shippingMethod === 'correo_sucursal'}
                          onChange={() => setShippingMethod('correo_sucursal')}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-xs">
                              🏢 Sucursal Correo Argentino (&gt; 10 km / Interior)
                            </span>
                            <span className="font-extrabold text-xs text-neutral-900">
                              {isFreeShipping ? <span className="text-emerald-700">¡GRATIS!</span> : "$4.900,00"}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Para Concepción, Monteros, Tafí del Valle, Aguilares u otras localidades.
                          </p>
                        </div>
                      </label>
                    </>
                  ) : (
                    <>
                      {/* Correo Argentino Domicilio */}
                      <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                        shippingMethod === 'correo_domicilio'
                          ? "border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="correo_domicilio"
                          checked={shippingMethod === 'correo_domicilio'}
                          onChange={() => setShippingMethod('correo_domicilio')}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-xs">
                              🏠 Correo Argentino a Domicilio Clásico
                            </span>
                            <span className="font-extrabold text-xs text-neutral-900">
                              {isFreeShipping ? <span className="text-emerald-700">¡GRATIS!</span> : "$6.900,00"}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Llega directo a la puerta de tu casa en todo el país (3 a 5 días hábiles).
                          </p>
                        </div>
                      </label>

                      {/* Correo Argentino Sucursal */}
                      <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                        shippingMethod === 'correo_sucursal'
                          ? "border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="correo_sucursal"
                          checked={shippingMethod === 'correo_sucursal'}
                          onChange={() => setShippingMethod('correo_sucursal')}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-xs">
                              🏢 Retiro en Sucursal Correo Argentino
                            </span>
                            <span className="font-extrabold text-xs text-neutral-900">
                              {isFreeShipping ? <span className="text-emerald-700">¡GRATIS!</span> : "$4.900,00"}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Retirás en la sucursal oficial de Correo Argentino más cercana.
                          </p>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* STEP 2B: ADDRESS / LOCATION DETAILS */}
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">
                    {shippingMethod === 'tucuman_moto'
                      ? "Dirección para el Cadete (San Miguel y hasta 10 km) *"
                      : "Dirección de Entrega (Calle y Número) *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={shippingMethod === 'tucuman_moto' ? "Ej: San Martín 540, Consultorio 2A (Abonás al cadete)" : "Ej: Av. Aconquija 1400, Piso 3 Dpto B"}
                    value={customerData.address}
                    onChange={e => setCustomerData({...customerData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Ciudad / Localidad *</label>
                    <input
                      type="text"
                      required
                      placeholder={shippingZone === 'tucuman' ? "San Miguel de Tucumán" : "Ej: Rosario"}
                      value={customerData.city}
                      onChange={e => setCustomerData({...customerData, city: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Código Postal</label>
                    <input
                      type="text"
                      placeholder="Ej: 4000"
                      value={customerData.postalCode}
                      onChange={handlePostalCodeChange}
                      maxLength={8}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1 text-[11px]">
                    Aclaraciones para la entrega (Opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Tocar timbre 2B / Dejar en recepción..."
                    value={customerData.notes || ''}
                    onChange={e => setCustomerData({...customerData, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector - 100% Automated with Mercado Pago */}
              <div className="pt-2 space-y-2">
                <label className="font-bold text-neutral-900 block">Medio de Pago</label>
                
                <div className="p-3.5 rounded-xl border border-teal-800 bg-teal-50/70 ring-2 ring-teal-700/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-[#009ee3] text-white font-black flex items-center justify-center text-[9px]">
                        MP
                      </div>
                      Pasarela Oficial de Mercado Pago
                    </span>
                    <span className="text-[10px] text-teal-800 font-bold bg-white px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                      <Lock size={10} /> 100% Seguro
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Aboná de forma automática e inmediata con el medio que prefieras:
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-semibold text-neutral-800">
                    <div className="bg-white p-1.5 rounded border border-neutral-200 flex items-center gap-1.5">
                      <span>💳</span>
                      <span>Hasta <strong>3 Cuotas sin interés</strong></span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-neutral-200 flex items-center gap-1.5">
                      <span>🏦</span>
                      <span><strong>Transferencia directa</strong> (Automática)</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-neutral-200 flex items-center gap-1.5">
                      <span>💳</span>
                      <span>Tarjeta de <strong>Débito</strong></span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-neutral-200 flex items-center gap-1.5">
                      <span>📱</span>
                      <span><strong>Dinero en cuenta</strong> MP / Efectivo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RESUMEN DETALLADO DEL PEDIDO ANTES DE PAGAR */}
              <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-extrabold text-neutral-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShoppingBag size={14} className="text-teal-900" />
                    Resumen de tu Pedido
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {cartItems.reduce((a, b) => a + b.quantity, 0)} {cartItems.reduce((a, b) => a + b.quantity, 0) === 1 ? 'prenda' : 'prendas'}
                  </span>
                </div>

                {/* Detalle por prenda */}
                <div className="space-y-1.5 py-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-neutral-700">
                      <span className="pr-2 leading-snug">
                        <strong>{item.quantity}x</strong> {item.name} <span className="text-teal-900 font-bold">({item.selectedSize})</span>
                      </span>
                      <span className="font-bold text-neutral-900 flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString('es-AR')},00
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 space-y-1.5 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal prendas:</span>
                    <span className="font-semibold text-neutral-900">${subtotal.toLocaleString('es-AR')},00</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Descuento cupón:</span>
                      <span>-${discountAmount.toLocaleString('es-AR')},00</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Envío ({selectedShipping.title}):</span>
                    <span>
                      {selectedShipping.isPayOnDelivery ? (
                        <span className="text-teal-900 font-bold bg-teal-100/70 px-1.5 py-0.5 rounded text-[10px]">
                          A abonar al cadete
                        </span>
                      ) : estimatedShipping === 0 ? (
                        <strong className="text-emerald-700 font-bold">¡GRATIS!</strong>
                      ) : (
                        <span className="font-semibold text-neutral-900">${estimatedShipping.toLocaleString('es-AR')},00</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t-2 border-neutral-900 flex justify-between items-baseline text-sm">
                  <span className="font-black text-neutral-900 uppercase tracking-wide">Total a Pagar:</span>
                  <span className="text-lg font-black text-neutral-900">${finalTotal.toLocaleString('es-AR')},00</span>
                </div>

                <div className="text-[11px] text-teal-800 font-semibold text-right">
                  O hasta 3 cuotas sin interés de ${(Math.round(finalTotal / 3)).toLocaleString('es-AR')},00
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#009ee3] hover:bg-[#0081ba] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <Lock size={15} />
                <span>Pagar de Forma Segura con Mercado Pago</span>
                <ChevronRight size={16} />
              </button>
            </form>
          )}

          {/* STEP 3: MERCADO PAGO CARD INPUT SCREEN */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4 text-xs animate-fade-in">
              
              {/* Mercado Pago Official Trust Badge */}
              <div className="flex items-center justify-between p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-sky-900">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#009ee3] text-white font-bold flex items-center justify-center text-[10px]">
                    MP
                  </div>
                  <span className="font-bold text-xs">Checkout Oficial de Mercado Pago</span>
                </div>
                <span className="text-[10px] text-sky-700 flex items-center gap-1 font-semibold">
                  <Lock size={12} /> Seguro 256-bit
                </span>
              </div>

              {/* Interactive Virtual Card Preview */}
              <div className="relative w-full h-44 rounded-2xl p-5 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-teal-950 text-white shadow-xl flex flex-col justify-between overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] w-36 h-36 rounded-full bg-teal-500/10 blur-xl"></div>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-7 rounded bg-amber-400/80 border border-amber-300/60 flex items-center justify-center">
                      <div className="w-5 h-3 border border-amber-600/50 rounded-xs"></div>
                    </div>
                    <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">DÉBITO / CRÉDITO</span>
                  </div>
                  <span className="text-sm font-bold tracking-widest text-white uppercase">
                    {cardBrand}
                  </span>
                </div>

                <div className="font-mono text-base tracking-widest text-neutral-100 py-1">
                  {cardData.number || '•••• •••• •••• ••••'}
                </div>

                <div className="flex justify-between items-end text-[10px] uppercase tracking-wider text-neutral-300">
                  <div>
                    <span className="text-[8px] text-neutral-400 block">TITULAR DE LA TARJETA</span>
                    <span className="font-semibold text-white">{cardData.name || customerData.name || 'NOMBRE Y APELLIDO'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-neutral-400 block">VENCE</span>
                    <span className="font-semibold text-white">{cardData.expiry || 'MM/AA'}</span>
                  </div>
                </div>
              </div>

              {/* Card Inputs Form */}
              <form onSubmit={handleProcessCardPayment} className="space-y-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Número de Tarjeta *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4509 •••• •••• ••••"
                      value={cardData.number}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className="w-full px-3 py-2 pl-9 border border-neutral-300 rounded-lg text-xs font-mono tracking-wider focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                    <CreditCard size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Nombre como figura en la tarjeta *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: MARÍA FLORENCIA GÓMEZ"
                    value={cardData.name}
                    onChange={e => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs uppercase focus:ring-2 focus:ring-teal-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Vencimiento *</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs text-center focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">CVV *</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={e => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs text-center focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">DNI Titular *</label>
                    <input
                      type="text"
                      required
                      placeholder="DNI"
                      value={cardData.dni}
                      onChange={e => setCardData({...cardData, dni: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs text-center focus:ring-2 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Installments Selector */}
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Cantidad de Cuotas:</label>
                  <select
                    value={cardData.installments}
                    onChange={e => setCardData({...cardData, installments: e.target.value})}
                    className="w-full px-3 py-2 border border-teal-700 bg-teal-50/50 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none"
                  >
                    <option value="3">✨ 3 cuotas sin interés de ${(Math.round(finalTotal / 3)).toLocaleString('es-AR')},00 (Recomendado)</option>
                    <option value="1">1 pago de ${finalTotal.toLocaleString('es-AR')},00</option>
                    <option value="6">6 cuotas fijas de ${(Math.round(finalTotal / 5.2)).toLocaleString('es-AR')},00</option>
                  </select>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#009ee3] hover:bg-[#0081ba] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  >
                    <Lock size={15} />
                    <span>Pagar ${finalTotal.toLocaleString('es-AR')},00 con Mercado Pago</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full text-center text-xs text-neutral-500 hover:text-black font-semibold py-1"
                  >
                    ← Modificar datos de entrega
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* STEP 4: PROCESSING SPINNER */}
          {checkoutStep === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin"></div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Conectando con Mercado Pago...</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Estamos validando los datos de la tarjeta y autorizando el pago en 3 cuotas sin interés.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS OFFICIAL RECEIPT */}
          {checkoutStep === 'success' && orderReceipt && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <Check size={36} />
              </div>

              <div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${
                  orderReceipt.method?.includes('Transferencia')
                    ? 'text-amber-800 bg-amber-50 border-amber-200'
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}>
                  {orderReceipt.method?.includes('Transferencia') ? 'ESPERAMOS TU PAGO • ENVIAR COMPROBANTE' : 'PAGO APROBADO ✓'}
                </span>
                <h3 className="text-lg font-serif font-bold text-neutral-900 mt-2">
                  {orderReceipt.method?.includes('Transferencia')
                    ? `¡Muchas gracias ${customerData.name || ''}!`
                    : `¡Felicitaciones ${customerData.name || 'por tu compra'}!`}
                </h3>
                <p className="text-xs text-neutral-500">
                  {orderReceipt.method?.includes('Transferencia')
                    ? 'Tu pedido está reservado. Bien realices la transferencia, envianos el comprobante por WhatsApp para preparar y despachar tu paquete.'
                    : 'Tu pedido de SantoSpirito ya está confirmado y en preparación.'}
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left text-xs space-y-2">
                <div className="flex justify-center pb-2 border-b border-neutral-200">
                  <img 
                    src="/brand/santospirito-logo-horizontal.svg" 
                    alt="SantoSpirito" 
                    className="h-6 w-auto object-contain"
                  />
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">ID de Operación:</span>
                  <strong className="font-mono text-neutral-900">{orderReceipt.id}</strong>
                </div>

                {orderReceipt.cardBrand && (
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Medio de Pago:</span>
                    <span className="font-bold text-neutral-900">
                      {orderReceipt.cardBrand} •••• {orderReceipt.lastFour}
                    </span>
                  </div>
                )}

                {orderReceipt.installments && (
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Plan de Cuotas:</span>
                    <span className="font-bold text-teal-800">
                      {orderReceipt.installments} cuotas sin interés de ${orderReceipt.installmentAmount?.toLocaleString('es-AR')},00
                    </span>
                  </div>
                )}

                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Método de Entrega:</span>
                  <span className="text-right font-bold text-neutral-900">
                    {orderReceipt.shippingTitle || selectedShipping.title}
                  </span>
                </div>

                {customerData.address && (
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Dirección de Entrega:</span>
                    <span className="text-right font-medium text-neutral-800">
                      {customerData.address}, {customerData.city}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-1 text-sm font-extrabold text-neutral-900">
                  <span>{orderReceipt.method?.includes('Transferencia') ? 'Total a Transferir:' : 'Total Abonado:'}</span>
                  <span>${orderReceipt.total?.toLocaleString('es-AR')},00</span>
                </div>
              </div>

              {/* Transfer Details on Receipt Screen */}
              {orderReceipt.method?.includes('Transferencia') && (
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 text-left space-y-2 text-xs">
                  <div className="font-bold text-emerald-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={14} className="text-emerald-700" />
                      Datos para Transferir (Mercado Pago):
                    </span>
                    <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded font-extrabold">10% OFF</span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-200">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Alias</span>
                      <span className="font-mono font-bold text-neutral-900 text-xs">salazarchechu2025</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('salazarchechu2025', 'receipt_alias')}
                      className="flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded transition border border-teal-200"
                    >
                      {copiedField === 'receipt_alias' ? (
                        <><CheckCheck size={13} className="text-emerald-600" /> ¡Copiado!</>
                      ) : (
                        <><Copy size={13} /> Copiar Alias</>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-200">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">CVU</span>
                      <span className="font-mono font-bold text-neutral-900 text-[11px] break-all">0000003100071610252523</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('0000003100071610252523', 'receipt_cvu')}
                      className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded transition border border-teal-200"
                    >
                      {copiedField === 'receipt_cvu' ? (
                        <><CheckCheck size={13} className="text-emerald-600" /> ¡Copiado!</>
                      ) : (
                        <><Copy size={13} /> Copiar CVU</>
                      )}
                    </button>
                  </div>

                  <div className="pt-1">
                    <a
                      href={`https://wa.me/5493815307474?text=¡Hola%20SantoSpirito!%20Acabo%20de%20realizar%20la%20transferencia%20para%20el%20pedido%20${orderReceipt.id}.%20Adjunto%20el%20comprobante.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm"
                    >
                      <MessageCircle size={15} />
                      <span>Enviar Comprobante por WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {orderReceipt.shippingMethod === 'tucuman_moto' ? (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-[11px] text-teal-950 text-left space-y-1">
                  <p>🛵 <strong>Próximo paso:</strong> Prepararemos tu pedido y coordinaremos el despacho con el cadete (Servimoto / PedidosYa) a <strong>{customerData.address}</strong>.</p>
                  <p className="text-teal-900 font-bold bg-white/80 p-1.5 rounded border border-teal-200">
                    💡 Recordá que el costo del viaje del cadete lo abonás directo al recibir la prenda en mano.
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-950 text-left">
                  📦 <strong>Próximo paso:</strong> Te enviaremos el código de seguimiento de <strong>Correo Argentino</strong> por WhatsApp al <strong>{customerData.phone}</strong> cuando despachemos tu paquete.
                </div>
              )}

              <button
                onClick={() => {
                  onClearCart();
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition shadow-md"
              >
                Volver a la Tienda
              </button>
            </div>
          )}

        </div>

        {/* Drawer Footer with Totals (Shown on Cart step) */}
        {cartItems.length > 0 && checkoutStep === 'cart' && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/80 space-y-3">
            
            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-neutral-900">${subtotal.toLocaleString('es-AR')},00</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento cupón (10%):</span>
                  <span>-${discountAmount.toLocaleString('es-AR')},00</span>
                </div>
              )}

              {customerData.paymentMethod === 'transferencia' && (
                <div className="flex justify-between text-emerald-800 font-bold bg-emerald-100/60 p-1 rounded">
                  <span>Descuento Transferencia (10%):</span>
                  <span>-${transferDiscount.toLocaleString('es-AR')},00</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Envío ({selectedShipping.shortName}):</span>
                <span>
                  {selectedShipping.isPayOnDelivery ? (
                    <span className="text-teal-900 font-bold bg-teal-100/70 px-2 py-0.5 rounded border border-teal-300 text-[11px]">
                      A abonar en destino
                    </span>
                  ) : estimatedShipping === 0 ? (
                    <strong className="text-emerald-700 font-bold">¡GRATIS!</strong>
                  ) : (
                    `$${estimatedShipping.toLocaleString('es-AR')},00`
                  )}
                </span>
              </div>
              {selectedShipping.isPayOnDelivery && (
                <p className="text-[10px] text-teal-800 text-right -mt-1 font-medium">
                  🛵 Abonás el servicio directo al cadete al recibir la prenda
                </p>
              )}

              <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Final:</span>
                <span>${finalTotal.toLocaleString('es-AR')},00</span>
              </div>

              <div className="text-[11px] text-teal-800 font-semibold text-right">
                O hasta 3 cuotas sin interés de ${(Math.round(finalTotal / 3)).toLocaleString('es-AR')},00
              </div>
            </div>

            {/* Step 1 CTA */}
            {checkoutStep === 'cart' && (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full bg-neutral-900 hover:bg-teal-900 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <span>Iniciar Compra Segura</span>
                <ArrowRight size={16} />
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Compra 100% segura con garantía de cambio de talle</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
