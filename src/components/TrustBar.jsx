import React from 'react';
import { CreditCard, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

const trustItems = [
  {
    icon: CreditCard,
    title: "3 Cuotas Sin Interés",
    desc: "Con todas las tarjetas de crédito bancarias y Mercado Pago",
    highlight: "¡Mismo precio!"
  },
  {
    icon: Truck,
    title: "Envíos a Todo el País",
    desc: "A domicilio o sucursal por Correo Argentino con seguimiento online",
    highlight: "Despacho rápido"
  },
  {
    icon: RefreshCw,
    title: "Cambio de Talle Fácil",
    desc: "¿No te quedó como esperabas? Te ayudamos a cambiarlo sin vueltas",
    highlight: "Garantía de calce"
  },
  {
    icon: ShieldCheck,
    title: "Compra 100% Segura",
    desc: "Protección total de tus datos con certificados SSL y Checkout Pro",
    highlight: "Tienda Oficial"
  }
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-neutral-200 py-6 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-2">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-teal-800">
                    ✓ {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
