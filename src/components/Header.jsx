import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, HelpCircle, Ruler, Phone, Sparkles, Instagram, Facebook } from 'lucide-react';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSizeGuide,
  onOpenVirtualFitting,
  searchQuery, 
  setSearchQuery,
  onSelectProduct,
  products,
  onGoHome
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-neutral-700 hover:text-black rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Logo (SantoSpirito) - Resets to Home */}
          <div className="flex-1 flex items-center justify-center lg:justify-start lg:flex-initial min-w-0">
            <button 
              onClick={onGoHome} 
              className="flex flex-col items-center sm:items-start group cursor-pointer text-left focus:outline-none max-w-full"
              aria-label="Volver a la página de inicio"
            >
              <img 
                src="/brand/santospirito-logo-horizontal.svg" 
                alt="SantoSpirito" 
                className="h-8 sm:h-10 w-auto object-contain transition duration-200 group-hover:opacity-90"
              />
              <span className="hidden sm:block text-[9px] tracking-[0.22em] uppercase font-bold text-neutral-500 mt-0.5 truncate">
                Expresa tu Stilo • Colección 2026
              </span>
            </button>
          </div>

          {/* Search bar (Central, matching Plavusa) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿Qué ambo o chaqueta estás buscando?..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-full text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition"
              />
              <Search className="absolute left-3.5 top-3 text-neutral-400" size={17} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant search dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50 border-b border-neutral-100">
                  Resultados encontrados ({searchResults.length})
                </div>
                {searchResults.map(prod => (
                  <button
                    key={prod.id}
                    onMouseDown={() => {
                      onSelectProduct(prod);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-neutral-50 text-left transition border-b border-neutral-100 last:border-b-0"
                  >
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name} 
                      className="w-12 h-12 object-cover rounded-md bg-neutral-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 truncate">{prod.name}</p>
                      <p className="text-[11px] text-teal-800 font-bold">${prod.price.toLocaleString('es-AR')}</p>
                      <p className="text-[10px] text-emerald-600">3 cuotas de ${(Math.round(prod.price / 3)).toLocaleString('es-AR')}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Virtual Fitting trigger */}
            <button
              onClick={onOpenVirtualFitting}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-teal-950 bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 px-3 py-1.5 rounded-full border border-teal-200/80 transition shadow-2xs active:scale-95"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>Vestuario Virtual</span>
            </button>

            {/* Size chart trigger */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-teal-900 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition"
            >
              <Ruler size={15} className="text-teal-700" />
              <span>Guía de Talles</span>
            </button>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/5493815307474?text=Hola!%20Quería%20hacer%20una%20consulta%20sobre%20los%20ambos%20SantoSpirito"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition"
            >
              <Phone size={15} className="text-emerald-600" />
              <span>Asesoría</span>
            </a>

            {/* Cart Button with Counter */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-neutral-900 hover:bg-teal-900 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition active:scale-95 shrink-0"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag size={16} />
              <span className="hidden md:inline">MI CARRITO</span>
              <span className="bg-emerald-500 text-white font-bold text-[10px] sm:text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-2.5 px-0.5">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar ambo, chaqueta o color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-full text-xs text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={15} />
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-neutral-200 space-y-2 animate-fade-in bg-white">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-bold text-teal-900 bg-teal-50"
              >
                🏠 Inicio / Todos los Productos
              </button>
              <button
                onClick={() => {
                  onOpenVirtualFitting();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-bold text-teal-950 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/70 hover:bg-teal-100 flex items-center gap-2"
              >
                <Sparkles size={14} className="text-amber-500" />
                <span>✨ Vestuario Virtual (Simulador 3D)</span>
              </button>
              <button
                onClick={() => {
                  onOpenSizeGuide();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
              >
                <Ruler size={14} className="text-teal-700" />
                <span>Tabla de Medidas y Talles</span>
              </button>
              <a
                href="https://wa.me/5493815307474"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
              >
                <Phone size={14} />
                <span>Asesoría por WhatsApp</span>
              </a>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-around text-xs">
                <a
                  href="https://instagram.com/santospirito.ok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-pink-600 py-1"
                >
                  <Instagram size={14} className="text-pink-500" />
                  <span>Instagram</span>
                </a>
                <span className="text-neutral-300">|</span>
                <a
                  href="https://www.facebook.com/santospirito.ok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-blue-600 py-1"
                >
                  <Facebook size={14} className="text-blue-600" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
