import React from 'react';
import { Eye, ShoppingBag, Sparkles, Star } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, onQuickAdd }) {
  const installmentAmount = Math.round(product.price / 3);
  const transferPrice = Math.round(product.price * 0.90);

  return (
    <div className="group relative bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Badge Top Left */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.badge && (
          <span className="bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase shadow-sm">
            {product.badge}
          </span>
        )}
        {product.discount && (
          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
            {product.discount}
          </span>
        )}
      </div>

      {/* Image Container with Hover zoom */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Second image preview on hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} vista 2`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        )}

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white text-neutral-900 hover:bg-neutral-100 py-2 rounded-lg text-xs font-bold tracking-wider uppercase shadow transition active:scale-95"
          >
            <Eye size={14} />
            <span>Ver Detalles y Talles</span>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
            <span className="uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={11} fill="currentColor" />
              <span>{product.rating}</span>
              <span className="text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-teal-900 cursor-pointer line-clamp-2 mt-1 leading-snug tracking-tight"
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Installments (Matching Plavusa exactly) */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-neutral-900">
              ${product.price.toLocaleString('es-AR')},00
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')},00
              </span>
            )}
          </div>

          {/* 3 Cuotas sin interés callout */}
          <div className="mt-1 flex items-center gap-1 text-[11px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded inline-flex">
            <span className="font-bold text-teal-900">3</span>
            <span>cuotas sin interés de</span>
            <span className="font-bold text-teal-900">${installmentAmount.toLocaleString('es-AR')},00</span>
          </div>

          {/* Transfer discount preview */}
          <div className="text-[10px] text-emerald-700 font-medium mt-1">
            o <strong className="font-bold">${transferPrice.toLocaleString('es-AR')},00</strong> pagando con Transferencia (10% OFF)
          </div>
        </div>

        {/* Sizes Pill Preview */}
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-neutral-400 font-semibold mr-1">Talles:</span>
            {product.sizes.map((s) => (
              <span 
                key={s.size} 
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  s.stock > 0 
                    ? "border-neutral-200 text-neutral-700 bg-neutral-50" 
                    : "border-neutral-100 text-neutral-300 line-through"
                }`}
              >
                {s.size}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
