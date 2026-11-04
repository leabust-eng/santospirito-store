import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: "COLECCIÓN OFICIAL 2026",
    badge: "10% OFF EXTRA POR TRANSFERENCIA",
    title: "AMBO CELESTE & AZUL MARINO",
    subtitle: "Chaqueta celeste pastel con vivos azul marino y pantalón náutico. Confeccionado en Gabardina Spandex de máxima suavidad y calce anatómico.",
    highlight: "Hasta 3 Cuotas Sin Interés con todas las tarjetas",
    cta: "Explorar Colección",
    categoryTarget: "Ambos Mujer",
    colorName: "Celeste & Marino",
    themeBg: "from-sky-950 via-slate-900 to-neutral-950",
    accentColor: "text-sky-300",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg"
  },
  {
    id: 2,
    tag: "EDICIÓN ESPECIAL TRICOLOR",
    badge: "TENDENCIA & DISEÑO",
    title: "AMBO TRICOLOR MENTA & BLANCO",
    subtitle: "Diseño fresco y moderno que combina blanco, vivos azul y base verde menta. Ideal para esteticistas, médicas y odontólogas.",
    highlight: "Talles reales desde S hasta 3XL",
    cta: "Ver Tricolor",
    categoryTarget: "Ambos Mujer",
    colorName: "Tricolor Menta",
    themeBg: "from-teal-950 via-slate-900 to-neutral-950",
    accentColor: "text-teal-300",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/ca8312fc57ec21a391345f33020a52e030349e70a5fee4dc9806fa6e01792342466763.jpg"
  },
  {
    id: 3,
    tag: "CLÁSICO & ELEGANTE",
    badge: "MÁXIMA DISTINCIÓN",
    title: "AMBO BEIGE & NEGRO",
    subtitle: "La calidez del tono beige camel combinada con vivos y pantalón negro azabache. Bolsillos amplios y corte que estiliza la figura.",
    highlight: "Envíos a todo el país por Correo Argentino",
    cta: "Ver Ambo Beige",
    categoryTarget: "Ambos Mujer",
    colorName: "Beige & Negro",
    themeBg: "from-stone-900 via-neutral-900 to-stone-950",
    accentColor: "text-amber-300",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/6db6e534003861e5572bae4eb67cde08963f4a8f4a8d530378623f4a0c091d79466763.jpg"
  },
  {
    id: 4,
    tag: "LÍNEA URBANA & VANGUARDIA",
    badge: "CALCE ANATÓMICO",
    title: "AMBO VERDE OLIVA & ROSA",
    subtitle: "Sofisticada combinación de verde oliva militar con delicados vivos en rosa pastel. Pantalón recto elastizado con cintura confort.",
    highlight: "Cambio de talle fácil y garantizado",
    cta: "Ver Modelo Oliva",
    categoryTarget: "Ambos Mujer",
    colorName: "Oliva & Rosa",
    themeBg: "from-emerald-950 via-stone-900 to-neutral-950",
    accentColor: "text-emerald-300",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/a9b6ce1bd1c7323c23de5fab33c4a086f1ac731b411b63fa59537736a122db01466763.jpg"
  },
  {
    id: 5,
    tag: "LÍNEA QUIRÚRGICA & GUARDIA",
    badge: "GABARDINA REFORZADA",
    title: "AMBO AZUL QUIRÚRGICO",
    subtitle: "Azul eléctrico vibrante en tela Arciel de alta densidad. Resiste lavados intensivos, calor y desinfectantes clínicos sin decolorar.",
    highlight: "Óptimo para veterinaria, odontología y guardia",
    cta: "Ver Línea Unisex",
    categoryTarget: "Ambos Unisex",
    colorName: "Azul Quirúrgico",
    themeBg: "from-blue-950 via-slate-900 to-neutral-950",
    accentColor: "text-blue-300",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg"
  },
  {
    id: 6,
    tag: "ESTILO JOGGER & CONFORT",
    badge: "STOCK INMEDIATO",
    title: "AMBO MENTA & NEGRO",
    subtitle: "Diseño moderno con chaqueta verde menta y pantalón jogger con puños elastizados. Libertad total para moverte en tu lugar de trabajo.",
    highlight: "3 Cuotas Sin Interés con Visa y Mastercard",
    cta: "Comprar Ahora",
    categoryTarget: "Ambos Mujer",
    colorName: "Menta & Negro",
    themeBg: "from-teal-950 via-neutral-900 to-zinc-950",
    accentColor: "text-teal-300",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/6472c905867ad8d562bf38c2395b5b10f7fa921fadba6aa0d0fb88a4f3b2ed14466763.jpg"
  },
  {
    id: 7,
    tag: "NUEVO INGRESO 2026",
    badge: "PALETA VIBRANTE",
    title: "AMBO MAGENTA & OLIVA",
    subtitle: "Impactante chaqueta magenta con bolsillos frontales verde oliva y pantalón anatómico haciendo juego. Calidad prémium garantizada.",
    highlight: "10% de ahorro directo por Transferencia Bancaria",
    cta: "Ver Colección",
    categoryTarget: "Ambos Mujer",
    colorName: "Magenta & Oliva",
    themeBg: "from-pink-950 via-neutral-900 to-stone-950",
    accentColor: "text-pink-300",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg"
  },
  {
    id: 8,
    tag: "DETALLE DE ALTA COSTURA",
    badge: "DETALLES REFORZADOS",
    title: "BOLSILLOS ANATÓMICOS TRICOLOR",
    subtitle: "Doble costura de seguridad, bolsillo porta-lapicera y capacidad optimizada para celular, instrumental y pertenencias de guardia.",
    highlight: "Asesoramiento personalizado por WhatsApp",
    cta: "Ver Todos los Modelos",
    categoryTarget: "Ambos Mujer",
    colorName: "Detalle Tricolor",
    themeBg: "from-slate-900 via-neutral-900 to-stone-950",
    accentColor: "text-emerald-300",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    image: "https://d22fxaf9t8d39k.cloudfront.net/23ded51650e4311d9538f582b5f873338667313e94fcd7d7603bf8d3595a3818466763.jpg"
  }
];

