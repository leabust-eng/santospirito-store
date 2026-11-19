import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Star, CreditCard, Truck, ShieldCheck, Ruler, 
  Check, ArrowRight, Share2, AlertCircle, Sparkles, RefreshCw, Clock,
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, Move
} from 'lucide-react';
import ProductReviewsSection from './ProductReviewsSection';
import { getProductReviews } from '../data/productReviews';
import { getSizeStatus } from '../utils/sizeStatus';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onOpenSizeGuide, 
  onOpenVirtualFitting, 
  onOpenPaymentMethods 
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const firstAvailableSize = product.sizes?.find(s => getSizeStatus(s) !== 'agotado')?.size || null;
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [shippingQuote, setShippingQuote] = useState(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Lightbox Zoom / Ampliación en pantalla completa
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = Vista Completa (100% de la foto con rostro y hombros), 2 = Zoom Detalle
  const zoomContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const hasMovedRef = useRef(false);

  const images = (product.images && product.images.length > 0) ? product.images : ["/brand/og-banner.jpg"];
  const safeSelectedImage = selectedImage < images.length ? selectedImage : 0;
  const secondaryImage = images.length > 1 ? (safeSelectedImage === 0 ? 1 : 0) : 0;

  const installmentAmount = Math.round(product.price / 3);
  const transferPrice = Math.round(product.price * 0.90);
  const reviewsData = getProductReviews(product.id);

  // ── Accessibility: Dialog refs, focus trap, inert background ──
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Record what had focus before the modal opened
    const previouslyFocused = document.activeElement;

    // Mark the app root container as inert so screen readers / tab skip it
    const appRoot = document.getElementById('root');
    if (appRoot) appRoot.setAttribute('inert', '');

    // Delay focus to let the portal mount
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 30);

    const handleKeyDown = (e) => {
      // Escape closes the modal (unless the lightbox is open — that has its own handler)
      if (e.key === 'Escape' && !isZoomOpen) {
        e.stopPropagation();
        onClose();
        return;
      }
      // Tab trapping
      if (e.key !== 'Tab') return;
      const nodes = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      // Remove inert from app root
      if (appRoot) appRoot.removeAttribute('inert');
      // Restore focus to the element that opened the modal
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose, isZoomOpen]);

  const toggleZoom = (targetLevel) => {
    const nextLevel = targetLevel !== undefined ? targetLevel : (zoomLevel === 1 ? 2 : 1);
    setZoomLevel(nextLevel);
    if (nextLevel === 2) {
      setTimeout(() => {
        if (zoomContainerRef.current) {
          // Asegurar que el scroll empiece en 0 arriba (rostro, hombros y escote visibles de inmediato)
          zoomContainerRef.current.scrollTop = 0;
          const centerLeft = (zoomContainerRef.current.scrollWidth - zoomContainerRef.current.clientWidth) / 2;
          zoomContainerRef.current.scrollLeft = Math.max(0, centerLeft);
        }
      }, 50);
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel !== 2 || !zoomContainerRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: zoomContainerRef.current.scrollLeft,
      scrollTop: zoomContainerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !zoomContainerRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }
    zoomContainerRef.current.scrollLeft = startPosRef.current.scrollLeft - dx;
    zoomContainerRef.current.scrollTop = startPosRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  const handleImageClick = () => {
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    toggleZoom();
  };

  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      } else if (e.key === 'ArrowRight') {
        setZoomIndex(prev => (prev + 1) % images.length);
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setZoomIndex(prev => (prev - 1 + images.length) % images.length);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, images.length]);

  const handleCalculateShipping = (e) => {
    e.preventDefault();
    if (!postalCode.trim()) return;
    setIsCalculatingShipping(true);
    setTimeout(() => {
      setIsCalculatingShipping(false);
      const cpClean = postalCode.trim();
      const cpNum = parseInt(cpClean, 10) || 0;
      const isTucuman = (cpNum >= 4000 && cpNum <= 4178) || cpClean.startsWith('40') || cpClean.startsWith('41');
      const isBsAs = cpNum >= 1000 && cpNum <= 1900;

      if (isTucuman) {
        setShippingQuote({
          isTucuman: true,
          motoPayOnDelivery: true,
          sucursal: 4900,
          domicilio: 6400,
          diasMoto: "San Miguel de Tucumán y radio hasta 10 km • Se abona al recibir",
          diasSucursal: "Para distancias > 10 km o interior (2 a 3 días)",
          diasDomicilio: "Para distancias > 10 km o interior (1 a 2 días)"
        });
      } else {
        setShippingQuote({
          isTucuman: false,
          sucursal: isBsAs ? 4800 : 5900,
          domicilio: isBsAs ? 6400 : 7800,
          diasSucursal: isBsAs ? "2 a 3 días hábiles" : "3 a 5 días hábiles",
          diasDomicilio: isBsAs ? "1 a 3 días hábiles" : "2 a 4 días hábiles"
        });
      }
    }, 400);
  };

  const handleAdd = () => {
    if (!isCurrentAvailable) return;
    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const currentSizeObj = (product.sizes || []).find(s => s.size === selectedSize);
  const isCurrentAvailable = currentSizeObj && getSizeStatus(currentSizeObj) !== 'agotado';

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition shadow-sm"
          aria-label="Cerrar detalle de producto"
        >
          <X size={20} />
        </button>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Galería de 2 Imágenes Horizontales + Miniaturas (Sin deformación) */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              
              {/* Contenedor de 2 Imágenes Horizontales en paralelo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Imagen Horizontal 1: Vista Frontal / Chaqueta */}
                <div 
                  onClick={() => {
                    setZoomIndex(safeSelectedImage);
                    setZoomLevel(1);
                    setIsZoomOpen(true);
                  }}
                  className="relative aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group cursor-zoom-in"
                  title="Click para ampliar imagen y ver detalles de la tela"
                >
                  <img
                    src={images[safeSelectedImage]}
                    alt={`${product.name} vista frontal`}
                    className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                  />

                  {/* Logo Oficial SantoSpirito en prenda */}
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md pointer-events-none">
                    <img src="/brand/santospirito-iso-white.svg" alt="SantoSpirito" className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase font-serif">SantoSpirito</span>
                  </div>

                  <span className="absolute top-2.5 left-2.5 bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
                    {product.badge || "Vista Frontal"}
                  </span>

                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Foto {safeSelectedImage + 1} de {images.length}</span>
                  </div>

                  {/* Click to expand hover hint */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform">
                      <ZoomIn size={14} className="text-teal-400" />
                      <span>Click para ampliar</span>
                    </div>
                  </div>
                </div>

                {/* Imagen Horizontal 2: Vista Detalle / Confección / Pantalón */}
                <div 
                  onClick={() => {
                    setZoomIndex(secondaryImage);
                    setZoomLevel(1);
                    setIsZoomOpen(true);
                  }}
                  className="relative aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group cursor-zoom-in"
                  title="Click para ampliar imagen y ver detalles de la tela"
                >
                  <img
                    src={images[secondaryImage]}
                    alt={`${product.name} vista detalle`}
                    className="w-full h-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />

                  {/* Logo Oficial SantoSpirito en prenda */}
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md pointer-events-none">
                    <img src="/brand/santospirito-iso-white.svg" alt="SantoSpirito" className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase font-serif">SantoSpirito</span>
                  </div>

                  <span className="absolute top-2.5 left-2.5 bg-teal-900/90 backdrop-blur-sm text-teal-200 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
                    Detalle & Confección
                  </span>

                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Foto {secondaryImage + 1} de {images.length}</span>
                  </div>

                  {/* Click to expand hover hint */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform">
                      <ZoomIn size={14} className="text-teal-400" />
                      <span>Click para ampliar</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Tira de Miniaturas Horizontales debajo de las 2 fotos */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-14 w-20 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                      safeSelectedImage === idx 
                        ? "border-teal-700 shadow-md ring-2 ring-teal-500/30 scale-95" 
                        : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Tagline / Resumen */}
              {product.tagline && (
                <p className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-100 italic">
                  "{product.tagline}"
                </p>
              )}

              {/* Reseñas de Clientes Satisfechos (Visible en Desktop para ocupar el espacio en blanco) */}
              <div className="hidden lg:block">
                <ProductReviewsSection product={product} />
              </div>

            </div>

            {/* RIGHT COLUMN: Product Info & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Header: Gender & Category & Rating (Unificado 100% con las reseñas del producto) */}
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-1">
                    <span className="uppercase tracking-wider text-teal-800">
                      {product.gender} • {product.category}
                    </span>
                    <div 
                      className="flex items-center gap-1 text-amber-500"
                      title={`Puntaje promedio: ${reviewsData.rating} / 5 (${reviewsData.totalReviews} opiniones de colegas)`}
                    >
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-neutral-800">{reviewsData.rating}</span>
                      <span className="text-neutral-400">({reviewsData.totalReviews})</span>
                    </div>
                  </div>

                  <h1 id="product-detail-title" className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-xs text-neutral-500 mt-1">
                    Tejido: <strong className="text-neutral-700 font-semibold">{product.fabric}</strong>
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                      ${product.price.toLocaleString('es-AR')},00
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ${product.originalPrice.toLocaleString('es-AR')},00
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-rose-100 text-rose-700 font-bold text-xs px-2 py-0.5 rounded">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* 3 Cuotas sin interés */}
                  <div className="flex items-center gap-1.5 text-xs text-teal-900 font-semibold">
                    <CreditCard size={15} className="text-teal-700 flex-shrink-0" />
                    <span><strong>3 cuotas sin interés</strong> de <strong>${installmentAmount.toLocaleString('es-AR')},00</strong></span>
                  </div>

                  {/* Free Shipping Callout */}
                  <div className="text-xs text-emerald-800 font-medium bg-emerald-50/90 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Truck size={14} className="text-emerald-700" />
                      ENVÍO GRATIS a todo el país
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Superando $150.000
                    </span>
                  </div>

                  <button
                    onClick={onOpenPaymentMethods}
                    className="text-[11px] text-teal-700 hover:text-teal-900 underline font-semibold transition inline-block pt-0.5"
                  >
                    Ver todas las promociones bancarias y tarjetas →
                  </button>
                </div>

                {/* Color preview */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                      Color / Combinación Oficial:
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.colors.map((c, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 bg-white text-xs font-semibold text-neutral-800 shadow-2xs"
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-black/20" 
                            style={{ backgroundColor: c.hex }} 
                          />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Seleccionar Talle:{" "}
                      {selectedSize ? (
                        <span className="text-teal-800 font-black">{selectedSize}</span>
                      ) : (
                        <span className="text-red-700 font-bold">Sin Stock</span>
                      )}
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={onOpenVirtualFitting}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition"
                      >
                        <Sparkles size={11} className="text-amber-600" />
                        <span>Probador Virtual</span>
                      </button>

                      <button
                        onClick={onOpenSizeGuide}
                        className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 underline transition"
                      >
                        <Ruler size={11} />
                        <span>Guía de Talles</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                    {(product.sizes || []).map((s) => {
                      const status = getSizeStatus(s);
                      const isAvailable = status !== "agotado";
                      const isSelected = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          disabled={!isAvailable}
                          onClick={() => setSelectedSize(s.size)}
                          className={`py-2 text-xs font-bold rounded-lg border transition ${
                            status === "agotado"
                              ? "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-teal-900 border-teal-900 text-white shadow-md ring-2 ring-teal-700/30"
                              : status === "a-pedido"
                              ? "bg-white border-dashed border-teal-700 text-teal-800 hover:bg-teal-50"
                              : "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50"
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] mt-1.5 flex items-center gap-1">
                    {!currentSizeObj || getSizeStatus(currentSizeObj) === "agotado" ? (
                      <>
                        <AlertCircle size={12} className="text-red-600" />
                        <span className="text-red-700 font-semibold">Producto sin stock por el momento</span>
                      </>
                    ) : getSizeStatus(currentSizeObj) === "a-pedido" ? (
                      <>
                        <Clock size={12} className="text-amber-600" />
                        <span className="text-amber-800 font-semibold">A pedido — listo en 7 días hábiles</span>
                      </>
                    ) : (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-neutral-600">En stock — se despacha en 24 h</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 font-bold transition"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-neutral-900 min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 font-bold transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={!isCurrentAvailable}
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition active:scale-95 duration-150 ${
                      !isCurrentAvailable
                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300 shadow-none"
                        : addedSuccess
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-teal-800 hover:bg-teal-900 text-white"
                    }`}
                  >
                    {!isCurrentAvailable ? (
                      <>
                        <AlertCircle size={16} />
                        <span>Agotado por el Momento</span>
                      </>
                    ) : addedSuccess ? (
                      <>
                        <Check size={16} />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <span>Agregar al Carrito</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>

                {/* Free Shipping Cross-sell incentive */}
                <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200/80 text-emerald-950 text-xs">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Truck size={13} />
                  </span>
                  <div className="leading-tight">
                    <span className="font-extrabold text-emerald-900 block">¿Querés tu Envío 100% Bonificado?</span>
                    <span className="text-[11px] text-emerald-800">
                      Sumá otra prenda o alcanzá los <strong>$150.000</strong> y el envío por Correo Argentino te sale <strong>$0</strong>.
                    </span>
                  </div>
                </div>

                {/* Shipping Estimator (Matching Plavusa's Correo Argentino logic) */}
                <div className="pt-3 border-t border-neutral-200">
                  <form onSubmit={handleCalculateShipping} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        <Truck size={14} className="text-teal-700" />
                        <span>Calculá el costo de envío:</span>
                      </span>
                      <span className="text-[11px] text-teal-800 font-bold">Correo Argentino</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ingresá tu Código Postal (ej: 4000)..."
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                        maxLength={8}
                      />
                      <button
                        type="submit"
                        disabled={isCalculatingShipping}
                        className="bg-neutral-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition disabled:opacity-50"
                      >
                        {isCalculatingShipping ? 'Calculando...' : 'Calcular'}
                      </button>
                    </div>
                  </form>

                  {/* Shipping Results */}
                  {shippingQuote && (
                    <div className="mt-2.5 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2 animate-fade-in">
                      {shippingQuote.isTucuman ? (
                        <>
                          <div className="flex justify-between items-center text-teal-950 font-bold">
                            <span>🛵 Cadetería / Moto SantoSpirito:</span>
                            <span className="bg-teal-100 text-teal-900 px-2 py-0.5 rounded text-[11px]">
                              Abona al recibir
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-500 -mt-1">{shippingQuote.diasMoto}</p>

                          <div className="flex justify-between items-center pt-1.5 border-t border-neutral-200">
                            <div>
                              <span className="text-neutral-700">🏢 Retiro en Sucursal Correo Argentino:</span>
                              <span className="text-[10px] text-neutral-400 block">{shippingQuote.diasSucursal}</span>
                            </div>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.sucursal.toLocaleString('es-AR')},00</strong>
                          </div>

                          <div className="flex justify-between items-center pt-1.5 border-t border-neutral-200">
                            <div>
                              <span className="text-neutral-700">🏠 Domicilio Correo Argentino (&gt; 10 km / Interior):</span>
                              <span className="text-[10px] text-neutral-400 block">{shippingQuote.diasDomicilio}</span>
                            </div>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.domicilio.toLocaleString('es-AR')},00</strong>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-700">🏢 Retiro en Sucursal Correo Argentino:</span>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.sucursal.toLocaleString('es-AR')},00</strong>
                          </div>
                          <span className="text-[10px] text-neutral-400 block -mt-1">{shippingQuote.diasSucursal}</span>

                          <div className="flex justify-between items-center pt-1 border-t border-neutral-200">
                            <span className="text-neutral-700">🏠 Envío a Domicilio Clásico:</span>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.domicilio.toLocaleString('es-AR')},00</strong>
                          </div>
                          <span className="text-[10px] text-neutral-400 block -mt-1">{shippingQuote.diasDomicilio}</span>
                        </>
                      )}

                      {/* Free shipping booster hint */}
                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-emerald-900 bg-emerald-100/70 p-2 rounded-lg">
                        <span className="flex items-center gap-1 font-semibold">
                          <Sparkles size={12} className="text-emerald-700" />
                          <span>¡Bonificable a <strong>$0</strong> en pedidos superiores a $150.000!</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Structured Technical Specs (Matching Plavusa's format) */}
                {product.description && (
                  <div className="pt-4 border-t border-neutral-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Ficha Técnica y Confección:
                    </h4>
                    
                    <div className="text-xs text-neutral-700 space-y-2 bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-200/80">
                      {product.description.casaca && <p><strong>Casaca:</strong> {product.description.casaca}</p>}
                      {product.description.espalda && <p><strong>Espalda:</strong> {product.description.espalda}</p>}
                      {product.description.pantalon && <p><strong>Pantalón:</strong> {product.description.pantalon}</p>}
                      {product.description.composicion && <p><strong>Composición:</strong> <span className="text-teal-900 font-semibold">{product.description.composicion}</span></p>}
                    </div>

                    {product.description.cuidados && product.description.cuidados.length > 0 && (
                      <div className="text-[11px] text-neutral-500 space-y-1">
                        <p className="font-semibold text-neutral-700">Cuidados de la prenda:</p>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {product.description.cuidados.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Trust guarantee */}
                <div className="flex items-center gap-2 p-3 bg-teal-50/80 rounded-xl border border-teal-100 text-teal-900 text-xs">
                  <RefreshCw size={16} className="text-teal-700 flex-shrink-0" />
                  <span><strong>Garantía SantoSpirito:</strong> Si el talle no te queda como esperabas, podés cambiarlo de forma rápida y sencilla.</span>
                </div>

                {/* Reseñas de la Comunidad (Visible en Móvil al final para no entorpecer el botón de compra) */}
                <div className="lg:hidden pt-2">
                  <ProductReviewsSection product={product} />
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX / ZOOM MODAL */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fade-in select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsZoomOpen(false);
          }}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase font-serif text-teal-300">
                SantoSpirito
              </span>
              <span className="text-neutral-500">|</span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-100 line-clamp-1">
                {product.name}
              </span>
              <span className="text-xs text-neutral-400 hidden md:inline">
                • Foto {zoomIndex + 1} de {images.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom In/Out Toggle */}
              <button
                type="button"
                onClick={() => toggleZoom()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition shadow-sm ${
                  zoomLevel === 2
                    ? 'bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 ring-2 ring-amber-300/50'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
                title={zoomLevel === 1 ? "Acercar tela y detalles (2x)" : "Ver foto completa (1x)"}
              >
                {zoomLevel === 1 ? (
                  <>
                    <ZoomIn size={15} />
                    <span className="hidden sm:inline">Acercar tela y modelo</span>
                    <span className="sm:hidden">Zoom</span>
                  </>
                ) : (
                  <>
                    <ZoomOut size={15} />
                    <span className="hidden sm:inline">Ver foto completa</span>
                    <span className="sm:hidden">Alejar</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/10"
                aria-label="Cerrar ampliación"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Container */}
          <div 
            ref={zoomContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`relative flex-1 w-full my-2 sm:my-3 select-none no-scrollbar ${
              zoomLevel === 1 
                ? 'flex items-center justify-center overflow-hidden' 
                : 'overflow-y-auto overflow-x-auto flex items-start justify-center cursor-grab active:cursor-grabbing'
            }`}
          >
            {/* Prev Arrow (Fijo en el centro de la pantalla) */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomIndex(prev => (prev - 1 + images.length) % images.length);
                  setZoomLevel(1);
                }}
                className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 shadow-xl active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* The Image Element */}
            <div 
              onClick={handleImageClick}
              className={`transition-all duration-200 ${
                zoomLevel === 1 
                  ? 'cursor-zoom-in flex items-center justify-center max-h-[74vh]' 
                  : 'py-2 sm:py-4 flex flex-col items-center'
              }`}
            >
              <img
                src={images[zoomIndex]}
                alt={`${product.name} ampliada`}
                draggable={false}
                className={`rounded-xl shadow-2xl transition-all duration-200 object-contain ${
                  zoomLevel === 1 
                    ? 'max-h-[72vh] max-w-[92vw] sm:max-w-[85vw]' 
                    : 'w-auto h-auto min-h-[140vh] sm:min-h-[165vh] max-w-none'
                }`}
              />
            </div>

            {/* Next Arrow (Fijo en el centro de la pantalla) */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomIndex(prev => (prev + 1) % images.length);
                  setZoomLevel(1);
                }}
                className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 shadow-xl active:scale-95"
                aria-label="Foto siguiente"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Controls: Thumbnails & Tip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setZoomIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`relative h-12 w-14 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                    zoomIndex === idx 
                      ? 'border-teal-400 ring-2 ring-teal-400/50 scale-105' 
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <p className="text-[11px] text-neutral-400 text-center sm:text-right">
              {zoomLevel === 2 
                ? '✨ Hombros y rostro visibles al inicio • Deslizá o scrolleá para ver detalles de tela y pantalón' 
                : '💡 Hacé clic en la imagen o en "Acercar" para ver detalles de tela • Flechas o miniaturas para cambiar de vista'}
            </p>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
