import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/5493815307474?text=¡Hola%20SantoSpirito!%20Quería%20hacerles%20una%20consulta%20sobre%20un%20ambo."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        ¿Te asesoramos con el talle?
      </span>
    </a>
  );
}