export default function HeroCarousel({ onSelectCategory, onOpenSizeGuide }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6"
      aria-label="Carrusel Destacado SantoSpirito"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Framed Container with Rounded Corners & Shadow */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-950 select-none">
        
        {/* Background Atmospheric Layer with Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={`bg-${slide.id}`}
            src={slide.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center filter blur-2xl scale-125 opacity-30 transition-all duration-1000 ease-out"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.themeBg} opacity-85 transition-colors duration-1000`} />
        </div>

        {/* Content Layout: 2 Columns on Desktop */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center min-h-[460px] md:min-h-[520px] p-6 sm:p-8 md:p-12 gap-8">
          
          {/* Left Column: Text & CTAs (7 cols on md) */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5 text-white">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-teal-700/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-teal-500/30 shadow-sm">
                {slide.tag}
              </span>
              <span className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-sm ${slide.badgeBg}`}>
                {slide.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-xl drop-shadow">
              {slide.subtitle}
            </p>

            {/* Highlight with Icon */}
            <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide ${slide.accentColor}`}>
              <Sparkles size={16} className="shrink-0" />
              <span>{slide.highlight}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory({ category: slide.categoryTarget, subCategory: null })}
                className="flex items-center gap-2 bg-white text-neutral-900 hover:bg-teal-700 hover:text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg transition-all active:scale-95 duration-200"
              >
                <span>{slide.cta}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition active:scale-95 duration-200"
              >
                Guía de Talles
              </button>
            </div>

          </div>

          {/* Right Column: Full Authentic Photoshoot Frame (5 cols on md) */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-900">
              
              {/* Actual SantoSpirito Photoshoot Image */}
              <img
                key={`img-${slide.id}`}
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Subtle glass tag on bottom of photo */}
              <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/75 backdrop-blur-md rounded-xl p-2.5 text-white flex items-center justify-between border border-white/10 shadow-lg">
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Fotoshoot Oficial</div>
                  <div className="text-xs font-bold text-white tracking-wide">{slide.colorName}</div>
                </div>
                <span className="text-[11px] font-semibold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/30">
                  {current + 1} / {slides.length}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition active:scale-95 z-20 border border-white/20"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition active:scale-95 z-20 border border-white/20"
          aria-label="Slide siguiente"
        >
          <ChevronRight size={22} />
        </button>

        {/* Mini Thumbnails / Indicator Pills on Bottom */}
        <div className="relative z-20 bg-black/40 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 shrink-0 ${
                current === idx
                  ? "bg-teal-600 text-white shadow-md font-bold scale-105"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white"
              }`}
              title={s.colorName}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${current === idx ? "bg-white" : "bg-neutral-400"}`} />
              <span className="hidden sm:inline">{s.colorName}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
