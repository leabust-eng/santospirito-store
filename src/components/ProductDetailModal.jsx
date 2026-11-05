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
  onOpenPaymentMethods 
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || "S");
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [shippingQuote, setShippingQuote] = useState(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

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
          moto: 3500,
          sucursal: 4900,
          domicilio: 6400,
          diasMoto: "En el día o 24hs hábiles (Servimoto / PedidosYa)",
          diasRetiro: "A coordinar con SantoSpirito (San Miguel)",
          diasSucursal: "2 a 3 días hábiles (Interior)",
          diasDomicilio: "1 a 2 días hábiles"
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

  const currentSizeObj = product.sizes.find(s => s.size === selectedSize);

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
            
            {/* LEFT COLUMN: Gallery with Thumbnails (Plavusa Style) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3">
              
              {/* Thumbnails Sidebar */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[480px] no-scrollbar flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                      selectedImage === idx 
                        ? "border-teal-800 shadow-md scale-95" 
                        : "border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} miniatura ${idx + 1}`} 
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image View */}
              <div className="relative flex-1 aspect-[3/4] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition duration-300"
                />
                
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded tracking-wider uppercase shadow">
                    {product.badge}
                  </span>
                )}
                
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full">
                  Foto {selectedImage + 1} de {product.images.length}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Buying Box & Specifications */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Breadcrumbs */}
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Inicio &gt; {product.gender} &gt; {product.category} &gt; {product.fabric}
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-neutral-900 tracking-tight leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 italic">
                    {product.tagline}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="font-bold text-neutral-800">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} opiniones de colegas)</span>
                </div>

                {/* Pricing Box */}
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                      ${product.price.toLocaleString('es-AR')},00
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ${product.originalPrice.toLocaleString('es-AR')},00
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-xs bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* 3 Cuotas Highlight */}
                  <div className="flex items-center gap-2 text-xs text-teal-900 font-bold bg-teal-100/70 p-2 rounded-lg border border-teal-200">
                    <CreditCard size={16} className="text-teal-800 flex-shrink-0" />
                    <div>
                      <span>3 cuotas sin interés de </span>
                      <span className="text-sm underline">${installmentAmount.toLocaleString('es-AR')},00</span>
                    </div>
                  </div>

                  {/* Transfer discount */}
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span>💵 <strong>10% OFF</strong> con Transferencia Bancaria</span>
                    <strong className="font-extrabold text-sm">${transferPrice.toLocaleString('es-AR')},00</strong>
                  </div>

                  <button
                    onClick={onOpenPaymentMethods}
                    className="text-[11px] text-teal-800 hover:text-teal-950 font-bold underline decoration-dotted block text-right pt-1"
                  >
                    Ver todas las tarjetas, bancos y promociones →
                  </button>
                </div>

                {/* SIZE SELECTOR (The key requested feature!) */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                      <span>Seleccionar Talle:</span>
                      <span className="text-teal-800 font-extrabold">({selectedSize})</span>
                    </label>

                    {/* Guía de Talles Button */}
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1.5 underline decoration-teal-700 hover:scale-105 transition"
                    >
                      <Ruler size={14} />
                      <span>Ver Tabla de Medidas en cm</span>
                    </button>
                  </div>

                  {/* Size Pills */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s.size;
                      const hasStock = s.stock > 0;
                      return (
                        <button
                          key={s.size}
                          disabled={!hasStock}
                          onClick={() => setSelectedSize(s.size)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition flex flex-col items-center justify-center ${
                            isSelected
                              ? "bg-neutral-900 text-white border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                              : hasStock
                              ? "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900"
                              : "bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed line-through"
                          }`}
                        >
                          <span>{s.size}</span>
                          <span className="text-[9px] font-normal opacity-80">
                            {hasStock ? `${s.stock} disp.` : "Agotado"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {currentSizeObj && currentSizeObj.stock <= 3 && currentSizeObj.stock > 0 && (
                    <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                      <AlertCircle size={13} />
                      ¡Apurate! Quedan solo {currentSizeObj.stock} unidades en talle {selectedSize}
                    </p>
                  )}
                </div>

                {/* Quantity and Add to Cart Button */}
                <div className="flex items-center gap-3 pt-3">
                  <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-neutral-600 hover:bg-neutral-100 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 text-sm font-bold text-neutral-900 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-neutral-600 hover:bg-neutral-100 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                      addedSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-900 hover:bg-teal-900 text-white"
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check size={18} />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <span>Agregar al Carrito • ${(product.price * quantity).toLocaleString('es-AR')},00</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Calculador de Envíos (Correo Argentino & Cadetería Local Tucumán) */}
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-teal-800" />
                      <span>Calcular costo de envío / entrega:</span>
                    </div>
                  </div>

                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tu código postal (ej: 4000)"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      maxLength={8}
                      className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                    <button
                      type="submit"
                      disabled={isCalculatingShipping}
                      className="bg-neutral-800 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold transition disabled:opacity-50"
                    >
                      {isCalculatingShipping ? "Calculando..." : "Calcular"}
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setPostalCode('4000');
                        setShippingQuote({
                          isTucuman: true,
                          moto: 3500,
                          sucursal: 4900,
                          domicilio: 6400,
                          diasMoto: "En el día o 24hs hábiles (Servimoto / PedidosYa)",
                          diasRetiro: "A coordinar con SantoSpirito (San Miguel)",
                          diasSucursal: "2 a 3 días hábiles (Interior)",
                          diasDomicilio: "1 a 2 días hábiles"
                        });
                      }}
                      className="text-teal-700 hover:text-teal-900 font-bold underline"
                    >
                      📍 ¿Estás en Tucumán? Probá CP 4000
                    </button>
                    <a
                      href="https://www.correoargentino.com.ar/formularios/cpa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-700 underline"
                    >
                      Buscar mi código postal
                    </a>
                  </div>

                  {shippingQuote && (
                    <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5 text-xs animate-fade-in">
                      {shippingQuote.isTucuman ? (
                        <>
                          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200 text-[11px] font-bold text-teal-900">
                            <span>📍 Opciones en San Miguel de Tucumán y alrededores:</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-neutral-800 font-semibold flex items-center gap-1">
                                🛵 Cadetería Express (Servimoto / PedidosYa):
                              </span>
                              <span className="text-[10px] text-neutral-500 block">{shippingQuote.diasMoto}</span>
                            </div>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.moto.toLocaleString('es-AR')},00</strong>
                          </div>

                          <div className="flex justify-between items-center pt-1.5 border-t border-neutral-200">
                            <div>
                              <span className="text-emerald-900 font-bold flex items-center gap-1">
                                🤝 Entrega Personal / Retiro:
                              </span>
                              <span className="text-[10px] text-neutral-500 block">{shippingQuote.diasRetiro}</span>
                            </div>
                            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded">
                              ¡GRATIS!
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-1.5 border-t border-neutral-200">
                            <div>
                              <span className="text-neutral-700">🏢 Sucursal Correo Argentino (Interior):</span>
                              <span className="text-[10px] text-neutral-400 block">{shippingQuote.diasSucursal}</span>
                            </div>
                            <strong className="text-neutral-900 font-bold">${shippingQuote.sucursal.toLocaleString('es-AR')},00</strong>
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
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Ficha Técnica y Confección:
                  </h4>
                  
                  <div className="text-xs text-neutral-700 space-y-2 bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-200/80">
                    <p><strong>Casaca:</strong> {product.description.casaca}</p>
                    <p><strong>Espalda:</strong> {product.description.espalda}</p>
                    <p><strong>Pantalón:</strong> {product.description.pantalon}</p>
                    <p><strong>Composición:</strong> <span className="text-teal-900 font-semibold">{product.description.composicion}</span></p>
                  </div>

                  <div className="text-[11px] text-neutral-500 space-y-1">
                    <p className="font-semibold text-neutral-700">Cuidados de la prenda:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {product.description.cuidados.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

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
