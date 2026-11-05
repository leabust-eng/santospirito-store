import React from 'react';
import { CreditCard, Truck, MessageCircle, Instagram } from 'lucide-react';

export default function AnnouncementBar({ onOpenSizeGuide, onOpenVirtualFitting }) {
  return (
    <div className="bg-[#1a1a1a] text-white text-xs py-2 px-3 sm:px-4 border-b border-neutral-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center md:text-left">
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

        {/* Center: Main Promo Callout */}
        <div className="w-full md:w-auto flex items-center justify-center gap-2 sm:gap-3 font-medium tracking-wide">
          <span className="flex items-center gap-1 sm:gap-1.5 text-emerald-400 font-semibold uppercase text-[10px] sm:text-[11px] bg-emerald-950/60 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-800/40 shrink-0">
            <CreditCard size={11} />
            3 CUOTAS SIN INTERÉS
          </span>
          <span className="text-neutral-300 text-[11px] flex items-center gap-1 shrink-0">
            <Truck size={12} className="text-sky-400" />
            Envíos a todo el país
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-neutral-400">
          <button 
            onClick={onOpenVirtualFitting}
            className="text-amber-300 hover:text-amber-200 font-bold transition flex items-center gap-1"
          >
            <span>✨ Vestuario Virtual</span>
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={onOpenSizeGuide}
            className="hover:text-white underline decoration-dotted transition"
          >
            📏 Tabla de Talles
          </button>
          <span className="text-neutral-600">|</span>
          <span className="text-emerald-400 font-medium">10% OFF Transferencia</span>
        </div>
      </div>
    </div>
  );
}
