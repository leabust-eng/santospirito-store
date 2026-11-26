import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Ruler,
  Phone,
  Sparkles,
  Instagram,
  Facebook,
  Clock
} from 'lucide-react';

const SHOP_COLUMNS = [
  {
    id: 'mujer',
    title: 'MUJER',
    links: [
      { label: 'Ambos', category: 'AMBOS MUJER', subCategory: null },
      { label: 'Ambos Spandex', category: 'AMBOS MUJER', subCategory: 'Spandex' },
      { label: 'Edición Tricolor', category: 'EDICIÓN TRICOLOR', subCategory: null },
      { label: 'Chaquetas', category: 'Chaquetas', subCategory: null },
      { label: 'Pantalones', category: 'Pantalones', subCategory: null }
    ]
  },
  {
    id: 'hombre',
    title: 'HOMBRE',
    links: [
      { label: 'Ambos', category: 'AMBOS HOMBRE', subCategory: null },
      { label: 'Ambos Spandex', category: 'AMBOS HOMBRE', subCategory: 'Spandex' },
      { label: 'Chaquetas', category: 'Chaquetas', subCategory: null },
      { label: 'Pantalones', category: 'Pantalones', subCategory: null }
    ]
  },
  {
    id: 'unisex',
    title: 'UNISEX & GUARDIA',
    links: [
      { label: 'Ambos Unisex', category: 'AMBOS UNISEX', subCategory: null },
      { label: 'Línea Quirúrgica / Azul Francia', category: 'AMBOS UNISEX', subCategory: 'Azul Francia' },
      { label: 'Enfermería', category: 'AMBOS UNISEX', subCategory: 'Clásicos' },
      { label: 'Ver todo el catálogo →', category: 'TODOS', subCategory: null, accent: true }
    ]
  }
];

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
  onOpenVirtualFitting,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  products,
  onGoHome,
  activeCategory,
  onSelectCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tagline || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsShopOpen(false);
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsShopOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [isSearchOpen]);

  const handleOpenShopHover = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsSearchOpen(false);
    setIsShopOpen(true);
  };

  const handleCloseShopHover = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsShopOpen(false);
    }, 150);
  };

  const handleNavigateCategory = (category, subCategory = null) => {
    if (category === 'TODOS' && !subCategory) {
      onGoHome();
    } else {
      setSearchQuery('');
      onSelectCategory({ category, subCategory });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsShopOpen(false);
    setMobileMenuOpen(false);
  };

  const currentCat = (activeCategory?.category || 'TODOS').toUpperCase();

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-2xs w-full"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr] items-center h-16 sm:h-[70px] gap-2">

          {/* LEFT ZONE: Desktop Single-Row Menu (Oh! Wear style) / Mobile Hamburger */}
          <div className="flex items-center">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setIsSearchOpen(false);
              }}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-800 hover:text-black rounded-lg focus:outline-none"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Primary Nav */}
            <nav
              aria-label="Navegación principal"
              className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] text-neutral-600"
            >
              <button
                type="button"
                onClick={() => handleNavigateCategory('TODOS', null)}
                className={`py-2 transition whitespace-nowrap border-b-2 ${
                  currentCat === 'TODOS' && !isShopOpen
                    ? 'text-neutral-950 border-neutral-900 font-bold'
                    : 'border-transparent hover:text-neutral-950'
                }`}
              >
                Inicio
              </button>

              {/* SHOP Mega-Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={handleOpenShopHover}
                onMouseLeave={handleCloseShopHover}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsShopOpen((prev) => !prev);
                  }}
                  aria-expanded={isShopOpen}
                  className={`flex items-center gap-1 py-2 transition whitespace-nowrap border-b-2 ${
                    isShopOpen
                      ? 'text-teal-900 border-teal-800 font-bold'
                      : 'border-transparent hover:text-neutral-950 text-neutral-900 font-bold'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isShopOpen ? 'rotate-180 text-teal-800' : 'text-neutral-500'}`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleNavigateCategory('LO NUEVO', 'Colección Spandex 2026')}
                title="Colección Spandex 2026"
                className={`py-2 transition whitespace-nowrap border-b-2 ${
                  currentCat === 'LO NUEVO'
                    ? 'text-teal-900 border-teal-800 font-bold'
                    : 'border-transparent hover:text-neutral-950'
                }`}
              >
                Lo Nuevo
              </button>

              <button
                type="button"
                onClick={() => handleNavigateCategory('OFERTAS', 'Piezas sueltas y promos')}
                title="Piezas sueltas / promos"
                className={`py-2 transition whitespace-nowrap border-b-2 ${
                  currentCat === 'OFERTAS'
                    ? 'text-rose-700 border-rose-600 font-bold'
                    : 'border-transparent hover:text-rose-700 text-neutral-800'
                }`}
              >
                Ofertas
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsShopOpen(false);
                  onOpenSizeGuide();
                }}
                className="py-2 transition whitespace-nowrap border-b-2 border-transparent hover:text-teal-900"
              >
                Guía de Talles
              </button>
            </nav>
          </div>

          {/* CENTER ZONE: Centered Brand Logo */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleNavigateCategory('TODOS', null)}
              className="flex items-center justify-center group cursor-pointer focus:outline-none"
              aria-label="SantoSpirito - Volver al inicio"
            >
              <img
                src="/brand/santospirito-logo-horizontal.svg"
                alt="SantoSpirito"
                className="h-7 sm:h-9 w-auto object-contain transition duration-200 group-hover:opacity-85"
              />
            </button>
          </div>

          {/* RIGHT ZONE: Minimal Actions (Vestuario Virtual + Search + Cart) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Vestuario Virtual pill */}
            <button
              type="button"
              onClick={() => {
                setIsShopOpen(false);
                onOpenVirtualFitting();
              }}
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-950 bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 px-3 py-1.5 rounded-full border border-teal-200/80 transition shadow-2xs active:scale-95 whitespace-nowrap"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span className="hidden xl:inline">Vestuario Virtual</span>
              <span className="xl:hidden">Probador 3D</span>
            </button>

            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => {
                setIsShopOpen(false);
                setMobileMenuOpen(false);
                setIsSearchOpen((prev) => !prev);
              }}
              className={`p-2 rounded-full transition ${
                isSearchOpen || searchQuery
                  ? 'bg-teal-50 text-teal-900'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
              aria-label="Buscar productos"
              aria-expanded={isSearchOpen}
            >
              <Search size={19} />
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 text-neutral-900 hover:text-teal-900 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-neutral-100 transition active:scale-95 shrink-0"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag size={20} />
              <span className="bg-neutral-900 text-white font-bold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP MEGA-MENU PANEL (Triggered by SHOP) */}
      {isShopOpen && (
        <div
          onMouseEnter={handleOpenShopHover}
          onMouseLeave={handleCloseShopHover}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-2xl z-50 animate-fade-in"
        >
          <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
            {SHOP_COLUMNS.map((col) => (
              <div key={col.id} className="space-y-3">
                <h3 className="text-xs font-extrabold tracking-[0.12em] uppercase text-neutral-900 border-b border-neutral-100 pb-2">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleNavigateCategory(item.category, item.subCategory)}
                        className={`text-left text-[13px] transition-colors ${
                          item.accent
                            ? 'font-bold text-teal-800 hover:text-teal-950 pt-1 inline-block'
                            : 'text-neutral-600 hover:text-black font-normal hover:translate-x-0.5 transition-transform'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 4: ACCESORIOS (En preparación) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-extrabold tracking-[0.12em] uppercase text-neutral-900">
                  ACCESORIOS
                </h3>
              </div>
              <div className="pt-0.5 space-y-2.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/80 px-2.5 py-1 rounded-full">
                  <Clock size={12} className="text-amber-600" />
                  En preparación
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Próximamente sumaremos cofias, camisolines, calzado clínico y complementos exclusivos SantoSpirito.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPANDABLE SEARCH BAR DRAWER */}
      {isSearchOpen && (
        <div className="border-t border-neutral-200 bg-white/98 backdrop-blur-md shadow-lg z-50 animate-fade-in">
          <div className="max-w-3xl mx-auto px-4 py-3.5 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-neutral-400" size={17} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar por modelo, color, tela Spandex o pieza suelta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-11 pr-20 py-2.5 bg-neutral-50 border border-neutral-300 rounded-full text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 px-2 py-1 rounded-full hover:bg-neutral-100 transition"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">
                <div className="px-3 py-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50 border-b border-neutral-100">
                  Resultados encontrados ({searchResults.length})
                </div>
                {searchResults.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onMouseDown={() => {
                      onSelectProduct(prod);
                      setSearchQuery('');
                      setIsSearchOpen(false);
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
                      <p className="text-[10px] text-emerald-600">
                        3 cuotas de ${Math.round(prod.price / 3).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE SLIDE-DOWN MENU WITH SHOP ACCORDION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white max-h-[82vh] overflow-y-auto px-4 py-4 space-y-3 shadow-xl animate-fade-in">
          <button
            type="button"
            onClick={() => handleNavigateCategory('TODOS', null)}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-neutral-900 bg-neutral-50"
          >
            Inicio
          </button>

          {/* SHOP Accordion */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileShopExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-neutral-50 text-xs font-extrabold uppercase tracking-wider text-neutral-900"
            >
              <span>Shop</span>
              <ChevronDown
                size={15}
                className={`transition-transform ${mobileShopExpanded ? 'rotate-180 text-teal-800' : ''}`}
              />
            </button>

            {mobileShopExpanded && (
              <div className="p-3.5 space-y-4 bg-white">
                {SHOP_COLUMNS.map((col) => (
                  <div key={col.id}>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 mb-1.5">
                      {col.title}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {col.links.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleNavigateCategory(item.category, item.subCategory)}
                          className={`text-left text-xs py-1 px-2 rounded hover:bg-neutral-50 ${
                            item.accent ? 'font-bold text-teal-800 col-span-2' : 'text-neutral-600'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Accesorios: En preparación */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900">
                    ACCESORIOS
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                    <Clock size={10} />
                    En preparación
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavigateCategory('LO NUEVO', 'Colección Spandex 2026')}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-teal-900 hover:bg-teal-50 transition"
          >
            Lo Nuevo · Colección Spandex 2026
          </button>

          <button
            type="button"
            onClick={() => handleNavigateCategory('OFERTAS', 'Piezas sueltas y promos')}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-rose-700 hover:bg-rose-50 transition"
          >
            Ofertas · Piezas sueltas / Promos
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenSizeGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
          >
            <Ruler size={14} className="text-teal-700" />
            <span>Guía de Talles</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenVirtualFitting();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold text-teal-950 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/70 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>Vestuario Virtual (Simulador 3D)</span>
          </button>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-around text-xs">
            <a
              href="https://wa.me/5493815307474"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 font-semibold py-1"
            >
              <Phone size={13} />
              <span>WhatsApp</span>
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="https://instagram.com/santospirito.ok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-pink-600 py-1"
            >
              <Instagram size={13} className="text-pink-500" />
              <span>Instagram</span>
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="https://www.facebook.com/santospirito.ok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-blue-600 py-1"
            >
              <Facebook size={13} className="text-blue-600" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
