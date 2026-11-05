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
import { SlidersHorizontal, Sparkles, Star, ShieldCheck, Heart, ArrowUpDown } from 'lucide-react';

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

  // Filter products
  let filteredProducts = products.filter(p => {
    // Category match
    if (activeCategory.category !== "TODOS") {
      const matchCat = p.category.toLowerCase().includes(activeCategory.category.toLowerCase()) ||
                       p.gender.toLowerCase().includes(activeCategory.category.toLowerCase());
      if (!matchCat) return false;
      if (activeCategory.subCategory) {
        const matchSub = p.subCategory.toLowerCase().includes(activeCategory.subCategory.toLowerCase()) ||
                         p.fabric.toLowerCase().includes(activeCategory.subCategory.toLowerCase());
        if (!matchSub) return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
                    p.fabric.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q);
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
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenVirtualFitting={() => handleOpenVirtualFitting('mujer')}
        />
      )}

      {/* 5. Trust Bar (Cuotas, Envíos, Cambios, Seguridad) */}
      <TrustBar />

      {/* 6. Main Product Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 tracking-tight">
              {activeCategory.category === "TODOS" 
                ? "Todos los Modelos Disponibles" 
                : `${activeCategory.category} ${activeCategory.subCategory ? `• ${activeCategory.subCategory}` : ''}`}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Mostrando {filteredProducts.length} productos con entrega inmediata y hasta 3 cuotas sin interés
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 flex items-center gap-1 font-semibold">
              <ArrowUpDown size={13} />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
            >
              <option value="destacados">Más Destacados</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-semibold text-neutral-600">
              No encontramos productos para "{searchQuery || activeCategory.category}".
            </p>
            <button
              onClick={() => {
                setActiveCategory({ category: "TODOS", subCategory: null });
                setSearchQuery('');
              }}
              className="bg-neutral-900 text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wider"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAdd={(p) => handleAddToCart({ ...p, selectedSize: "M", quantity: 1 })}
              />
            ))}
          </div>
        )}

        {/* Interactive Banner: "Guía de Talles & Asesoramiento Personalizado" */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 via-neutral-900 to-teal-950 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl z-10">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-widest bg-teal-800/60 px-3 py-1 rounded-full border border-teal-600/40">
              ¿DUDAS CON TU MEDIDA?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Calce anatómico y tabla de medidas en centímetros
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
              Cada ambo SantoSpirito está diseñado con tiro ergonómico y costuras reforzadas. Consultá nuestra tabla de medidas exactas para acertar a tu talle a la primera.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 z-10 flex-shrink-0">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="bg-white text-neutral-900 hover:bg-teal-50 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow transition active:scale-95 text-center"
            >
              Abrir Tabla de Talles
            </button>
            <a
              href="https://wa.me/5493815307474?text=Hola!%20Tengo%20dudas%20con%20el%20talle%20de%20un%20ambo,%20¿me%20podrían%20asesorar?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow transition active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-14 pt-8 border-t border-neutral-200 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
              Colegas que eligen SantoSpirito
            </h3>
            <p className="text-xs text-neutral-500">
              Más de 1.500 profesionales de la salud vestidos en toda la Argentina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-2xs">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "La calidad del Spandex del Ambo Plumetí Rosa es impresionante. Es el único que después de 14 horas de guardia no me hace transpirar y no se arruga. La tabla de talles fue exactísima."
              </p>
              <div className="text-xs font-bold text-neutral-900">
                Dra. Camila F. • Odontóloga (Córdoba)
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-2xs">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Compré el ambo de hombre gris y negro. Las costuras son hiper reforzadas y los bolsillos cargo súper cómodos para llevar el tensiómetro y celular. Llegó por Correo Argentino en 3 días."
              </p>
              <div className="text-xs font-bold text-neutral-900">
                Lic. Martín G. • Kinesiólogo (Tucumán)
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-2xs">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "La chaqueta Dior bicolor te hace ver elegante y prolija al instante. Pagué en 3 cuotas sin interés y la atención por WhatsApp de las chicas fue de diez."
              </p>
              <div className="text-xs font-bold text-neutral-900">
                Dra. María Laura R. • Dermatóloga (Buenos Aires)
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <Footer 
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectCategory={setActiveCategory}
        onGoHome={handleGoHome}
      />

      {/* 8. Floating WhatsApp */}
      <WhatsAppFloating />

      {/* 9. Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenVirtualFitting={(g) => handleOpenVirtualFitting(g || 'mujer')}
          onOpenPaymentMethods={() => setIsPaymentModalOpen(true)}
        />
      )}

      {/* 10. Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onOpenVirtualFitting={(g) => handleOpenVirtualFitting(g || 'mujer')}
      />

      {/* 11. Virtual Fitting Modal (Simulador y Vestuario Virtual) */}
      <VirtualFittingModal
        isOpen={isVirtualFittingOpen}
        onClose={() => setIsVirtualFittingOpen(false)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectSizeFilter={handleSelectSizeFromFitter}
        initialGender={virtualFittingGender}
      />

      {/* 12. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 12. Payment Methods Modal */}
      <PaymentMethodsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

    </div>
  );
}
