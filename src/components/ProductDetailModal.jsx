import React, { useState } from 'react';
import { 
  X, Star, CreditCard, Truck, ShieldCheck, Ruler, 
  Check, ArrowRight, Share2, AlertCircle, Sparkles, RefreshCw
} from 'lucide-react';

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
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || "S");
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [shippingQuote, setShippingQuote] = useState(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = (product.images && product.images.length > 0) ? product.images : ["/brand/og-banner.jpg"];
  const safeSelectedImage = selectedImage < images.length ? selectedImage : 0;
  const secondaryImage = images.length > 1 ? (safeSelectedImage === 0 ? 1 : 0) : 0;

  const installmentAmount = Math.round(product.price / 3);
  const transferPrice = Math.round(product.price * 0.90);

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
          diasRetiro: "A coordinar con SantoSpirito (San Miguel)",
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
    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const currentSizeObj = (product.sizes || []).find(s => s.size === selectedSize);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition shadow-sm"
          aria-label="Cerrar"
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
                <div className="relative aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group">
                  <img
                    src={images[safeSelectedImage]}
                    alt={`${product.name} vista frontal`}
                    className="w-full h-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />

                  {/* Logo Oficial SantoSpirito en prenda */}
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md pointer-events-none">
                    <img src="/brand/santospirito-iso-white.svg" alt="SantoSpirito" className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase font-serif">SantoSpirito</span>
                  </div>

                  <span className="absolute top-2.5 left-2.5 bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
                    {product.badge || "Vista Frontal"}
                  </span>

                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                    Foto {safeSelectedImage + 1} de {images.length}
                  </div>
                </div>

                {/* Imagen Horizontal 2: Vista Detalle / Confección / Pantalón */}
                <div 
                  onClick={() => setSelectedImage(secondaryImage)}
                  className="relative aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group cursor-pointer"
                  title="Click para alternar vista"
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

                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                    Foto {secondaryImage + 1} de {images.length}
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

            </div>

            {/* RIGHT COLUMN: Product Info & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Header: Gender & Category & Rating */}
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-1">
                    <span className="uppercase tracking-wider text-teal-800">
                      {product.gender} • {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={13} fill="currentColor" />
                      <span className="font-bold text-neutral-800">{product.rating}</span>
                      <span className="text-neutral-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
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

                  {/* Transferencia discount */}
                  <div className="text-xs text-emerald-700 font-medium bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60">
                    💵 <strong>${transferPrice.toLocaleString('es-AR')},00</strong> pagando con Transferencia Bancaria (<strong>10% OFF</strong>)
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
                      Seleccionar Talle: <span className="text-teal-800 font-black">{selectedSize}</span>
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
                      const isAvailable = s.stock > 0;
                      const isSelected = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          disabled={!isAvailable}
                          onClick={() => setSelectedSize(s.size)}
                          className={`py-2 text-xs font-bold rounded-lg border transition ${
                            isSelected
                              ? "bg-teal-900 border-teal-900 text-white shadow-md ring-2 ring-teal-700/30"
                              : isAvailable
                              ? "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50"
                              : "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed line-through"
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>

                  {currentSizeObj && (
                    <p className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1">
                      <Check size={12} className="text-emerald-600" />
                      <span>Stock disponible para entrega inmediata ({currentSizeObj.stock} unidades en talle {selectedSize}).</span>
                    </p>
                  )}
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
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition active:scale-95 duration-150 ${
                      addedSuccess
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-teal-800 hover:bg-teal-900 text-white"
                    }`}
                  >
                    {addedSuccess ? (
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

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
