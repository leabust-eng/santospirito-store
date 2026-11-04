import React from 'react';
import { Instagram, MessageCircle, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenSizeGuide, onSelectCategory, onGoHome }) {
  return (
    <footer className="bg-[#18181b] text-neutral-300 text-xs border-t border-neutral-800">
      
      {/* Top Banner */}
      <div className="border-b border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <button 
              onClick={onGoHome} 
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
              aria-label="Ir al inicio"
            >
              <div className="w-7 h-7 rounded-md bg-teal-700 text-white font-serif font-bold flex items-center justify-center">
                S
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-teal-400 transition">
                SantoSpirito
              </span>
            </button>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Expresá tu estilo profesional. Diseñamos y confeccionamos ambos médicos, chaquetas y uniformes de primera calidad con telas Spandex y Arciel pensadas para la comodidad en tu jornada laboral.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://instagram.com/santospirito.ok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-pink-600 text-white flex items-center justify-center transition"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="https://wa.me/5493815307474" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-emerald-600 text-white flex items-center justify-center transition"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Categorías Principales
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory({ category: "Ambos Mujer", subCategory: null })} className="hover:text-white transition">
                  • Ambos Mujer Spandex
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory({ category: "Ambos Hombre", subCategory: null })} className="hover:text-white transition">
                  • Ambos Hombre y Cirugía
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory({ category: "Ambos Unisex", subCategory: null })} className="hover:text-white transition">
                  • Ambos Línea Enfermería
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory({ category: "Chaquetas", subCategory: null })} className="hover:text-white transition">
                  • Chaquetas Mao y Broches
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory({ category: "Pantalones", subCategory: null })} className="hover:text-white transition">
                  • Pantalones Jogger y Cargo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Ayuda y Políticas
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition underline decoration-dotted">
                  📏 Tabla de Talles y Medidas en cm
                </button>
              </li>
              <li>
                <a href="#cambios" className="hover:text-white transition">
                  🔄 Política de Cambios y Devoluciones
                </a>
              </li>
              <li>
                <a href="#envios" className="hover:text-white transition">
                  📦 Tiempos y Costos de Envío
                </a>
              </li>
              <li>
                <a href="#arrepentimiento" className="hover:text-amber-400 transition">
                  ⚖️ Botón de Arrepentimiento (Ley 24.240)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Contacto y Atención
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: +54 9 381 530-7474</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-sky-400 flex-shrink-0" />
                <span>santospirito.ok@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-400 flex-shrink-0" />
                <span>San Miguel de Tucumán, Argentina</span>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-emerald-400 font-semibold">
              ✓ Horario de atención: Lunes a Sábados 9 a 20 hs.
            </div>
          </div>

        </div>
      </div>

      {/* Payment & Shipping Badges */}
      <div className="bg-[#121214] py-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Medios de Pago Aceptados
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Mercado Pago</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Visa</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Mastercard</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Amex</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Naranja X</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Pago Fácil</span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1 rounded border border-neutral-700">Rapipago</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Envíos Seguros a Todo el País
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
              <span className="bg-neutral-800 text-yellow-400 font-bold text-[10px] px-3 py-1 rounded border border-neutral-700">
                📫 Correo Argentino (Sucursal y Domicilio)
              </span>
              <span className="bg-neutral-800 text-white font-bold text-[10px] px-3 py-1 rounded border border-neutral-700">
                📦 Andreani
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#0e0e10] py-4 text-center text-[11px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 SantoSpirito Ambos de Diseño. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1 text-neutral-400">
            Hecho con <Heart size={12} className="text-rose-500 fill-current" /> para profesionales de la salud
          </span>
        </div>
      </div>

    </footer>
  );
}
