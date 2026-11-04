import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { sizeGuideData } from '../data/sizeChart';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('mujer');
  const currentGuide = sizeGuideData[activeTab];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center shadow-sm">
              <Ruler size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-900">
                Guía de Talles y Medidas en Centímetros
              </h2>
              <p className="text-xs text-neutral-500">
                Encuentra tu talle exacto para trabajar con total comodidad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition border border-neutral-200"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Gender Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-neutral-100 rounded-xl border border-neutral-200">
              <button
                onClick={() => setActiveTab('mujer')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'mujer'
                    ? "bg-white text-teal-900 shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                👩 Línea Mujer (Entallado)
              </button>
              <button
                onClick={() => setActiveTab('hombre')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'hombre'
                    ? "bg-white text-teal-900 shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                👨 Línea Hombre / Unisex (Recto)
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="text-center max-w-xl mx-auto text-xs text-neutral-600">
            <p className="font-semibold text-neutral-800">{currentGuide.title}</p>
            <p className="mt-0.5">{currentGuide.description}</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-neutral-200 rounded-xl shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-900 text-white font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  {currentGuide.columns.map((col, idx) => (
                    <th key={idx} className="py-3 px-4 text-center">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {currentGuide.sizes.map((row, idx) => (
                  <tr 
                    key={row.talle}
                    className={`hover:bg-teal-50/50 transition ${idx % 2 === 0 ? "bg-white" : "bg-neutral-50/60"}`}
                  >
                    <td className="py-3 px-4 font-extrabold text-teal-950 text-center text-sm bg-neutral-100/60">
                      {row.talle}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">{row.busto} cm</td>
                    <td className="py-3 px-4 text-center font-medium">{row.cintura} cm</td>
                    <td className="py-3 px-4 text-center font-medium">{row.cadera} cm</td>
                    <td className="py-3 px-4 text-center font-medium">{row.largoCasaca} cm</td>
                    <td className="py-3 px-4 text-center font-medium">{row.largoPantalon} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Cards */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <HelpCircle size={16} className="text-teal-800" />
              <span>¿Cómo tomarte las medidas correctamente?</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {sizeGuideData.measuringTips.map((tip, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-neutral-200/80 shadow-2xs">
                  <span className="font-bold text-teal-900 block mb-1">{tip.title}</span>
                  <span className="text-neutral-600 leading-relaxed">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 size={20} className="text-emerald-700 flex-shrink-0" />
            <div>
              <strong>¿Todavía tenés dudas con el talle?</strong> Escribinos por WhatsApp al <strong>381-530-7474</strong> pasándonos tus medidas y una asesora te indica el talle perfecto antes de despachar.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-neutral-900 hover:bg-black text-white px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition shadow"
          >
            Entendido, volver al producto
          </button>
        </div>

      </div>
    </div>
  );
}
