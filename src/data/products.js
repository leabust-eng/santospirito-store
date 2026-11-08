// Catálogo oficial de SantoSpirito - Confección prémium en Spandex y gabardina elastizada

export const products = [
  // 1. AMBO TRICOLOR MENTA & BLANCO (Carousel Slide 2)
  {
    id: "ambo-tricolor-menta-blanco",
    slug: "ambo-tricolor-menta-blanco",
    name: "AMBO TRICOLOR MENTA & BLANCO SPANDEX",
    tagline: "Diseño fresco y moderno que combina blanco óptico, vivos azul marino y base verde menta",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 122000,
    originalPrice: 138000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 42,
    badge: "EDICIÓN ESPECIAL TRICOLOR",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/ca8312fc57ec21a391345f33020a52e030349e70a5fee4dc9806fa6e01792342466763.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/23ded51650e4311d9538f582b5f873338667313e94fcd7d7603bf8d3595a3818466763.jpg"
    ],
    colors: [
      { name: "Tricolor Menta + Blanco + Marino", hex: "#7bc4b2", inStock: true },
      { name: "Verde Menta Puro", hex: "#a8e6cf", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 10 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 },
      { size: "XXL", stock: 2 }
    ],
    description: {
      intro: "Ambo exclusivo de alta costura que fusiona tres bloques de color estratégicos. La chaqueta estiliza la figura gracias al contraste superior en blanco y la base fresca en verde menta.",
      casaca: "Corte semi entallado con cuello anatómico en V, bolsillos frontales reforzados y vivo en azul marino.",
      pantalon: "Pantalón en tono verde menta haciendo juego, tiro ergonómico y cintura confort de 4 cm que no marca.",
      composicion: "Gabardina Spandex: 97% Algodón, 3% Elastano de alta recuperación.",
      cuidados: [
        "Lavar con agua fría en ciclo delicado",
        "No usar cloro ni blanqueadores ópticos",
        "Planchar a temperatura media del revés"
      ]
    }
  },

  // 2. AMBO CELESTE & AZUL MARINO (Carousel Slide 1)
  {
    id: "ambo-celeste-marino",
    slug: "ambo-celeste-marino",
    name: "AMBO CELESTE & AZUL MARINO SPANDEX",
    tagline: "Chaqueta celeste pastel con vivos azul marino y pantalón náutico anatómico",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 124000,
    originalPrice: 140000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 36,
    badge: "COLECCIÓN OFICIAL 2026",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg",
      "/products/ambo-celeste-marino-pose.jpg"
    ],
    colors: [
      { name: "Celeste Sanitario + Azul Marino", hex: "#7ba7bc", inStock: true },
      { name: "Azul Marino Sólido", hex: "#1e3a5f", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 2 }
    ],
    description: {
      intro: "El balance perfecto entre la serenidad del celeste clínico y la formalidad del azul náutico. Diseñado para médicas, enfermeras y odontólogas que buscan elegancia y funcionalidad.",
      casaca: "Escote en V con vivos contrastantes en marino, costura de seguridad reforzada y doble bolsillo frontal.",
      pantalon: "Pantalón azul marino de calce recto moderno con bolsillos laterales profundos.",
      composicion: "Spandex Premium de 97% Algodón y 3% Elastano.",
      cuidados: [
        "Apto lavarropas programa delicado",
        "Secado colgado a la sombra"
      ]
    }
  },

  // 3. AMBO BEIGE & NEGRO (Carousel Slide 3)
  {
    id: "ambo-beige-negro",
    slug: "ambo-beige-negro",
    name: "AMBO BEIGE & NEGRO SPANDEX",
    tagline: "La calidez del tono beige camel combinada con vivos y pantalón negro azabache",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 142000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 29,
    badge: "MÁXIMA DISTINCIÓN",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/6db6e534003861e5572bae4eb67cde08963f4a8f4a8d530378623f4a0c091d79466763.jpg",
      "/products/ambo-beige-negro-sentada.jpg"
    ],
    colors: [
      { name: "Beige Camel + Negro", hex: "#c8b29b", inStock: true },
      { name: "Negro Azabache", hex: "#1f2022", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 6 },
      { size: "M", stock: 9 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 },
      { size: "XXL", stock: 1 }
    ],
    description: {
      intro: "Un estilo sofisticado inspirado en las pasarelas europeas. Combina un tono camel cálido con detalles en negro intenso.",
      casaca: "Corte semi entallado, bolsillos ergonómicos para celular de 6.7 pulgadas.",
      pantalon: "Pantalón negro elastizado que estiliza las piernas sin apretar.",
      composicion: "Gabardina elastizada 97% algodón, 3% spandex.",
      cuidados: ["Lavar con colores similares", "No usar cloro"]
    }
  },

  // 4. AMBO VERDE OLIVA & ROSA (Carousel Slide 4)
  {
    id: "ambo-verde-oliva-rosa",
    slug: "ambo-verde-oliva-rosa",
    name: "AMBO VERDE OLIVA & ROSA SPANDEX",
    tagline: "Sofisticada combinación de verde oliva militar con delicados vivos en rosa pastel",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 144000,
    discount: "13% OFF",
    featured: true,
    rating: 4.8,
    reviewsCount: 31,
    badge: "CALCE ANATÓMICO",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/a9b6ce1bd1c7323c23de5fab33c4a086f1ac731b411b63fa59537736a122db01466763.jpg",
      "/products/ambo-verde-oliva-rosa-sentada.jpg"
    ],
    colors: [
      { name: "Verde Oliva + Rosa Pastel", hex: "#556b2f", inStock: true },
      { name: "Rosa Pastel", hex: "#f0c3cb", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 2 },
      { size: "S", stock: 6 },
      { size: "M", stock: 8 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "La vanguardia del diseño urbano aplicada a la indumentaria de salud. El verde oliva otorga presencia mientras los vivos rosa suavizan el diseño.",
      casaca: "Casaca con corte anatómico, bolsillo superior y dos bolsillos inferiores profundos.",
      pantalon: "Pantalón verde oliva recto con cintura elastizada confort.",
      composicion: "Spandex de alta densidad 97% algodón, 3% elastano.",
      cuidados: ["Lavado suave con agua fría", "Plancha tibia"]
    }
  },

  // 5. AMBO AZUL QUIRÚRGICO (Carousel Slide 5)
  {
    id: "ambo-azul-quirurgico",
    slug: "ambo-azul-quirurgico",
    name: "AMBO AZUL QUIRÚRGICO ALTA RESISTENCIA",
    tagline: "Azul eléctrico vibrante en tela técnica de alta densidad que resiste lavados intensivos",
    gender: "Unisex",
    category: "Ambos Unisex",
    subCategory: "Quirúrgicos",
    fabric: "Arciel / Spandex Técnico",
    price: 115000,
    originalPrice: 130000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 45,
    badge: "LÍNEA QUIRÚRGICA & GUARDIA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg",
      "/products/ambo-azul-quirurgico-pose.jpg"
    ],
    colors: [
      { name: "Azul Quirúrgico Clásico", hex: "#185adb", inStock: true },
      { name: "Azul Marino", hex: "#0a1931", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 8 },
      { size: "XXL", stock: 5 },
      { size: "3XL", stock: 3 }
    ],
    description: {
      intro: "Diseñado para resistir largas jornadas de guardia, quirófano o clínica veterinaria. Tela que no destiñe ni pierde elasticidad.",
      casaca: "Cuello en V tradicional reforzado, triple costura en zonas de mayor tensión.",
      pantalon: "Pantalón unisex de corte recto con cordón de ajuste regulable en cintura.",
      composicion: "65% Poliéster técnico, 32% Algodón, 3% Elastano.",
      cuidados: ["Apto autoclave y lavado con desinfectantes hospitalarios"]
    }
  },

  // 6. AMBO MENTA & NEGRO (Carousel Slide 6)
  {
    id: "ambo-menta-negro",
    slug: "ambo-menta-negro",
    name: "AMBO MENTA & NEGRO ESTILO JOGGER",
    tagline: "Chaqueta verde menta con pantalón jogger negro y puños elastizados",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 142000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 33,
    badge: "ESTILO JOGGER & CONFORT",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/6472c905867ad8d562bf38c2395b5b10f7fa921fadba6aa0d0fb88a4f3b2ed14466763.jpg",
      "/products/ambo-menta-negro-pose.jpg"
    ],
    colors: [
      { name: "Menta Pastel + Negro", hex: "#98ddca", inStock: true },
      { name: "Negro Sólido", hex: "#1e1e1e", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 11 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 }
    ],
    description: {
      intro: "La tendencia jogger en su máxima expresión. Pantalón con botamangas elastizadas para un look moderno y comodidad inigualable al caminar.",
      casaca: "Chaqueta menta con bolsillos laterales reforzados.",
      pantalon: "Pantalón jogger negro elastizado con puños ajustados al tobillo.",
      composicion: "Spandex Premium 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secar colgado"]
    }
  },

  // 7. AMBO MAGENTA & OLIVA (Carousel Slide 7)
  {
    id: "ambo-magenta-oliva",
    slug: "ambo-magenta-oliva",
    name: "AMBO MAGENTA & OLIVA SPANDEX",
    tagline: "Impactante chaqueta magenta con bolsillos frontales verde oliva y pantalón haciendo juego",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 128000,
    originalPrice: 145000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 27,
    badge: "NUEVO INGRESO 2026",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg",
      "/products/ambo-magenta-oliva-pose.jpg"
    ],
    colors: [
      { name: "Magenta Intenso + Oliva", hex: "#9a1f59", inStock: true },
      { name: "Verde Oliva", hex: "#556b2f", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "Para profesionales que no temen destacar. La energía del color magenta fusionada con la sobriedad del oliva crea un look único en cualquier consultorio.",
      casaca: "Casaca magenta con bolsillos de parche en verde oliva.",
      pantalon: "Pantalón a juego con corte recto anatómico.",
      composicion: "Gabardina Spandex de primera selección.",
      cuidados: ["Lavar por separado las primeras 2 veces"]
    }
  },

  // 8. BOLSILLOS ANATÓMICOS TRICOLOR (Carousel Slide 8)
  {
    id: "ambo-bolsillos-anatomicos-tricolor",
    slug: "ambo-bolsillos-anatomicos-tricolor",
    name: "AMBO DETALLE BOLSILLOS TRICOLOR SPANDEX",
    tagline: "Doble costura de seguridad, bolsillo porta-lapicera y capacidad optimizada para celular",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 140000,
    discount: "11% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 39,
    badge: "ALTA COSTURA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/23ded51650e4311d9538f582b5f873338667313e94fcd7d7603bf8d3595a3818466763.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/ca8312fc57ec21a391345f33020a52e030349e70a5fee4dc9806fa6e01792342466763.jpg"
    ],
    colors: [
      { name: "Tricolor Detalle Técnico", hex: "#4a707a", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 8 },
      { size: "M", stock: 10 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 4 }
    ],
    description: {
      intro: "El modelo preferido para quienes necesitan practicidad absoluta en guardias. Sus bolsillos anatómicos permiten guardar celulares grandes, termómetros y lapiceras sin deformar la prenda.",
      casaca: "Casaca con bolsillo compartimentado y tira porta-credencial.",
      pantalon: "Pantalón recto elastizado con bolsillo cargo lateral.",
      composicion: "Gabardina elastizada 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "No usar lavandina"]
    }
  },

  // 9. NUEVO DE FACEBOOK: AMBO ROSITA & BORDEAUX
  {
    id: "ambo-rosita-bordeaux",
    slug: "ambo-rosita-bordeaux",
    name: "AMBO ROSITA Y BORDEAUX SPANDEX",
    tagline: "El modelo viral de Facebook: combinación encantadora de rosa pastel con vivos en bordeaux",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 122000,
    originalPrice: 139000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 22,
    badge: "TENDENCIA FACEBOOK",
    images: [
      "/products/ambo-rosita-bordeaux.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/8e88e15d99e302000e6362428e137b9f64fd5b6d004a668ddf4d02fadb4bcb56466763.jpg"
    ],
    colors: [
      { name: "Rosa Pastel + Bordeaux", hex: "#e2a9b3", inStock: true },
      { name: "Bordeaux Puro", hex: "#6b172a", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 6 },
      { size: "M", stock: 9 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "Destacado en nuestra comunidad oficial de Facebook. Un diseño dulce pero con personalidad gracias a los vivos profundos en bordeaux.",
      casaca: "Casaca en rosa pastel con pinzas anatómicas traseras y vivos bordeaux.",
      pantalon: "Pantalón bordeaux recto con cintura elastizada.",
      composicion: "Gabardina Spandex 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secado a la sombra"]
    }
  },

  // 10. NUEVO DE FACEBOOK: AMBO TOPACIO
  {
    id: "ambo-topacio",
    slug: "ambo-topacio",
    name: "AMBO TOPACIO SPANDEX PRIMERA CALIDAD",
    tagline: "Tono joya azul topacio con corte estilizado y tejido de altísima suavidad",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex Premium Joya",
    price: 128000,
    originalPrice: 145000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 19,
    badge: "GÉNEROS PREMIUM",
    images: [
      "/products/ambo-azul-quirurgico-pose.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg"
    ],
    colors: [
      { name: "Azul Topacio Intenso", hex: "#007791", inStock: true },
      { name: "Celeste Sanitario", hex: "#7ba7bc", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 2 },
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 }
    ],
    description: {
      intro: "Confeccionado con telas importadas de primera calidad que garantizan caída impecable y cero arrugas durante el turno.",
      casaca: "Chaqueta cuello en V con pespuntes finos y bolsillos anatómicos.",
      pantalon: "Pantalón recto confort con cintura elastizada ancha.",
      composicion: "97% Algodón Peinado, 3% Elastano.",
      cuidados: ["Apto lavarropas", "Planchado fácil"]
    }
  },

  // 11. NUEVO DE FACEBOOK: AMBO AZUL FRANCIA
  {
    id: "ambo-azul-francia",
    slug: "ambo-azul-francia",
    name: "AMBO AZUL FRANCIA SPANDEX",
    tagline: "Refleja tu estilo con el azul más vibrante de SantoSpirito",
    gender: "Unisex",
    category: "Ambos Unisex",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 123000,
    originalPrice: 139000,
    discount: "11% OFF",
    featured: true,
    rating: 4.8,
    reviewsCount: 26,
    badge: "REFLEJA TU ESTILO",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg",
      "/products/ambo-azul-quirurgico-pose.jpg"
    ],
    colors: [
      { name: "Azul Francia Vibrante", hex: "#0055a5", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 5 },
      { size: "XXL", stock: 3 }
    ],
    description: {
      intro: "Directamente de las publicaciones más aclamadas de nuestro Facebook. El Azul Francia es un clásico renovado con elasticidad multidireccional.",
      casaca: "Casaca unisex cómoda con doble bolsillo inferior y porta credencial.",
      pantalon: "Pantalón unisex de calce ergonómico y ajuste seguro.",
      composicion: "Gabardina Spandex de alto gramaje.",
      cuidados: ["Lavar con agua fría para mantener el brillo del color"]
    }
  },

  // 12. NUEVO DE FACEBOOK: COLECCIÓN FLEX
  {
    id: "ambo-flex-2026",
    slug: "ambo-flex-2026",
    name: "AMBO COLECCIÓN FLEX CONFORT 2026",
    tagline: "Línea ultraliviana con tecnología Flex: pensamos en vos y en tu movimiento",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Microfibra Flex Elastizada",
    price: 127000,
    originalPrice: 144000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 18,
    badge: "NUEVA COLECCIÓN FLEX",
    images: [
      "/products/ambo-celeste-marino-pose.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg"
    ],
    colors: [
      { name: "Gris Nube Flex", hex: "#b0b7bd", inStock: true },
      { name: "Verde Seco Flex", hex: "#7a8b7b", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 9 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 }
    ],
    description: {
      intro: "La máxima innovación de SantoSpirito anunciada en redes sociales. Tejido Flex ultraligero que repele salpicaduras y no requiere planchado.",
      casaca: "Casaca con escote estético y aperturas laterales para máxima movilidad.",
      pantalon: "Pantalón semi jogger con bolsillos invisibles de cierre.",
      composicion: "Microfibra Flex Spandex antimanchas.",
      cuidados: ["Secado ultra rápido, no precisa plancha"]
    }
  },

  // 13. CLÁSICO MÁS VENDIDO: AMBO PLUMETÍ ROSA
  {
    id: "ambo-plumeti-rosa",
    slug: "ambo-plumeti-rosa",
    name: "AMBO SPANDEX PLUMETÍ ROSA",
    tagline: "El clásico más elegido: elegancia, frescura y libertad de movimiento",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex Premium + Plumetí",
    price: 120000,
    originalPrice: 135000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 38,
    badge: "MÁS VENDIDO",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/8e88e15d99e302000e6362428e137b9f64fd5b6d004a668ddf4d02fadb4bcb56466763.jpg",
      "/products/ambo-rosita-bordeaux.jpg"
    ],
    colors: [
      { name: "Rosa Plumetí", hex: "#e2a9b3", inStock: true },
      { name: "Bordó", hex: "#6b172a", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 },
      { size: "XXL", stock: 2 }
    ],
    description: {
      intro: "Ambo femenino confeccionado en gabardina elastizada de tacto suave con detalles en plumetí traslúcido reforzado.",
      casaca: "Corte semi entallado femenino. Escote en V anatómico y dos bolsillos frontales amplios.",
      pantalon: "Corte recto moderno con cintura elastizada de 4 cm que no marca.",
      composicion: "Gabardina Spandex: 97% Algodón, 3% Elastano.",
      cuidados: ["Apto lavarropas en ciclo delicado", "Plancha tibia del revés"]
    }
  },

  // 14. HOMBRE: AMBO HOMBRE GRIS Y NEGRO
  {
    id: "ambo-hombre-gris-y-negro",
    slug: "ambo-hombre-gris-y-negro",
    name: "AMBO HOMBRE GRIS Y NEGRO SPANDEX",
    tagline: "Línea masculina técnica con refuerzo en costuras y corte anatómico",
    gender: "Hombre",
    category: "Ambos Hombre",
    subCategory: "Spandex",
    fabric: "Spandex Técnico Reforzado",
    price: 110000,
    originalPrice: 125000,
    discount: "12% OFF",
    featured: true,
    rating: 4.8,
    reviewsCount: 24,
    badge: "DESTACADO HOMBRE",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/44d79c226eaa92c228654fe429d81f229d77214f7ba34674dc704c0b1bf22663466763.jpg",
      "/products/ambo-hombre-gris-negro.jpg"
    ],
    colors: [
      { name: "Gris Grafito + Negro", hex: "#3b3d40", inStock: true },
      { name: "Azul Marino", hex: "#1e293b", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 9 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 3 }
    ],
    description: {
      intro: "Ambo diseñado para el profesional masculino. Espalda ergonómica con fuelle que facilita el movimiento de brazos al auscultar o realizar maniobras clínicas.",
      casaca: "Cuello moderno en V, bolsillo ojal superior y bolsillos laterales de carga rápida.",
      pantalon: "Pantalón corte sastre contemporáneo con cintura semielastizada y presillas para cinturón.",
      composicion: "Spandex Reforzado: 65% Poliéster, 32% Algodón, 3% Elastano.",
      cuidados: ["Lavado habitual sin encogimiento", "Plancha suave"]
    }
  },

  // 15. CLÁSICO ENFERMERÍA
  {
    id: "ambo-enfermeria",
    slug: "ambo-enfermeria",
    name: "AMBO CLÁSICO ENFERMERÍA BLANCO + AZUL",
    tagline: "El estándar de pulcritud y confort para clínicas, hospitales y centros médicos",
    gender: "Unisex",
    category: "Ambos Unisex",
    subCategory: "Clásicos",
    fabric: "Gabardina Sanitaria Antimancha",
    price: 98000,
    originalPrice: 110000,
    discount: "11% OFF",
    featured: false,
    rating: 4.7,
    reviewsCount: 19,
    badge: "BÁSICO CLÍNICO",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg",
      "/products/ambo-celeste-marino-pose.jpg"
    ],
    colors: [
      { name: "Blanco Puro + Azul", hex: "#ffffff", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 4 }
    ],
    description: {
      intro: "Indispensable para estudiantes e instituciones que requieren uniforme reglamentario blanco con vivos azul marino.",
      casaca: "Bolsillos reforzados para instrumental básico.",
      pantalon: "Pantalón elastizado de fácil lavado.",
      composicion: "Gabardina antimancha de larga duración.",
      cuidados: ["Apto blanqueadores según protocolo hospitalario"]
    }
  },

  // 16. CHAQUETA MAO
  {
    id: "chaqueta-mao-blanca-y-negra",
    slug: "chaqueta-mao-blanca-y-negra",
    name: "CHAQUETA CUELLO MAO CON BROCHES",
    tagline: "Estilo oriental moderno con broches de presión metálicos inoxidables",
    gender: "Mujer",
    category: "Chaquetas",
    subCategory: "Broches",
    fabric: "Spandex Peinado",
    price: 85000,
    originalPrice: 95000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 15,
    badge: "ALTA DEMANDA",
    images: [
      "/products/chaqueta-mao-blanca-negra.jpg",
      "/products/chaqueta-dior-bicolor.jpg"
    ],
    colors: [
      { name: "Blanco con vivos negros", hex: "#f8f9fa", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 7 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "Chaqueta elegante de cuello mao recomendada para odontología, medicina estética y dermatología.",
      casaca: "Cierre asimétrico con broches a presión metálicos que no se oxidan.",
      pantalon: "Prenda individual (chaqueta sola).",
      composicion: "97% Algodón Spandex, 3% Elastano.",
      cuidados: ["Planchar del revés"]
    }
  },

  // 17. CHAQUETA DIOR BICOLOR
  {
    id: "chaqueta-dior-blanca-y-negra",
    slug: "chaqueta-dior-blanca-y-negra",
    name: "CHAQUETA ESTILO DIOR BICOLOR",
    tagline: "Inspirada en el corte sastre parisino con vivo contrastante en solapa",
    gender: "Mujer",
    category: "Chaquetas",
    subCategory: "Alta Costura",
    fabric: "Spandex Alta Densidad",
    price: 89000,
    originalPrice: 102000,
    discount: "13% OFF",
    featured: false,
    rating: 4.8,
    reviewsCount: 12,
    badge: "DISEÑO EXCLUSIVO",
    images: [
      "/products/chaqueta-dior-bicolor.jpg",
      "/products/chaqueta-mao-blanca-negra.jpg"
    ],
    colors: [
      { name: "Blanco / Negro", hex: "#222222", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 6 },
      { size: "L", stock: 4 }
    ],
    description: {
      intro: "Una prenda de distinción pensada para consultorios privados, clínicas estéticas y profesionales independientes.",
      casaca: "Solapa smoking estilizada bicolor con costura invisible.",
      pantalon: "Chaqueta individual.",
      composicion: "Spandex peinado con forrería interna suave.",
      cuidados: ["Limpieza en seco o lavado a mano con jabón neutro"]
    }
  },

  // 18. AMBO VERDE SECO CUELLO EN V
  {
    id: "ambo-verde-seco",
    slug: "ambo-verde-seco",
    name: "AMBO VERDE SECO CUELLO EN V SPANDEX",
    tagline: "El color neutro y relajante en tendencia que transmite armonía y calidez",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 118000,
    originalPrice: 132000,
    discount: "11% OFF",
    featured: false,
    rating: 4.9,
    reviewsCount: 20,
    badge: "COLOR TENDENCIA",
    images: [
      "/products/ambo-verde-seco.jpg",
      "/products/ambo-verde-oliva-rosa-sentada.jpg"
    ],
    colors: [
      { name: "Verde Seco / Sage", hex: "#7a8b7b", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "El verde seco es el tono más solicitado de la temporada por su versatilidad y armonía visual.",
      casaca: "Casaca con entalle anatómico y bolsillos amplios.",
      pantalon: "Pantalón corte recto con cintura elastizada.",
      composicion: "97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría"]
    }
  }
];

export const categories = [
  {
    id: "ambos-mujer",
    name: "AMBOS MUJER",
    subCategories: ["Spandex", "Tricolor", "Edición Especial", "Gabardina"]
  },
  {
    id: "ambos-hombre",
    name: "AMBOS HOMBRE",
    subCategories: ["Spandex", "Gris y Negro", "Clásicos"]
  },
  {
    id: "ambos-unisex",
    name: "AMBOS UNISEX",
    subCategories: ["Spandex", "Azul Francia", "Guardia 24hs"]
  },
  {
    id: "chaquetas",
    name: "CHAQUETAS",
    subCategories: ["Cuello Mao", "Estilo Dior", "Con Cierre"]
  },
  {
    id: "pantalones",
    name: "PANTALONES",
    subCategories: ["Jogger Spandex", "Rectos Confort", "Cargo"]
  },
  {
    id: "accesorios",
    name: "ACCESORIOS",
    subCategories: ["Cofias Quirúrgicas", "Portacredenciales", "Bolsos"]
  }
];
