import React, { useState } from 'react';
import { Star, Sparkles, CheckCircle2, ChevronDown, ChevronUp, MessageSquareQuote, HeartHandshake, Users } from 'lucide-react';
import { getProductReviews } from '../data/productReviews';

export default function ProductReviewsSection({ product, productId }) {
  const activeId = product?.id || productId;
  const data = getProductReviews(activeId);
  const [expanded, setExpanded] = useState(false);

  // Tela dinámica desde el producto actual
  const fabric = product?.fabric || product?.description?.composicion || "Gabardina Spandex Prémium";

  // Mostrar 3 reseñas por defecto y las 6 al expandir, con flujo natural sin scroll interno
  const visibleReviews = expanded ? data.reviews : data.reviews.slice(0, 3);

  // Renderizado preciso de estrellas para el puntaje general (soporta estrellas completas y medias)
  const renderHeaderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((index) => {
      const diff = rating - (index - 1);
      if (diff >= 0.75) {
        // Estrella llena
        return <Star key={index} size={13} className="fill-amber-400 text-amber-400" />;
      } else if (diff >= 0.25) {
        // Media estrella (renderizada con clip SVG para precisión visual 4.7 y 4.8)
        return (
          <span key={index} className="relative inline-block" style={{ width: 13, height: 13 }}>
            <Star size={13} className="text-neutral-500 absolute inset-0" />
            <span className="absolute inset-0 overflow-hidden w-[55%]">
              <Star size={13} className="fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      } else {
        // Estrella vacía
        return <Star key={index} size={13} className="text-neutral-500" />;
      }
    });
  };

  return (
    <div className="mt-4 bg-[#faf7f2] border border-[#e8e2d8] rounded-xl overflow-hidden shadow-sm">
      {/* Header del bloque de opiniones de la comunidad */}
      <div className="bg-[#0f3d3e] text-white p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#0d9488] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Users size={15} />
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#5eead4] block font-sans">
              Comunidad SantoSpirito
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-serif leading-tight">
              Opiniones de Colegas de la Salud
            </h4>
          </div>
        </div>

        {/* Badge de puntuación matemática exacta */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <div className="flex items-center gap-0.5">
            {renderHeaderStars(data.rating)}
          </div>
          <span className="text-xs font-bold text-white">{data.rating} / 5</span>
          <span className="text-[10px] text-neutral-300">({data.totalReviews})</span>
        </div>
      </div>

      {/* Sub-barra: Experiencia en uso y tela dinámica del producto */}
      <div className="bg-[#e6f4f1] px-3.5 py-2 border-b border-[#cdeae3] flex items-center justify-between text-[11px] text-[#0f3d3e] font-medium gap-2">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#0d9488] flex-shrink-0" />
          <span>Experiencias de uso en guardias y consultorios</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-teal-900 font-semibold bg-white/80 px-2.5 py-0.5 rounded-full border border-teal-200/60 max-w-[200px] truncate">
          {fabric}
        </span>
      </div>

      {/* Lista de reseñas que fluye naturalmente (sin scrollbar interno recortado) */}
      <div className="p-3 sm:p-4 space-y-3">
        {visibleReviews.map((rev) => (
          <div 
            key={rev.id} 
            className="bg-white p-3 sm:p-3.5 rounded-lg border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-teal-300 transition-colors"
          >
            {/* Top de la reseña: Estrellas y Fecha */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < rev.stars ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-neutral-700 ml-1">
                  {rev.stars === 5 ? "Excelente" : "Muy bueno"}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400">{rev.date}</span>
            </div>

            {/* Texto del testimonio */}
            <p className="text-xs text-neutral-700 leading-relaxed mb-2 font-normal">
              "{rev.text}"
            </p>

            {/* Datos del profesional y etiqueta de comunidad */}
            <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-neutral-100 text-[11px]">
              <div className="text-neutral-800">
                <strong className="text-[#0f3d3e] font-semibold">{rev.name}</strong>
                <span className="text-neutral-500"> · {rev.role}</span>
                <span className="text-teal-700 font-medium"> · {rev.location}</span>
              </div>

              {/* Distintivo de comunidad (transparente y ético, sin falsas afirmaciones de auditoría) */}
              <span className="inline-flex items-center gap-1 text-[9.5px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/70">
                <Sparkles size={10} className="text-teal-600" /> Testimonio de Colega
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Ver más / Ver menos reseñas con accesibilidad aria */}
      {data.reviews.length > 3 && (
        <div className="p-2.5 bg-neutral-50/80 border-t border-[#e8e2d8] text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Ver menos opiniones" : `Ver las ${data.totalReviews} opiniones de la comunidad`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d9488] hover:text-[#0f3d3e] transition py-1.5 px-3.5 rounded-full hover:bg-teal-50"
          >
            <span>{expanded ? "Ver menos opiniones" : `Ver las ${data.totalReviews} opiniones de la comunidad`}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      )}

      {/* Pie de tranquilidad y confianza */}
      <div className="bg-[#f0ece3] px-3.5 py-2 border-t border-[#e2dcd2] text-[10.5px] text-neutral-600 flex items-center justify-center gap-1.5 text-center">
        <HeartHandshake size={13} className="text-[#0d9488] flex-shrink-0" />
        <span>SantoSpirito garantiza cambio de talle inmediato y envíos a todo el país.</span>
      </div>
    </div>
  );
}
