import React, { useState } from 'react';
import { ChevronDown, Sparkles, Ruler } from 'lucide-react';
import { categories } from '../data/products';

export default function Navbar({ activeCategory, onSelectCategory, onOpenSizeGuide, onOpenVirtualFitting, onGoHome }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleCategoryClick = (catName, subCat = null) => {
    onSelectCategory({ category: catName, subCategory: subCat });
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-700 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="flex items-center justify-start xl:justify-center overflow-x-auto no-scrollbar py-1 w-full max-w-full scroll-smooth">
          
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            
            {/* Inicio / Todos */}
            <button
              onClick={onGoHome || (() => handleCategoryClick("TODOS"))}
              className={`px-3 py-2.5 rounded-md transition whitespace-nowrap ${
                activeCategory.category === "TODOS"
                  ? "text-teal-900 border-b-2 border-teal-800 font-bold bg-teal-50/50"
                  : "hover:text-black hover:bg-neutral-50"
              }`}
            >
              Todos los Productos
            </button>

            {/* Dynamic Categories matching Plavusa */}
            {categories.map((cat) => {
              const isActive = activeCategory.category === cat.name;
              return (
                <div 
                  key={cat.id} 
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(cat.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`flex items-center gap-1 px-3 py-2.5 rounded-md transition whitespace-nowrap ${
                      isActive 
                        ? "text-teal-900 border-b-2 border-teal-800 font-bold bg-teal-50/50" 
                        : "hover:text-black hover:bg-neutral-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronDown size={13} className="text-neutral-400 group-hover:text-neutral-700 transition" />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === cat.id && (
                    <div className="absolute top-full left-0 w-52 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50 animate-fade-in">
                      <div className="px-3 py-1.5 text-[10px] text-neutral-400 font-bold tracking-widest border-b border-neutral-100 mb-1">
                        LÍNEAS DISPONIBLES
                      </div>
                      <button
                        onClick={() => handleCategoryClick(cat.name)}
                        className="w-full text-left px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-50 transition"
                      >
                        Ver todo en {cat.name} →
                      </button>
                      {cat.subCategories.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCategoryClick(cat.name, sub)}
                          className="w-full text-left px-3 py-1.5 text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 transition"
                        >
                          • {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Guía de Talles Button */}
            <button
              onClick={onOpenSizeGuide}
              className="flex items-center gap-1.5 px-3 py-2.5 text-neutral-600 hover:text-neutral-900 font-semibold hover:bg-neutral-50 rounded-md transition whitespace-nowrap"
            >
              <Ruler size={14} />
              <span>Tabla de Talles</span>
            </button>

            {/* Colección Spandex 2026 - Integrada junto a Tabla de Talles */}
            <button
              onClick={() => handleCategoryClick("TODOS", "Spandex")}
              className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 hover:bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200/90 font-bold whitespace-nowrap transition active:scale-95 ml-1 sm:ml-2 shadow-2xs"
              title="Filtrar por Colección Spandex"
            >
              <Sparkles size={12} className="text-amber-600" />
              <span>Colección Spandex 2026</span>
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}
