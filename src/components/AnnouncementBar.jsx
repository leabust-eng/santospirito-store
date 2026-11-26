import React from 'react';
import { CreditCard, Truck, MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#111111] text-white text-xs py-2 px-3 sm:px-6 border-b border-neutral-800 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Left: WhatsApp contact (desktop) */}
        <div className="hidden md:flex items-center gap-2 text-neutral-300 text-[11px]">
          <a
            href="https://wa.me/5493815307474?text=Hola!%20Quer%C3%ADa%20hacer%20una%20consulta%20sobre%20los%20ambos%20SantoSpirito"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <MessageCircle size={12} className="text-emerald-400" />
            <span>381-530-7474 · Tucumán</span>
          </a>
        </div>

        {/* Center: Main Promo Callout (Oh! Wear style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-medium tracking-[0.12em] uppercase text-[10px] sm:text-[11px]">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <CreditCard size={12} className="text-emerald-400" />
            Hasta 3 Cuotas Sin Interés
          </span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Truck size={12} className="text-amber-400" />
            Envío Gratis &gt; $150.000
          </span>
        </div>

        {/* Right: Social Icons (desktop) */}
        <div className="hidden md:flex items-center justify-end gap-3 text-neutral-300">
          <a
            href="https://www.facebook.com/santospirito.ok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook SantoSpirito"
            className="hover:text-white transition"
          >
            <Facebook size={14} />
          </a>
          <a
            href="https://instagram.com/santospirito.ok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram SantoSpirito"
            className="hover:text-white transition"
          >
            <Instagram size={14} />
          </a>
          <a
            href="https://wa.me/5493815307474"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp SantoSpirito"
            className="hover:text-emerald-400 transition"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
