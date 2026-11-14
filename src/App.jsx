import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import TrustBar from './components/TrustBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import SizeGuideModal from './components/SizeGuideModal';
import VirtualFittingModal from './components/VirtualFittingModal';
import CartDrawer from './components/CartDrawer';
import PaymentMethodsModal from './components/PaymentMethodsModal';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import { products } from './data/products';
import { SlidersHorizontal, Sparkles, Star, ShieldCheck, Heart, ArrowUpDown, CheckCircle2, PackageCheck, X, Clock, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Cart persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('santospirito_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('santospirito_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Capturar retorno de pago desde Mercado Pago (Aprobado, Pendiente Efectivo/Rapipago, Rechazado)
  const [orderFeedback, setOrderFeedback] = useState(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const collectionStatus = (params.get('collection_status') || '').toLowerCase();
      const statusParam = (params.get('status') || '').toLowerCase();
      const paymentType = (params.get('payment_type') || '').toLowerCase();
      const mpBack = (params.get('mp_back') || '').toLowerCase();
      const order = params.get('order') || params.get('external_reference');

      // Si no hay ningún parámetro de retorno de Mercado Pago, no hacer nada
      if (!collectionStatus && !statusParam && !mpBack && !paymentType) {
        return;
      }

      const cleanOrderId = order || `SP-${Math.floor(100000 + Math.random() * 900000)}`;

      // Detección precisa del estado:
      // Si el medio es ticket (Rapipago / Pago Fácil) o status es pending/in_process
      const isTicket = paymentType === 'ticket';
      const isPending = isTicket || collectionStatus === 'pending' || collectionStatus === 'in_process' || statusParam === 'pending' || mpBack === 'pending';
      const isApproved = (collectionStatus === 'approved' || statusParam === 'approved' || mpBack === 'success') && !isPending;
      const isRejected = collectionStatus === 'rejected' || statusParam === 'rejected' || mpBack === 'failure';

      if (isApproved) {
        setCartItems([]);
        try { localStorage.removeItem('santospirito_cart'); } catch (e) {}
        setOrderFeedback({
          type: 'approved',
          orderId: cleanOrderId
        });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (isPending) {
        setCartItems([]);
        try { localStorage.removeItem('santospirito_cart'); } catch (e) {}
        setOrderFeedback({
          type: 'pending',
          orderId: cleanOrderId,
          isCash: isTicket
        });
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (isRejected) {
        // En pago rechazado no vaciamos el carrito para que el cliente pueda reintentar
        setOrderFeedback({
          type: 'rejected',
          orderId: cleanOrderId
        });
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Filters and Navigation
  const [activeCategory, setActiveCategory] = useState({ category: "TODOS", subCategory: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('destacados');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVirtualFittingOpen, setIsVirtualFittingOpen] = useState(false);
  const [virtualFittingGender, setVirtualFittingGender] = useState('mujer');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenVirtualFitting = (g = 'mujer') => {
    setVirtualFittingGender(g);
    setIsVirtualFittingOpen(true);
  };

  const handleSelectSizeFromFitter = (size, g) => {
    setActiveCategory({ 
      category: g === 'mujer' ? "AMBOS MUJER" : "AMBOS HOMBRE", 
      subCategory: null 
    });
    window.scrollTo({ top: 550, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (itemToAdd) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        it => it.id === itemToAdd.id && it.selectedSize === itemToAdd.selectedSize
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += itemToAdd.quantity;
        return next;
      }
      return [...prev, itemToAdd];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems(prev => 
      prev.map(it => (it.id === id && it.selectedSize === size) ? { ...it, quantity: newQty } : it)
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems(prev => prev.filter(it => !(it.id === id && it.selectedSize === size)));
  };

  const handleClearCart = () => setCartItems([]);

  // Filter products safely
  let filteredProducts = (products || []).filter(p => {
    if (!p) return false;

    // Category match
    if (activeCategory?.category && activeCategory.category !== "TODOS") {
      const activeCat = activeCategory.category.toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pGender = (p.gender || '').toLowerCase();
      const matchCat = pCat.includes(activeCat) || 
                       pGender.includes(activeCat) || 
                       activeCat.includes(pCat) || 
                       activeCat.includes(pGender) ||
                       (activeCat.includes('tricolor') && (p.name.toLowerCase().includes('tricolor') || (p.badge || '').toLowerCase().includes('tricolor')));
      if (!matchCat) return false;

      if (activeCategory.subCategory) {
        const activeSub = activeCategory.subCategory.toLowerCase();
        const pSub = (p.subCategory || '').toLowerCase();
        const pFabric = (p.fabric || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        const matchSub = pSub.includes(activeSub) || pFabric.includes(activeSub) || pName.includes(activeSub);
        if (!matchSub) return false;
      }
    }

    // Search query match
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = (p.name || '').toLowerCase().includes(q) ||
                    (p.fabric || '').toLowerCase().includes(q) ||
                    (p.category || '').toLowerCase().includes(q) ||
                    (p.tagline || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Sorting
  if (sortBy === 'precio-menor') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-mayor') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const totalCartUnits = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleGoHome = () => {
    setActiveCategory({ category: "TODOS", subCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#faf9f8] text-[#222]">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar 
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)} 
        onOpenVirtualFitting={() => handleOpenVirtualFitting('mujer')}
      />

      {/* 2. Header */}
      <Header
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenVirtualFitting={() => handleOpenVirtualFitting('mujer')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(p) => setSelectedProduct(p)}
        products={products}
        onGoHome={handleGoHome}
      />

      {/* 3. Multi-level Navigation (Matching Plavusa) */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenVirtualFitting={() => handleOpenVirtualFitting('mujer')}
        onGoHome={handleGoHome}
      />

      {/* 4. Hero Carousel (Shows on home view) */}
      {activeCategory.category === "TODOS" && !searchQuery && (
        <HeroCarousel
          onSelectCategory={setActiveCategory}
          onSelectProduct={(slugOrProduct) => {
            if (typeof slugOrProduct === 'string') {
              const found = products.find(p => p.slug === slugOrProduct || p.id === slugOrProduct);
              if (found) {
                setSelectedProduct(found);
              }
            } else {
              setSelectedProduct(slugOrProduct);
            }
          }}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenVirtualFitting={() => handleOpenVirtualFitting('mujer')}
        />
      )}

      {/* 5. Trust Bar */}
      <TrustBar onOpenPaymentMethods={() => setIsPaymentModalOpen(true)} />

      {/* 6. Main Product Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 tracking-wider uppercase mb-1">
              <Sparkles size={14} className="text-teal-600" />
              <span>Colección SantoSpirito 2026</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {activeCategory.category === "TODOS" 
                ? (searchQuery ? `Resultados para "${searchQuery}"` : "Catálogo Oficial de Ambos Médicos Spandex") 
                : `${activeCategory.category} ${activeCategory.subCategory ? `• ${activeCategory.subCategory}` : ''}`}
            </h1>
            
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
              Prendas médicas de diseño confeccionadas con materiales de calidad superior, elasticidad Spandex y calce anatómico. Mostrando {filteredProducts.length} modelos disponibles.
            </p>
          </div>

          {/* Controls: Reset filters and Sort */}
          <div className="flex items-center gap-3">
            {(activeCategory.category !== "TODOS" || searchQuery) && (
              <button
                onClick={handleGoHome}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg transition"
              >
                Limpiar Filtros ✕
              </button>
            )}

            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-white border border-neutral-300 rounded-lg pl-3 pr-8 py-2 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-700 transition cursor-pointer appearance-none shadow-2xs"
              >
                <option value="destacados">Ordenar: Destacados</option>
                <option value="precio-menor">Precio: Menor a Mayor</option>
                <option value="precio-mayor">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
              <ArrowUpDown size={13} className="absolute right-2.5 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAdd={(p) => handleAddToCart({ ...p, selectedSize: p.sizes[0]?.size || 'S', quantity: 1 })}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-white rounded-2xl border border-neutral-200 mt-6 p-6">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <SlidersHorizontal size={28} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">No encontramos productos con estos filtros</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Probá seleccionando "Todos los Productos" o buscando con otro término (ej. Spandex, Menta, Azul, Arciel).
            </p>
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        )}

        {/* Size Helper Banner in-catalog */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 via-neutral-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-bold text-teal-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full">
              Asistencia personalizada
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              ¿Dudas con tu talle ideal?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Utilizá nuestro <strong>Probador Virtual Interactivo</strong> o consultá la tabla anatómica con medidas exactas de busto, cintura y cadera.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenVirtualFitting('mujer')}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition shadow-lg active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Abrir Probador Virtual</span>
            </button>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition active:scale-95"
            >
              Ver Tabla de Medidas
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 pt-12 border-t border-neutral-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
              Lo que opinan las profesionales de la salud
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Más de 2.000 médicas, odontólogas, bioquímicas y enfermeras eligen SantoSpirito en todo el país.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Excelente calidad de la tela Spandex, no se deforma ni destiñe con los lavados continuos. El calce es perfecto, super cómodo para guardias de 24hs."
              </p>
              <div className="text-[11px] font-bold text-neutral-900 pt-1 border-t border-neutral-100">
                Dra. Mariana Lucero • <span className="text-neutral-500 font-normal">San Miguel de Tucumán</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "El modelo Tricolor Menta & Blanco es soñado. Me preguntaron todas mis colegas del hospital dónde lo compré. Envío super rápido a Córdoba."
              </p>
              <div className="text-[11px] font-bold text-neutral-900 pt-1 border-t border-neutral-100">
                Lic. Camila Benítez • <span className="text-neutral-500 font-normal">Córdoba Capital</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Atención impecable por WhatsApp, me asesoraron con el talle y me quedó pintado. El descuento por transferencia es real y conveniente."
              </p>
              <div className="text-[11px] font-bold text-neutral-900 pt-1 border-t border-neutral-100">
                Dra. Sofía Racedo • <span className="text-neutral-500 font-normal">Yerba Buena, Tucumán</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <Footer 
        onSelectCategory={setActiveCategory}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenPaymentMethods={() => setIsPaymentModalOpen(true)}
      />

      {/* 8. WhatsApp Floating Button with live pulse */}
      <WhatsAppFloating />

      {/* 9. Product Detail Modal (Horizontal Dual Image Layout) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenSizeGuide={() => {
            setSelectedProduct(null);
            setIsSizeGuideOpen(true);
          }}
          onOpenVirtualFitting={() => {
            const g = selectedProduct.gender === 'Hombre' ? 'hombre' : 'mujer';
            setSelectedProduct(null);
            handleOpenVirtualFitting(g);
          }}
          onOpenPaymentMethods={() => setIsPaymentModalOpen(true)}
        />
      )}

      {/* 10. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenPaymentMethods={() => setIsPaymentModalOpen(true)}
      />

      {/* 11. Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onOpenVirtualFitting={() => {
          setIsSizeGuideOpen(false);
          handleOpenVirtualFitting('mujer');
        }}
      />

      {/* 12. Virtual Fitting Interactive Modal */}
      <VirtualFittingModal
        isOpen={isVirtualFittingOpen}
        onClose={() => setIsVirtualFittingOpen(false)}
        initialGender={virtualFittingGender}
        onSelectSize={handleSelectSizeFromFitter}
      />

      {/* 13. Payment Methods Modal */}
      <PaymentMethodsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* 14. Mercado Pago Status Modal (Approved, Pending Cash/Rapipago, Rejected) */}
      {orderFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 sm:p-8 text-center space-y-4">
            <button
              onClick={() => setOrderFeedback(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 transition"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* Icon by State */}
            {orderFeedback.type === 'approved' && (
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 size={36} />
              </div>
            )}
            {orderFeedback.type === 'pending' && (
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Clock size={36} />
              </div>
            )}
            {orderFeedback.type === 'rejected' && (
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <XCircle size={36} />
              </div>
            )}

            {/* Headers by State */}
            <div>
              {orderFeedback.type === 'approved' && (
                <>
                  <span className="text-[10px] font-extrabold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Pago Aprobado con Éxito
                  </span>
                  <h2 className="text-xl font-black text-neutral-900 mt-2">
                    ¡Gracias por tu compra!
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Tu pago fue procesado correctamente a través de Mercado Pago.
                  </p>
                </>
              )}

              {orderFeedback.type === 'pending' && (
                <>
                  <span className="text-[10px] font-extrabold tracking-widest text-amber-900 uppercase bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                    Cupón Generado • Pendiente de Pago
                  </span>
                  <h2 className="text-xl font-black text-neutral-900 mt-2">
                    ¡Pedido Registrado con Éxito!
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    Generaste tu cupón para abonar en efectivo por Rapipago o Pago Fácil. Recordá abonarlo antes de su fecha de vencimiento.
                  </p>
                </>
              )}

              {orderFeedback.type === 'rejected' && (
                <>
                  <span className="text-[10px] font-extrabold tracking-widest text-rose-900 uppercase bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300">
                    Pago No Completado
                  </span>
                  <h2 className="text-xl font-black text-neutral-900 mt-2">
                    No pudimos procesar el pago
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    La tarjeta o entidad bancaria no autorizó la operación. Tus prendas continúan guardadas en el carrito.
                  </p>
                </>
              )}
            </div>

            {/* Info Summary Box */}
            <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200/80 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">N° de Pedido:</span>
                <strong className="text-teal-900 font-bold">{orderFeedback.orderId}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Estado de la Orden:</span>
                {orderFeedback.type === 'approved' && (
                  <span className="text-emerald-700 font-bold">En Preparación / Despacho</span>
                )}
                {orderFeedback.type === 'pending' && (
                  <span className="text-amber-700 font-bold">Aguardando Pago en Efectivo</span>
                )}
                {orderFeedback.type === 'rejected' && (
                  <span className="text-rose-700 font-bold">Cancelado / Rechazado</span>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[11px] text-neutral-600">
                {orderFeedback.type === 'approved' && (
                  <>📦 <strong>Tiempos estimados:</strong> 24 a 48 hs para San Miguel de Tucumán o 2 a 5 días hábiles por Correo Argentino. Te enviamos los detalles a tu correo.</>
                )}
                {orderFeedback.type === 'pending' && (
                  <>⏳ <strong>Aclaración importante:</strong> Prepararemos y despacharemos tu prenda apenas Rapipago / Mercado Pago nos notifique que el pago fue realizado en sucursal.</>
                )}
                {orderFeedback.type === 'rejected' && (
                  <>💡 <strong>Sugerencia:</strong> Podés intentar con otra tarjeta o elegir la opción de <strong>Transferencia Bancaria (10% OFF adicional)</strong>.</>
                )}
              </div>
            </div>

            {/* Actions by State */}
            <div className="space-y-2 pt-2">
              {orderFeedback.type === 'approved' && (
                <a
                  href={`https://wa.me/5493815307474?text=¡Hola%20SantoSpirito!%20Acabo%20de%20realizar%20mi%20compra%20con%20tarjeta%20por%20Mercado%20Pago%20(Pedido%20${orderFeedback.orderId}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95"
                >
                  <span>Avisar al Taller por WhatsApp</span>
                </a>
              )}

              {orderFeedback.type === 'pending' && (
                <a
                  href={`https://wa.me/5493815307474?text=¡Hola%20SantoSpirito!%20Generé%20un%20cupón%20de%20pago%20en%20efectivo%20(Rapipago/Pago%20Fácil)%20para%20el%20pedido%20${orderFeedback.orderId}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95"
                >
                  <span>Consultar por WhatsApp</span>
                </a>
              )}

              {orderFeedback.type === 'rejected' && (
                <button
                  onClick={() => {
                    setOrderFeedback(null);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95"
                >
                  <span>Reintentar con otro medio</span>
                </button>
              )}

              <button
                onClick={() => setOrderFeedback(null)}
                className="w-full py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
