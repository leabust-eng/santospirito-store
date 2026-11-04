import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: "NUEVA TEMPORADA 2026",
    title: "AMBOS MÉDICOS DE DISEÑO Y CONFORT",
    subtitle: "Confeccionados en Gabardina Spandex que acompaña cada movimiento en tu guardia.",
    highlight: "Hasta 3 Cuotas Sin Interés",
    cta: "Explorar Colección",
    categoryTarget: "Ambos Mujer",
    badge: "10% OFF EXTRA POR TRANSFERENCIA",
    bgGradient: "from-teal-950/80 via-neutral-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    tag: "LÍNEA QUIRÚRGICA & CONSULTORIO",
    title: "CHAQUETAS MAO Y ESTILO DIOR",
    subtitle: "Elegancia sastrera con broches inoxidables y calce anatómico.",
    highlight: "Envíos a Todo el País por Correo Argentino",
    cta: "Ver Chaquetas",
    categoryTarget: "Chaquetas",
    badge: "CALCE PERFECTO GARANTIZADO",
    bgGradient: "from-neutral-950/85 via-slate-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1594824813589-9a706bfa43e0?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    tag: "LÍNEA MASCULINA & UNISEX",
    title: "ALTA RESISTENCIA PARA PROFESIONALES",
    subtitle: "Telas Arciel y Spandex que resisten esterilizaciones y lavados intensivos.",
    highlight: "Talles desde S hasta 3XL",
    cta: "Ver Línea Hombre",
    categoryTarget: "Ambos Hombre",
    badge: "STOCK INMEDIATO",
    bgGradient: "from-blue-950/80 via-neutral-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1920&q=80"
  }
];

export default function HeroCarousel({ onSelectCategory, onOpenSizeGuide }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[460px] md:h-[560px] bg-neutral-900 overflow-hidden select-none">
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 transform scale-105"
      />

      {/* Dark overlay with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />

      {/* Slide Content */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white space-y-4 animate-fade-in">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-700/90 backdrop-blur-sm text-teal-100 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-teal-500/30">
              {slide.tag}
            </span>
            <span className="bg-amber-500/20 backdrop-blur-sm text-amber-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-amber-400/30">
              {slide.badge}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed drop-shadow">
            {slide.subtitle}
          </p>

          <div className="text-emerald-300 text-sm font-semibold tracking-wide flex items-center gap-2">
            <Sparkles size={16} />
            <span>{slide.highlight}</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCategory({ category: slide.categoryTarget, subCategory: null })}
              className="flex items-center gap-2 bg-white text-neutral-900 hover:bg-teal-700 hover:text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg transition-all active:scale-95"
            >
              <span>{slide.cta}</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onOpenSizeGuide}
              className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/40 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition active:scale-95"
            >
              Ver Tabla de Medidas
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition focus:outline-none"
        aria-label="Anterior"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition focus:outline-none"
        aria-label="Siguiente"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all ${
              current === i 
                ? "w-8 h-2 bg-teal-400 rounded-full" 
                : "w-2.5 h-2 bg-white/50 hover:bg-white rounded-full"
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
