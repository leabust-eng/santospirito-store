import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [expandedMobileGroup, setExpandedMobileGroup] = useState('mujer');
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

  // Prevent body scroll when mobile left drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

          {/* LEFT ZONE: Desktop Single-Row Menu / Mobile Hamburger */}
          <div className="flex items-center">
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

      {/* MOBILE LEFT SLIDE-OVER DRAWER (Oh! Wear style via Portal) */}
      {mobileMenuOpen && createPortal(
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil SantoSpirito"
        >
          {/* Dimmed backdrop on the right */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[1px] transition-opacity"
          />

          {/* Left Slide-Over Panel */}
          <div className="relative w-[82%] max-w-[330px] bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <img
                src="/brand/santospirito-logo-horizontal.svg"
                alt="SantoSpirito"
                className="h-6 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Scrollable Links */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
              <button
                type="button"
                onClick={() => handleNavigateCategory('TODOS', null)}
                className="w-full text-left py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-900 hover:text-teal-800 transition"
              >
                INICIO
              </button>

              {/* Category Groups directly expandable like Oh! Wear (MUJER ⌄, HOMBRE ⌄, UNISEX ⌄) */}
              {SHOP_COLUMNS.map((col) => {
                const isExpanded = expandedMobileGroup === col.id;
                return (
                  <div key={col.id} className="border-t border-neutral-100 pt-1">
                    <button
                      type="button"
                      onClick={() => setExpandedMobileGroup(isExpanded ? null : col.id)}
                      className="w-full flex items-center justify-between py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-900"
                    >
                      <span>{col.title}</span>
                      <ChevronDown
                        size={15}
                        className={`text-neutral-500 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-teal-800' : ''}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 pb-2.5 space-y-1.5">
                        {col.links.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleNavigateCategory(item.category, item.subCategory)}
                            className={`w-full text-left py-1.5 text-[13px] transition ${
                              item.accent ? 'font-bold text-teal-800' : 'text-neutral-600 hover:text-black'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ACCESORIOS (En preparación) */}
              <div className="border-t border-neutral-100 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
                  ACCESORIOS
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  <Clock size={10} />
                  En preparación
                </span>
              </div>

              <div className="border-t border-neutral-100 pt-1.5 space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleNavigateCategory('LO NUEVO', 'Colección Spandex 2026')}
                  className="w-full text-left py-2 text-xs font-bold uppercase tracking-[0.1em] text-teal-900 hover:text-teal-700 transition"
                >
                  LO NUEVO
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateCategory('OFERTAS', 'Piezas sueltas y promos')}
                  className="w-full text-left py-2 text-xs font-bold uppercase tracking-[0.1em] text-rose-700 hover:text-rose-800 transition"
                >
                  OFERTAS
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenSizeGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-700 hover:text-black flex items-center gap-2"
                >
                  <Ruler size={14} className="text-teal-700" />
                  <span>GUÍA DE TALLES</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenVirtualFitting();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left mt-1.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-950 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/70 flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Vestuario Virtual (3D)</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-neutral-100 px-5 py-3.5 bg-neutral-50/70 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 py-1"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={15} />
                  Mi Carrito
                </span>
                <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-1 border-t border-neutral-200/60">
                <a
                  href="https://wa.me/5493815307474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-700 font-semibold"
                >
                  <Phone size={12} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/santospirito.ok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-pink-600"
                >
                  <Instagram size={12} className="text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/santospirito.ok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Facebook size={12} className="text-blue-600" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
