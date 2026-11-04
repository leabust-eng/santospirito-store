import React from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Percent, Building2 } from 'lucide-react';

export default function PaymentMethodsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2">
            <CreditCard size={22} className="text-teal-800" />
            <h2 className="text-lg font-serif font-bold text-neutral-900">
              Medios de Pago y Financiación
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          {/* 3 Cuotas sin interés */}
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-teal-950 text-sm flex items-center gap-2">
                <span>💳 3 Cuotas Sin Interés</span>
              </h3>
              <span className="bg-teal-800 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                Mismo Precio
              </span>
            </div>
            <p className="text-teal-900">
              Válido con tarjetas de crédito Visa, Mastercard, American Express, Cabal y Naranja X emitidas por cualquier banco a través de Mercado Pago.
            </p>
          </div>

          {/* Transferencia 10% OFF */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <span>💵 10% de Descuento con Transferencia</span>
              </h3>
              <span className="bg-emerald-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                Ahorro Inmediato
              </span>
            </div>
            <p className="text-emerald-900">
              Aboná mediante transferencia directa desde tu home banking o billetera virtual (Mercado Pago, Ualá, Banco Nación, Galicia, Santander, etc.). El descuento se aplica de manera automática en el carrito.
            </p>
          </div>

          {/* Débito y Efectivo */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <h3 className="font-bold text-neutral-900 text-sm">
              🏦 Tarjetas de Débito y Efectivo
            </h3>
            <p className="text-neutral-600">
              Aceptamos débito Visa Débito, Mastercard Débito y Maestro. También podés abonar en efectivo en cualquier sucursal de Pago Fácil o Rapipago de todo el país.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-neutral-900 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase transition hover:bg-black"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
