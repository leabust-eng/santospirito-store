import React from 'react';
import { CreditCard, Truck, MessageCircle, Instagram } from 'lucide-react';

export default function AnnouncementBar({ onOpenSizeGuide }) {
  return (
    <div className="bg-[#1a1a1a] text-white text-xs py-2 px-4 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        {/* Left: Socials & Contact */}
        <div className="hidden md:flex items-center gap-4 text-neutral-300">
          <a 
            href="https://instagram.com/santospirito.ok" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Instagram size={13} className="text-pink-400" />
            <span>@santospirito.ok</span>
          </a>
          <span className="text-neutral-600">|</span>
          <a 
            href="https://wa.me/5493815307474" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <MessageCircle size={13} className="text-emerald-400" />
            <span>381-530-7474</span>
          </a>
        </div>

        {/* Center: Main Promo Callout (Like Plavusa) */}
        <div className="flex items-center justify-center gap-3 font-medium tracking-wide">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase text-[11px] bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
            <CreditCard size={12} />
            3 CUOTAS SIN INTERÉS
          </span>
          <span className="text-neutral-300 hidden sm:inline">en toda la tienda</span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-neutral-300 flex items-center gap-1">
            <Truck size={13} className="text-sky-400" />
            Envíos a todo el país
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-[11px] text-neutral-400">
          <button 
            onClick={onOpenSizeGuide}
            className="hover:text-white underline decoration-dotted transition"
          >
            📏 Tabla de Talles
          </button>
          <span className="text-neutral-600">|</span>
          <span className="text-amber-300 font-medium">10% OFF con Transferencia</span>
        </div>
      </div>
    </div>
  );
}
