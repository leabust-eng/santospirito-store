import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, HelpCircle, Ruler, Phone } from 'lucide-react';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSizeGuide,
  searchQuery, 
  setSearchQuery,
  onSelectProduct,
  products
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-black rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo (SantoSpirito) */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex flex-col items-center group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm">
                  S
                </div>
                <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 group-hover:text-teal-900 transition">
                  SantoSpirito
                </span>
              </div>
              <span className="text-[9px] tracking-[0.28em] uppercase font-semibold text-neutral-500 -mt-0.5">
                Ambos de Diseño • Colección 2026
              </span>
            </a>
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
              className="relative flex items-center gap-2 bg-neutral-900 hover:bg-teal-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition active:scale-95"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">MI CARRITO</span>
              <span className="bg-emerald-500 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
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
      </div>
    </header>
  );
}
