import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Sparkles, User, Ruler, ChevronRight, Check, 
  HelpCircle, MessageCircle, ArrowRight, ShieldCheck, 
  SlidersHorizontal, Eye, Shirt, RefreshCw, Zap
} from 'lucide-react';
import { calculateMeasurements } from '../data/virtualFitter';

const SCRUB_COLORS = [
  { name: 'Celeste Clínico', hex: '#38bdf8', border: '#0284c7', text: 'text-sky-400' },
  { name: 'Rosa Plumetí', hex: '#f472b6', border: '#db2777', text: 'text-pink-400' },
  { name: 'Azul Marino', hex: '#1e3a8a', border: '#172554', text: 'text-blue-500' },
  { name: 'Verde Menta', hex: '#34d399', border: '#059669', text: 'text-emerald-400' },
  { name: 'Negro Classic', hex: '#27272a', border: '#09090b', text: 'text-neutral-400' },
  { name: 'Blanco Puro', hex: '#f8fafc', border: '#94a3b8', text: 'text-neutral-200' }
];

export default function VirtualFittingModal({ 
  isOpen, 
  onClose, 
  onOpenSizeGuide, 
  onSelectSizeFilter,
  initialGender = 'mujer' 
}) {
  if (!isOpen) return null;

  const [gender, setGender] = useState(initialGender); // 'mujer' | 'hombre'
  const [height, setHeight] = useState(gender === 'mujer' ? 165 : 175);
  const [weight, setWeight] = useState(gender === 'mujer' ? 62 : 78);
  const [age, setAge] = useState(28);
  const [fitPreference, setFitPreference] = useState('normal'); // 'ajustado' | 'normal' | 'holgado'
  const [scrubColor, setScrubColor] = useState(SCRUB_COLORS[0]);
  const [showGarment, setShowGarment] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [activeSizePreview, setActiveSizePreview] = useState(null); // null = recommended, or 'XS', 'S', 'M', etc.

  // Switch defaults on gender change
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setActiveSizePreview(null);
    if (newGender === 'mujer') {
      if (height > 180) setHeight(165);
      if (weight > 90) setWeight(62);
    } else {
      if (height < 165) setHeight(175);
      if (weight < 65) setWeight(78);
    }
  };

  // Trigger brief laser scan animation whenever parameters change
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 600);
    return () => clearTimeout(timer);
  }, [height, weight, age, gender, fitPreference]);

  const results = useMemo(() => {
    return calculateMeasurements({ gender, height, weight, age, fitPreference });
  }, [gender, height, weight, age, fitPreference]);

  // Current active size shown (either auto recommended or user override preview)
  const currentSize = activeSizePreview || results.recommendedSize;

  // -----------------------------------------------------------------
  // DYNAMIC MORPHING ANTHROPOMETRIC COORDINATES CALCULATION
  // -----------------------------------------------------------------
  const dims = useMemo(() => {
    const cx = 130;
    const baseH = gender === 'mujer' ? 165 : 175;
    const hDiff = height - baseH;

    // Age factor (slight natural midsection redistribution past 35)
    const ageFactor = age > 35 ? Math.min(3.5, (age - 35) * 0.12) : 0;

    // Vertical landmarks (scaling proportionally with height)
    const headCy = 38;
    const headRx = 14 + (weight > 80 ? (weight - 80) * 0.05 : 0);
    const headRy = 19;
    const neckY = 62;
    const shoulderY = 76 + hDiff * 0.10;
    const bustY = 116 + hDiff * 0.22;
    const waistY = 162 + hDiff * 0.35;
    const hipY = 210 + hDiff * 0.48;
    const crotchY = 236 + hDiff * 0.52;
    const kneeY = 328 + hDiff * 0.74;
    const ankleY = 412 + hDiff * 0.95;

    // Horizontal half-widths (scaling dynamically with estimated bust, waist, hip, weight & age)
    let hw_neck, hw_shoulder, hw_bust, hw_waist, hw_hip, hw_thigh, hw_knee, hw_calf, hw_ankle;

    if (gender === 'mujer') {
      hw_neck = 7.5 + (weight - 55) * 0.04;
      hw_shoulder = 35 + hDiff * 0.05 + (weight - 55) * 0.12;
      hw_bust = 30 + (results.bust - 80) * 0.44;
      hw_waist = 20 + (results.waist - 58) * 0.40 + ageFactor;
      hw_hip = 34 + (results.hip - 85) * 0.48;
      hw_thigh = 15 + (weight - 55) * 0.14;
      hw_knee = 10.5 + (weight - 55) * 0.07;
      hw_calf = 12.5 + (weight - 55) * 0.09;
      hw_ankle = 7.5 + (weight - 55) * 0.04;
    } else {
      hw_neck = 10 + (weight - 70) * 0.05;
      hw_shoulder = 47 + hDiff * 0.08 + (weight - 70) * 0.14;
      hw_bust = 36 + (results.bust - 85) * 0.40;
      hw_waist = 27 + (results.waist - 72) * 0.38 + ageFactor;
      hw_hip = 32 + (results.hip - 88) * 0.38;
      hw_thigh = 16.5 + (weight - 70) * 0.14;
      hw_knee = 12 + (weight - 70) * 0.08;
      hw_calf = 14 + (weight - 70) * 0.10;
      hw_ankle = 8.5 + (weight - 70) * 0.05;
    }

    // Morphology classification
    let morphology = "Proporción Equilibrada";
    if (gender === 'mujer') {
      const whr = results.waist / results.hip;
      if (whr <= 0.73) morphology = "Silueta Reloj de Arena (Cintura Definida)";
      else if (results.hip - results.bust >= 7) morphology = "Silueta Pera (Cadera Marcada)";
      else if (results.bust - results.hip >= 6) morphology = "Silueta Triángulo Invertido";
      else morphology = "Silueta Rectangular / Atlética";
    } else {
      if (hw_shoulder - hw_waist >= 18) morphology = "Silueta Atlética en V (Espalda Amplia)";
      else if (results.waist >= results.bust - 4) morphology = "Silueta Robusta / Confort";
      else morphology = "Silueta Recta Estándar";
    }

    return {
      cx, headCy, headRx, headRy, neckY, shoulderY, bustY, waistY, hipY, crotchY, kneeY, ankleY,
      hw_neck, hw_shoulder, hw_bust, hw_waist, hw_hip, hw_thigh, hw_knee, hw_calf, hw_ankle,
      morphology
    };
  }, [gender, height, weight, age, results]);

  const handleApplySize = () => {
    if (onSelectSizeFilter) {
      onSelectSizeFilter(currentSize, gender);
    }
    onClose();
  };

  const handleWhatsAppConsult = () => {
    const text = `*¡Hola SantoSpirito!* Usé el *Vestuario Virtual* interactivo con mis medidas:%0A` +
      `• Género: ${gender === 'mujer' ? 'Femenino' : 'Masculino'}%0A` +
      `• Altura: ${height} cm | Peso: ${weight} kg | Edad: ${age} años%0A` +
      `• Medidas corporales: Busto/Pecho ${results.bust}cm | Cintura ${results.waist}cm | Cadera ${results.hip}cm%0A` +
      `• Morfología detectada: ${dims.morphology}%0A` +
      `• Talle sugerido: *${currentSize}*%0A%0A` +
      `¿Me confirman si este talle es el ideal para mí antes de comprar?`;
    window.open(`https://wa.me/5493815307474?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-gradient-to-r from-neutral-950 via-neutral-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-teal-400 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center p-1.5">
                <img src="/brand/santospirito-iso-white.svg" alt="SantoSpirito" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide">
                  Vestuario Virtual Interactivo
                </h2>
                <span className="hidden sm:inline-block bg-teal-400/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-400/30 uppercase animate-pulse">
                  Silueta Adaptativa en Tiempo Real
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                La silueta y el ambo se transforman dinámicamente según tu altura y peso
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
            aria-label="Cerrar vestuario virtual"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL CONTENT BODY */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-[#faf9f8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN 1: FORM CONTROLS (5 cols) */}
            <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
              
              {/* 1. GENDER SELECTOR */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Seleccioná tu Corte:</span>
                  <span className="text-[10px] text-teal-700 font-semibold normal-case">Modifica la estructura anatómica</span>
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleGenderChange('mujer')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      gender === 'mujer'
                        ? "bg-white text-teal-950 shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span>👩 Mujer (Entallado)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('hombre')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      gender === 'hombre'
                        ? "bg-white text-teal-950 shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span>👨 Hombre / Unisex</span>
                  </button>
                </div>
              </div>

              {/* 2. HEIGHT SLIDER */}
              <div className="p-3 bg-neutral-50/70 rounded-xl border border-neutral-200/80">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <Ruler size={14} className="text-teal-800" />
                    <span>Altura:</span>
                  </label>
                  <span className="text-sm font-black text-teal-950 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200 font-mono shadow-2xs">
                    {height} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="145"
                  max="205"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
                  <span>145 cm</span>
                  <span className="text-teal-800 font-bold">Estira la silueta</span>
                  <span>205 cm</span>
                </div>
              </div>

              {/* 3. WEIGHT SLIDER */}
              <div className="p-3 bg-neutral-50/70 rounded-xl border border-neutral-200/80">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <SlidersHorizontal size={14} className="text-teal-800" />
                    <span>Peso corporal:</span>
                  </label>
                  <span className="text-sm font-black text-teal-950 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200 font-mono shadow-2xs">
                    {weight} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="135"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
                  <span>40 kg</span>
                  <span className="text-teal-800 font-bold">Modela contorno y volumen</span>
                  <span>135 kg</span>
                </div>
              </div>

              {/* 4. AGE SLIDER */}
              <div className="p-3 bg-neutral-50/70 rounded-xl border border-neutral-200/80">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <User size={14} className="text-teal-800" />
                    <span>Edad:</span>
                  </label>
                  <span className="text-sm font-black text-teal-950 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200 font-mono shadow-2xs">
                    {age} años
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="75"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
                  <span>18 años</span>
                  <span className="text-teal-800 font-bold">Ajusta densidad y postura</span>
                  <span>75 años</span>
                </div>
              </div>

              {/* 5. FIT PREFERENCE */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5 flex items-center justify-between">
                  <span>Preferencia de calce:</span>
                  <span className="text-[10px] text-neutral-400">¿Cómo lo sentís más cómodo?</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[
                    { id: 'ajustado', label: 'Al cuerpo', desc: 'Más al cuerpo' },
                    { id: 'normal', label: 'Estándar', desc: 'Calce de diseño' },
                    { id: 'holgado', label: 'Holgado', desc: 'Guardias 24hs' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFitPreference(p.id)}
                      className={`p-2 rounded-xl border text-xs transition ${
                        fitPreference === p.id
                          ? "border-teal-800 bg-teal-50 text-teal-950 font-bold ring-2 ring-teal-700/20 shadow-2xs"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                      }`}
                    >
                      <span className="block font-bold">{p.label}</span>
                      <span className="text-[10px] text-neutral-400 font-normal">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. COLOR PREVIEW SELECTOR */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                    <Shirt size={14} className="text-teal-800" />
                    <span>Color del ambo sobre la silueta:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowGarment(!showGarment)}
                    className="text-[11px] text-teal-800 hover:text-teal-950 font-bold flex items-center gap-1 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 transition"
                  >
                    <Eye size={12} />
                    <span>{showGarment ? 'Ver Silueta Base' : 'Vestir Ambo'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {SCRUB_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setScrubColor(c)}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition transform active:scale-95 ${
                        scrubColor.name === c.name ? "ring-2 ring-teal-800 ring-offset-2 scale-110 shadow-sm" : "hover:scale-105"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-neutral-600 font-semibold ml-1">
                    {scrubColor.name}
                  </span>
                </div>
              </div>

            </div>

            {/* COLUMN 2: REAL-TIME MORPHING SILHOUETTE (4 cols) */}
            <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex flex-col items-center justify-between relative overflow-hidden min-h-[500px]">
              
              {/* Laser Scanning Effect */}
              {isScanning && (
                <div 
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_#2dd4bf] z-30 pointer-events-none transition-all"
                  style={{
                    animation: 'scanLine 0.6s ease-in-out infinite alternate'
                  }}
                />
              )}

              {/* Top Silhouette Info */}
              <div className="w-full flex items-center justify-between text-xs border-b border-neutral-100 pb-2 mb-1">
                <div>
                  <span className="font-bold text-neutral-900 block">
                    Silueta {gender === 'mujer' ? 'Femenina' : 'Masculina'}
                  </span>
                  <span className="text-[10px] text-teal-800 font-medium">{dims.morphology}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">Índice IMC</span>
                  <strong className="text-xs font-mono text-teal-900 font-bold">{results.bmi}</strong>
                </div>
              </div>

              {/* DYNAMIC MORPHING SVG CANVAS */}
              <div className="relative w-full max-w-[280px] h-[390px] flex items-center justify-center my-auto">
                
                <svg
                  viewBox="0 0 260 440"
                  className="w-full h-full drop-shadow-md select-none transition-all duration-300 ease-out"
                  style={{ maxHeight: '390px' }}
                >
                  <defs>
                    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="50%" stopColor="#f1f5f9" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>

                    <linearGradient id="scrubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={scrubColor.hex} />
                      <stop offset="100%" stopColor={scrubColor.border} />
                    </linearGradient>

                    <filter id="bodyShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                    </filter>
                  </defs>

                  {/* 1. ANATOMICAL MORPHING BODY PATH */}
                  <g id="morphingBody" filter="url(#bodyShadow)" className="transition-all duration-300">
                    
                    {/* Head */}
                    <ellipse 
                      cx={dims.cx} 
                      cy={dims.headCy} 
                      rx={dims.headRx} 
                      ry={dims.headRy} 
                      fill="url(#skinGrad)" 
                      stroke="#cbd5e1" 
                      strokeWidth="1.5" 
                    />

                    {/* Neck */}
                    <path
                      d={`M ${dims.cx - dims.hw_neck} ${dims.headCy + dims.headRy - 2}
                          L ${dims.cx - dims.hw_neck} ${dims.neckY}
                          Q ${dims.cx} ${dims.neckY + 2} ${dims.cx + dims.hw_neck} ${dims.neckY}
                          L ${dims.cx + dims.hw_neck} ${dims.headCy + dims.headRy - 2} Z`}
                      fill="url(#skinGrad)"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                    />

                    {/* Full Body Contour (Torso, Hips, Legs) - Morphs dynamically with height and weight */}
                    <path
                      d={`
                        M ${dims.cx - dims.hw_neck} ${dims.neckY}
                        Q ${dims.cx - dims.hw_neck - 4} ${dims.shoulderY - 3} ${dims.cx - dims.hw_shoulder} ${dims.shoulderY}
                        Q ${dims.cx - dims.hw_shoulder - 4} ${dims.shoulderY + 18} ${dims.cx - dims.hw_bust - 3} ${dims.bustY - 8}
                        Q ${dims.cx - dims.hw_bust} ${dims.bustY} ${dims.cx - dims.hw_bust} ${dims.bustY + 8}
                        Q ${dims.cx - dims.hw_waist - 2} ${dims.waistY - 14} ${dims.cx - dims.hw_waist} ${dims.waistY}
                        Q ${dims.cx - dims.hw_waist - 1} ${dims.waistY + 18} ${dims.cx - dims.hw_hip} ${dims.hipY}
                        
                        L ${dims.cx - dims.hw_hip + 2} ${dims.hipY + 20}
                        Q ${dims.cx - dims.hw_knee - 6} ${dims.kneeY} ${dims.cx - dims.hw_calf - 4} ${dims.kneeY + 45}
                        L ${dims.cx - dims.hw_ankle - 4} ${dims.ankleY}
                        L ${dims.cx - 8} ${dims.ankleY}
                        Q ${dims.cx - 10} ${dims.kneeY + 20} ${dims.cx - 2} ${dims.crotchY}
                        Q ${dims.cx + 10} ${dims.kneeY + 20} ${dims.cx + 8} ${dims.ankleY}
                        L ${dims.cx + dims.hw_ankle + 4} ${dims.ankleY}
                        L ${dims.cx + dims.hw_calf + 4} ${dims.kneeY + 45}
                        Q ${dims.cx + dims.hw_knee + 6} ${dims.kneeY} ${dims.cx + dims.hw_hip - 2} ${dims.hipY + 20}
                        L ${dims.cx + dims.hw_hip} ${dims.hipY}
                        
                        Q ${dims.cx + dims.hw_waist + 1} ${dims.waistY + 18} ${dims.cx + dims.hw_waist} ${dims.waistY}
                        Q ${dims.cx + dims.hw_waist + 2} ${dims.waistY - 14} ${dims.cx + dims.hw_bust} ${dims.bustY + 8}
                        Q ${dims.cx + dims.hw_bust} ${dims.bustY} ${dims.cx + dims.hw_bust + 3} ${dims.bustY - 8}
                        Q ${dims.cx + dims.hw_shoulder + 4} ${dims.shoulderY + 18} ${dims.cx + dims.hw_shoulder} ${dims.shoulderY}
                        Q ${dims.cx + dims.hw_neck + 4} ${dims.shoulderY - 3} ${dims.cx + dims.hw_neck} ${dims.neckY}
                        Z
                      `}
                      fill="url(#skinGrad)"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />

                    {/* Arms (Dynamic position alongside torso) */}
                    <path
                      d={`M ${dims.cx - dims.hw_shoulder} ${dims.shoulderY}
                          Q ${dims.cx - dims.hw_shoulder - 14} ${dims.bustY} ${dims.cx - dims.hw_waist - 16} ${dims.waistY + 28}
                          L ${dims.cx - dims.hw_waist - 8} ${dims.waistY + 30}
                          Q ${dims.cx - dims.hw_shoulder - 6} ${dims.bustY} ${dims.cx - dims.hw_bust - 2} ${dims.bustY + 6}
                          Z`}
                      fill="url(#skinGrad)"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M ${dims.cx + dims.hw_shoulder} ${dims.shoulderY}
                          Q ${dims.cx + dims.hw_shoulder + 14} ${dims.bustY} ${dims.cx + dims.hw_waist + 16} ${dims.waistY + 28}
                          L ${dims.cx + dims.hw_waist + 8} ${dims.waistY + 30}
                          Q ${dims.cx + dims.hw_shoulder + 6} ${dims.bustY} ${dims.cx + dims.hw_bust + 2} ${dims.bustY + 6}
                          Z`}
                      fill="url(#skinGrad)"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* 2. DYNAMIC MORPHING SCRUB GARMENT (CASACA + PANTALÓN) */}
                  {showGarment && (
                    <g id="morphingScrub" className="animate-fade-in transition-all duration-300">
                      
                      {/* Scrub Pants (Morphs with hips, crotch, and ankles) */}
                      <path
                        d={`
                          M ${dims.cx - dims.hw_waist - 1} ${dims.waistY + 4}
                          Q ${dims.cx - dims.hw_hip - 3} ${dims.hipY} ${dims.cx - dims.hw_hip} ${dims.hipY + 22}
                          L ${dims.cx - dims.hw_calf - 6} ${dims.kneeY + 45}
                          L ${dims.cx - dims.hw_ankle - 5} ${dims.ankleY}
                          L ${dims.cx - 6} ${dims.ankleY}
                          Q ${dims.cx - 8} ${dims.kneeY + 20} ${dims.cx} ${dims.crotchY + 2}
                          Q ${dims.cx + 8} ${dims.kneeY + 20} ${dims.cx + 6} ${dims.ankleY}
                          L ${dims.cx + dims.hw_ankle + 5} ${dims.ankleY}
                          L ${dims.cx + dims.hw_calf + 6} ${dims.kneeY + 45}
                          Q ${dims.cx + dims.hw_hip + 3} ${dims.hipY} ${dims.cx + dims.hw_hip} ${dims.hipY + 22}
                          L ${dims.cx + dims.hw_waist + 1} ${dims.waistY + 4}
                          Z
                        `}
                        fill="url(#scrubGrad)"
                        stroke={scrubColor.border}
                        strokeWidth="1.6"
                        opacity="0.96"
                      />

                      {/* Cargo pocket stitch on right leg */}
                      <rect 
                        x={dims.cx + dims.hw_knee - 4} 
                        y={dims.kneeY - 26} 
                        width="14" 
                        height="20" 
                        rx="2" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="1" 
                        opacity="0.6" 
                      />

                      {/* Scrub Top / Casaca (Morphs with shoulders, bust, and waist) */}
                      <path
                        d={`
                          M ${dims.cx - dims.hw_neck - 2} ${dims.neckY + 2}
                          L ${dims.cx - dims.hw_shoulder - 4} ${dims.shoulderY + 2}
                          L ${dims.cx - dims.hw_shoulder - 14} ${dims.bustY - 2}
                          L ${dims.cx - dims.hw_bust - 4} ${dims.bustY + 6}
                          L ${dims.cx - dims.hw_waist - 3} ${dims.waistY + 16}
                          Q ${dims.cx} ${dims.waistY + 20} ${dims.cx + dims.hw_waist + 3} ${dims.waistY + 16}
                          L ${dims.cx + dims.hw_bust + 4} ${dims.bustY + 6}
                          L ${dims.cx + dims.hw_shoulder + 14} ${dims.bustY - 2}
                          L ${dims.cx + dims.hw_shoulder + 4} ${dims.shoulderY + 2}
                          L ${dims.cx + dims.hw_neck + 2} ${dims.neckY + 2}
                          Z
                        `}
                        fill="url(#scrubGrad)"
                        stroke={scrubColor.border}
                        strokeWidth="1.8"
                        opacity="0.98"
                      />

                      {/* SantoSpirito Signature V-Neck Collar */}
                      <path
                        d={`M ${dims.cx - 10} ${dims.neckY + 2}
                            L ${dims.cx} ${dims.neckY + 24}
                            L ${dims.cx + 10} ${dims.neckY + 2}
                            Z`}
                        fill="#ffffff"
                        opacity="0.25"
                      />
                      <path
                        d={`M ${dims.cx - 12} ${dims.neckY + 2}
                            L ${dims.cx} ${dims.neckY + 26}
                            L ${dims.cx + 12} ${dims.neckY + 2}`}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      {/* Two deep functional front pockets (SantoSpirito style) */}
                      <rect 
                        x={dims.cx - dims.hw_waist + 2} 
                        y={dims.waistY - 14} 
                        width="16" 
                        height="20" 
                        rx="2" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="1.2" 
                        opacity="0.6" 
                      />
                      <rect 
                        x={dims.cx + dims.hw_waist - 18} 
                        y={dims.waistY - 14} 
                        width="16" 
                        height="20" 
                        rx="2" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="1.2" 
                        opacity="0.6" 
                      />
                    </g>
                  )}

                  {/* 3. MEASUREMENT CALLOUT GUIDES & PINS */}
                  {/* BUST/CHEST PIN LINE */}
                  <g className="transition-all duration-300">
                    <line 
                      x1={dims.cx - dims.hw_bust - 25} 
                      y1={dims.bustY} 
                      x2={dims.cx + dims.hw_bust + 25} 
                      y2={dims.bustY} 
                      stroke="#0d9488" 
                      strokeWidth="1.2" 
                      strokeDasharray="3,3" 
                    />
                    <circle cx={dims.cx - dims.hw_bust - 1} cy={dims.bustY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                    <circle cx={dims.cx + dims.hw_bust + 1} cy={dims.bustY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                  </g>

                  {/* WAIST PIN LINE */}
                  <g className="transition-all duration-300">
                    <line 
                      x1={dims.cx - dims.hw_waist - 25} 
                      y1={dims.waistY} 
                      x2={dims.cx + dims.hw_waist + 25} 
                      y2={dims.waistY} 
                      stroke="#0d9488" 
                      strokeWidth="1.2" 
                      strokeDasharray="3,3" 
                    />
                    <circle cx={dims.cx - dims.hw_waist - 1} cy={dims.waistY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                    <circle cx={dims.cx + dims.hw_waist + 1} cy={dims.waistY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                  </g>

                  {/* HIP PIN LINE */}
                  <g className="transition-all duration-300">
                    <line 
                      x1={dims.cx - dims.hw_hip - 25} 
                      y1={dims.hipY} 
                      x2={dims.cx + dims.hw_hip + 25} 
                      y2={dims.hipY} 
                      stroke="#0d9488" 
                      strokeWidth="1.2" 
                      strokeDasharray="3,3" 
                    />
                    <circle cx={dims.cx - dims.hw_hip - 1} cy={dims.hipY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                    <circle cx={dims.cx + dims.hw_hip + 1} cy={dims.hipY} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.2" />
                  </g>

                  {/* HEIGHT BRACKET (LEFT) */}
                  <g>
                    <line x1="16" y1={dims.headCy - dims.headRy} x2="16" y2={dims.ankleY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="12" y1={dims.headCy - dims.headRy} x2="20" y2={dims.headCy - dims.headRy} stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="12" y1={dims.ankleY} x2="20" y2={dims.ankleY} stroke="#94a3b8" strokeWidth="1.5" />
                  </g>
                </svg>

                {/* DYNAMIC FLOATING MEASUREMENT BADGES */}
                {/* 1. Chest Badge */}
                <div 
                  className="absolute right-0 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none transition-all duration-300"
                  style={{ top: `${(dims.bustY / 440) * 100 - 3}%` }}
                >
                  <span className="font-bold text-teal-800">{gender === 'mujer' ? 'Busto' : 'Pecho'}:</span> {results.bust} cm
                </div>

                {/* 2. Waist Badge */}
                <div 
                  className="absolute left-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none transition-all duration-300"
                  style={{ top: `${(dims.waistY / 440) * 100 - 3}%` }}
                >
                  <span className="font-bold text-teal-800">Cintura:</span> {results.waist} cm
                </div>

                {/* 3. Hip Badge */}
                <div 
                  className="absolute right-0 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none transition-all duration-300"
                  style={{ top: `${(dims.hipY / 440) * 100 - 3}%` }}
                >
                  <span className="font-bold text-teal-800">Cadera:</span> {results.hip} cm
                </div>

                {/* 4. Height Badge (Left Vertical) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-neutral-500 -rotate-90 origin-left">
                  {height} cm
                </div>
              </div>

              {/* Real-time Morphing Feedback Bar */}
              <div className="text-[11px] text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200/80 text-center w-full mt-2 flex items-center justify-center gap-1.5 font-medium">
                <Zap size={13} className="text-amber-500" />
                <span>La silueta se adapta a <strong>{height} cm</strong> y <strong>{weight} kg</strong></span>
              </div>

            </div>

            {/* COLUMN 3: RESULT & SIZE COMPARATOR (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              
              {/* PRIMARY RECOMMENDATION CARD */}
              <div className="bg-gradient-to-br from-teal-950 via-teal-900 to-neutral-900 text-white p-5 rounded-2xl shadow-xl space-y-3.5 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 bg-teal-900/80 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                      CALCE SUGERIDO
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check size={12} /> {results.confidence}% coincidencia
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">
                      {currentSize}
                    </span>
                    {activeSizePreview && activeSizePreview !== results.recommendedSize && (
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                        Previsualizando
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Permite movilidad total en brazos y cintura elástica sin apretar.
                  </p>
                </div>

                {/* Garment Length Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-teal-800/80 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Largo Casaca:</span>
                    <strong className="text-white font-bold">{results.jacketLength} cm</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Largo Pantalón:</span>
                    <strong className="text-white font-bold">{results.pantLength} cm</strong>
                  </div>
                  <p className="text-[10px] text-teal-300 italic pt-0.5">
                    • {results.pantLengthNote}
                  </p>
                </div>

                {/* Interactive Size Comparator Pills */}
                <div className="pt-2 border-t border-teal-800/80">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1.5">
                    Comparar cómo calzan otros talles:
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {(gender === 'mujer' ? ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] : ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']).slice(0, 4).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setActiveSizePreview(s === results.recommendedSize ? null : s)}
                        className={`py-1 text-[11px] font-bold rounded-lg transition border ${
                          currentSize === s
                            ? "bg-amber-400 text-neutral-950 border-amber-400 font-black shadow-xs"
                            : "bg-teal-900/60 text-white border-teal-700/60 hover:bg-teal-800"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleApplySize}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition active:scale-95"
                  >
                    <span>Ver Ambos en Talle {currentSize}</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={handleWhatsAppConsult}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle size={14} />
                    <span>Confirmar con una Asesora</span>
                  </button>
                </div>
              </div>

              {/* FABRIC & QUALITY NOTE */}
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 text-xs space-y-2">
                <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Tejido Spandex Premium:</span>
                </h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Gabardina 97% Algodón, 3% Elastano. Si estás entre dos talles, el elastano se adapta naturalmente a tu silueta.
                </p>
                <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenSizeGuide) onOpenSizeGuide();
                    }}
                    className="text-teal-800 hover:text-teal-950 font-bold underline flex items-center gap-1"
                  >
                    <Ruler size={12} />
                    <span>Ver Tabla de Medidas en cm</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 sm:p-4 border-t border-neutral-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
            <Check size={14} className="text-emerald-600" />
            <span>Garantía de calce: si no te queda como esperabas al recibirlo, <strong>lo cambiamos sin vueltas</strong>.</span>
          </div>

          <button
            onClick={onClose}
            className="ml-auto bg-neutral-900 hover:bg-black text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition"
          >
            Listo, volver a la tienda
          </button>
        </div>

      </div>
    </div>
  );
}
