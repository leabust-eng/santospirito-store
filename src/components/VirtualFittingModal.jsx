import React, { useState, useMemo } from 'react';
import { 
  X, Sparkles, User, Ruler, ChevronRight, Check, 
  HelpCircle, MessageCircle, ArrowRight, ShieldCheck, 
  SlidersHorizontal, Eye, Shirt
} from 'lucide-react';
import { calculateMeasurements } from '../data/virtualFitter';

const SCRUB_COLORS = [
  { name: 'Celeste Clínico', hex: '#38bdf8', border: '#0284c7' },
  { name: 'Rosa Plumetí', hex: '#f472b6', border: '#db2777' },
  { name: 'Azul Marino', hex: '#1e3a8a', border: '#172554' },
  { name: 'Verde Menta', hex: '#34d399', border: '#059669' },
  { name: 'Negro Classic', hex: '#27272a', border: '#09090b' },
  { name: 'Blanco Puro', hex: '#f8fafc', border: '#cbd5e1' }
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

  // Switch defaults on gender change
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    if (newGender === 'mujer') {
      if (height > 180) setHeight(165);
      if (weight > 90) setWeight(62);
    } else {
      if (height < 165) setHeight(175);
      if (weight < 65) setWeight(78);
    }
  };

  const results = useMemo(() => {
    return calculateMeasurements({ gender, height, weight, age, fitPreference });
  }, [gender, height, weight, age, fitPreference]);

  const handleApplySize = () => {
    if (onSelectSizeFilter) {
      onSelectSizeFilter(results.recommendedSize, gender);
    }
    onClose();
  };

  const handleWhatsAppConsult = () => {
    const text = `*Hola SantoSpirito!* Usé el *Vestuario Virtual* con mis medidas:%0A` +
      `• Género: ${gender === 'mujer' ? 'Femenino' : 'Masculino'}%0A` +
      `• Altura: ${height} cm%0A` +
      `• Peso: ${weight} kg%0A` +
      `• Medidas estimadas: Busto ${results.bust}cm | Cintura ${results.waist}cm | Cadera ${results.hip}cm%0A` +
      `• Talle sugerido: *${results.recommendedSize}*%0A%0A` +
      `¿Me confirman si este talle es el ideal para mí antes de comprar?`;
    window.open(`https://wa.me/5493815307474?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-gradient-to-r from-neutral-900 via-neutral-800 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-teal-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-neutral-900 rounded-[10px] flex items-center justify-center text-amber-300">
                <Sparkles size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide">
                  Vestuario Virtual Interactivo
                </h2>
                <span className="hidden sm:inline-block bg-teal-400/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-400/30 uppercase">
                  Simulador de Calce 3D
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Ingresá tus medidas y visualizá en tiempo real tu silueta y talle recomendado
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
            
            {/* COLUMN 1: FORM INPUTS (5 cols) */}
            <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
              
              {/* 1. GENDER SELECTOR */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5 uppercase tracking-wider">
                  1. ¿Para quién es el ambo?
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
                    <span>👩 Línea Mujer (Entallado)</span>
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
                    <span>👨 Línea Hombre / Unisex</span>
                  </button>
                </div>
              </div>

              {/* 2. HEIGHT SLIDER & INPUT */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-700">Altura:</label>
                  <span className="text-xs font-extrabold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
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
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>145 cm</span>
                  <span>175 cm</span>
                  <span>205 cm</span>
                </div>
              </div>

              {/* 3. WEIGHT SLIDER & INPUT */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-700">Peso actual:</label>
                  <span className="text-xs font-extrabold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
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
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>40 kg</span>
                  <span>85 kg</span>
                  <span>135 kg</span>
                </div>
              </div>

              {/* 4. AGE SLIDER */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-700">Edad:</label>
                  <span className="text-xs font-extrabold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {age} años
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>18</span>
                  <span>45</span>
                  <span>70</span>
                </div>
              </div>

              {/* 5. FIT PREFERENCE */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                  ¿Cómo te gusta usar el ambo en guardia?
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[
                    { id: 'ajustado', label: 'Al cuerpo', desc: 'Más entallado' },
                    { id: 'normal', label: 'Estándar', desc: 'Calce recomendado' },
                    { id: 'holgado', label: 'Holgado', desc: 'Para guardia larga' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFitPreference(p.id)}
                      className={`p-2 rounded-xl border text-xs transition ${
                        fitPreference === p.id
                          ? "border-teal-800 bg-teal-50 text-teal-950 font-bold ring-2 ring-teal-700/20"
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                    <Shirt size={14} className="text-teal-800" />
                    <span>Color del ambo para probar:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowGarment(!showGarment)}
                    className="text-[11px] text-teal-800 hover:text-teal-950 font-bold flex items-center gap-1"
                  >
                    <Eye size={12} />
                    <span>{showGarment ? 'Ver Silueta' : 'Vestir Ambo'}</span>
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
                        scrubColor.name === c.name ? "ring-2 ring-teal-800 ring-offset-2 scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-neutral-500 font-medium ml-1">
                    {scrubColor.name}
                  </span>
                </div>
              </div>

            </div>

            {/* COLUMN 2: INTERACTIVE SILHOUETTE (4 cols) */}
            <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex flex-col items-center justify-between relative overflow-hidden min-h-[460px]">
              
              {/* Top Watermark Badge */}
              <div className="w-full flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-100 pb-2 mb-2">
                <span className="font-semibold text-neutral-700">Silueta {gender === 'mujer' ? 'Femenina' : 'Masculina'}</span>
                <span>IMC: <strong className="text-teal-900">{results.bmi}</strong></span>
              </div>

              {/* SVG BODY SILHOUETTE WITH DYNAMIC CALLOUT PINS */}
              <div className="relative w-full max-w-[270px] h-[360px] flex items-center justify-center my-auto">
                
                {/* SVG CANVAS */}
                <svg
                  viewBox="0 0 240 400"
                  className="w-full h-full drop-shadow-sm select-none"
                  style={{ maxHeight: '360px' }}
                >
                  <defs>
                    <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3f4f6" />
                      <stop offset="100%" stopColor="#e5e7eb" />
                    </linearGradient>
                    <linearGradient id="garmentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={scrubColor.hex} />
                      <stop offset="100%" stopColor={scrubColor.border} />
                    </linearGradient>
                  </defs>

                  {/* ANATOMICAL BODY SILHOUETTE */}
                  {gender === 'mujer' ? (
                    // FEMALE SILHOUETTE
                    <g id="femaleBody">
                      {/* Head & Neck */}
                      <ellipse cx="120" cy="40" rx="16" ry="21" fill="url(#bodySkin)" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 115 61 L 115 76 Q 115 80 120 80 Q 125 80 125 76 L 125 61" fill="url(#bodySkin)" stroke="#cbd5e1" strokeWidth="1.5" />
                      
                      {/* Torso & Hips */}
                      <path
                        d="M 103 84 Q 85 92 80 115 L 88 150 L 98 145 L 94 118 Q 106 100 120 100 Q 134 100 146 118 L 142 145 L 152 150 L 160 115 Q 155 92 137 84 Q 128 80 120 80 Q 112 80 103 84 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      {/* Body curve: chest, waist, hips */}
                      <path
                        d="M 98 110 Q 94 130 102 145 Q 98 170 94 190 Q 90 215 106 230 L 134 230 Q 150 215 146 190 Q 142 170 138 145 Q 146 130 142 110 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />

                      {/* Legs */}
                      {/* Left Leg */}
                      <path
                        d="M 106 230 Q 100 280 102 330 L 105 375 L 116 375 L 117 330 Q 119 280 118 230 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      {/* Right Leg */}
                      <path
                        d="M 122 230 Q 121 280 123 330 L 124 375 L 135 375 L 138 330 Q 140 280 134 230 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                    </g>
                  ) : (
                    // MALE SILHOUETTE
                    <g id="maleBody">
                      {/* Head & Neck */}
                      <ellipse cx="120" cy="40" rx="17" ry="22" fill="url(#bodySkin)" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 113 62 L 113 78 Q 113 82 120 82 Q 127 82 127 78 L 127 62" fill="url(#bodySkin)" stroke="#cbd5e1" strokeWidth="1.5" />

                      {/* Torso & Shoulders (Broader) */}
                      <path
                        d="M 95 85 Q 75 92 70 120 L 80 160 L 92 155 L 86 125 Q 102 102 120 102 Q 138 102 154 125 L 148 155 L 160 160 L 170 120 Q 165 92 145 85 Q 132 80 120 80 Q 108 80 95 85 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 92 115 Q 94 150 98 185 Q 96 210 104 230 L 136 230 Q 144 210 142 185 Q 146 150 148 115 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />

                      {/* Legs */}
                      <path
                        d="M 104 230 Q 100 290 102 340 L 104 380 L 117 380 L 118 340 Q 119 290 118 230 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 122 230 Q 121 290 122 340 L 123 380 L 136 380 L 138 340 Q 140 290 136 230 Z"
                        fill="url(#bodySkin)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {/* OVERLAY: MEDICAL SCRUB (CASACA + PANTALÓN) */}
                  {showGarment && (
                    <g id="scrubGarment" className="animate-fade-in transition-all">
                      {/* 1. Scrub Top (Casaca con cuello en V) */}
                      <path
                        d={gender === 'mujer'
                          ? "M 102 85 L 80 115 L 94 128 L 98 115 L 98 190 Q 120 195 142 190 L 142 115 L 146 128 L 160 115 L 138 85 Q 120 98 102 85 Z"
                          : "M 94 86 L 70 120 L 86 134 L 92 122 L 94 195 Q 120 200 146 195 L 148 122 L 154 134 L 170 120 L 146 86 Q 120 100 94 86 Z"
                        }
                        fill="url(#garmentGrad)"
                        stroke={scrubColor.border}
                        strokeWidth="1.5"
                        opacity="0.95"
                      />
                      {/* V-Neck detail */}
                      <path
                        d="M 112 85 L 120 112 L 128 85"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      {/* Front pocket lines */}
                      <rect x="100" y="152" width="16" height="18" rx="2" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                      <rect x="124" y="152" width="16" height="18" rx="2" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

                      {/* 2. Scrub Pants (Pantalón) */}
                      <path
                        d={gender === 'mujer'
                          ? "M 96 186 L 94 225 Q 90 280 98 370 L 116 370 L 118 245 L 122 245 L 124 370 L 142 370 Q 150 280 146 225 L 144 186 Z"
                          : "M 96 192 L 96 230 Q 94 290 100 376 L 118 376 L 119 248 L 121 248 L 122 376 L 140 376 Q 146 290 144 230 L 144 192 Z"
                        }
                        fill="url(#garmentGrad)"
                        stroke={scrubColor.border}
                        strokeWidth="1.5"
                        opacity="0.95"
                      />
                      {/* Pants waistband detail */}
                      <line x1="97" y1="190" x2="143" y2="190" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" strokeDasharray="2,2" />
                    </g>
                  )}

                  {/* MEASUREMENT GUIDES & CALLOUT PINS */}
                  {/* BUST/CHEST LINE */}
                  <g className="transition-all duration-300">
                    <line x1="50" y1="125" x2="190" y2="125" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="3,3" />
                    <circle cx="120" cy="125" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
                  </g>

                  {/* WAIST LINE */}
                  <g className="transition-all duration-300">
                    <line x1="60" y1="165" x2="180" y2="165" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="3,3" />
                    <circle cx="120" cy="165" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
                  </g>

                  {/* HIP LINE */}
                  <g className="transition-all duration-300">
                    <line x1="50" y1="210" x2="190" y2="210" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="3,3" />
                    <circle cx="120" cy="210" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
                  </g>

                  {/* HEIGHT INDICATOR (Left) */}
                  <line x1="20" y1="20" x2="20" y2="380" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="16" y1="20" x2="24" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="16" y1="380" x2="24" y2="380" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="14" y="200" transform="rotate(-90 14,200)" fill="#64748b" fontSize="8" fontWeight="bold">
                    {height} cm
                  </text>
                </svg>

                {/* FLOATING MEASUREMENT BADGES OVERLAY */}
                {/* 1. Chest Badge */}
                <div className="absolute right-0 top-[28%] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none">
                  <span className="font-bold text-teal-800">{gender === 'mujer' ? 'Busto' : 'Pecho'}:</span> {results.bust} cm
                </div>

                {/* 2. Waist Badge */}
                <div className="absolute left-1 top-[39%] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none">
                  <span className="font-bold text-teal-800">Cintura:</span> {results.waist} cm
                </div>

                {/* 3. Hip Badge */}
                <div className="absolute right-0 top-[50%] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-teal-600/30 text-[10px] shadow-xs text-neutral-800 pointer-events-none">
                  <span className="font-bold text-teal-800">Cadera:</span> {results.hip} cm
                </div>
              </div>

              {/* Bottom Silhouette Hint */}
              <div className="text-[11px] text-neutral-400 text-center w-full pt-1 border-t border-neutral-100 flex items-center justify-center gap-1">
                <HelpCircle size={12} className="text-teal-700" />
                <span>Las líneas indican dónde calza el ambo en tu cuerpo</span>
              </div>

            </div>

            {/* COLUMN 3: RESULT & RECOMMENDATION CARD (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* PRIMARY RECOMMENDATION CARD */}
              <div className="bg-gradient-to-br from-teal-950 via-teal-900 to-neutral-900 text-white p-5 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 bg-teal-900/80 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                    CALCE RECOMENDADO
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">
                      {results.recommendedSize}
                    </span>
                    <span className="text-xs text-neutral-300 font-semibold">
                      ({results.confidence}% coincidencia)
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Talle ideal para trabajar con soltura, flexión de brazos y movilidad en guardia.
                  </p>
                </div>

                {/* Garment Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-teal-800/80 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Casaca recomendada:</span>
                    <strong className="text-white font-bold">Talle {results.recommendedSize} ({results.jacketLength} cm)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Pantalón recomendado:</span>
                    <strong className="text-white font-bold">Talle {results.recommendedSize} ({results.pantLength} cm)</strong>
                  </div>
                  <p className="text-[10px] text-teal-300 italic pt-0.5">
                    • {results.pantLengthNote}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleApplySize}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition active:scale-95"
                  >
                    <span>Ver Ambos en Talle {results.recommendedSize}</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={handleWhatsAppConsult}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle size={14} />
                    <span>Consultar a una Asesora</span>
                  </button>
                </div>
              </div>

              {/* WHY THIS SIZE CARD */}
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 text-xs space-y-2">
                <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Garantía de Calce SantoSpirito:</span>
                </h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Confeccionados en <strong>Gabardina Spandex</strong> con 3% de elastano. La tela acompaña el movimiento sin deformarse.
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
                    <span>Ver Tabla Completa en cm</span>
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
            <span>Si el talle no te queda perfecto al recibirlo, <strong>lo cambiamos sin complicaciones</strong>.</span>
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
