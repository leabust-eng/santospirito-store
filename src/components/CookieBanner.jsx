import React, { useState, useEffect } from 'react';
import { Cookie, Settings2, Check, X } from 'lucide-react';
import { getCookieConsent, setCookieConsent } from '../utils/tracking';

export default function CookieBanner({ forceOpen = false, onCloseForce }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const saved = getCookieConsent();
    if (!saved) {
      const timer = setTimeout(() => setIsVisible(true), 700);
      return () => clearTimeout(timer);
    }
    setMarketingEnabled(saved !== 'essential');
  }, []);

  useEffect(() => {
    if (forceOpen) {
      const saved = getCookieConsent();
      setMarketingEnabled(saved !== 'essential');
      setShowConfig(true);
      setIsVisible(true);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    setMarketingEnabled(true);
    setShowConfig(false);
    setIsVisible(false);
    if (onCloseForce) onCloseForce();
  };

  const handleSavePreferences = () => {
    setCookieConsent(marketingEnabled ? 'accepted' : 'essential');
    setShowConfig(false);
    setIsVisible(false);
    if (onCloseForce) onCloseForce();
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed bottom-3 left-3 right-20 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[380px] z-40 animate-fade-in"
    >
      <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl rounded-2xl p-3.5 sm:p-4 text-xs text-neutral-700">
        {!showConfig ? (
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={15} />
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed text-neutral-600">
                Usamos cookies propias y de medición (<strong className="text-neutral-800">Meta Pixel</strong>) para recordar tu carrito y mejorar tus recomendaciones en campañas.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition inline-flex items-center gap-1"
              >
                <Settings2 size={12} />
                <span>Configurar</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="bg-neutral-900 hover:bg-teal-900 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition shadow-sm active:scale-95"
              >
                Aceptar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 text-xs">
                <Cookie size={14} className="text-teal-800" />
                <span>Preferencias de Cookies</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (getCookieConsent()) {
                    setIsVisible(false);
                    setShowConfig(false);
                    if (onCloseForce) onCloseForce();
                  } else {
                    setShowConfig(false);
                  }
                }}
                aria-label="Cerrar configuración de cookies"
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-full"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between gap-2 bg-neutral-50 p-2 rounded-lg">
                <div>
                  <div className="font-bold text-neutral-800">Cookies esenciales</div>
                  <div className="text-[10px] text-neutral-500">Necesarias para guardar tu carrito de compras.</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Siempre activas
                </span>
              </div>

              <label className="flex items-center justify-between gap-2 bg-neutral-50 p-2 rounded-lg cursor-pointer">
                <div>
                  <div className="font-bold text-neutral-800">Medición y Campañas (Meta Pixel)</div>
                  <div className="text-[10px] text-neutral-500">Ayuda a mostrarte ambos acordes en Facebook e Instagram.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="w-4 h-4 accent-teal-800 rounded cursor-pointer shrink-0"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="text-[11px] font-bold text-teal-900 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-full transition inline-flex items-center gap-1"
              >
                <Check size={12} />
                <span>Guardar preferencias</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="bg-neutral-900 hover:bg-teal-900 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition shadow-sm"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
