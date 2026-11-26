// Catálogo oficial de SantoSpirito - Confección prémium en Spandex y gabardina elastizada
import { SIZES_REAL } from './sizesReal';

const MAGENTA_MILITAR_MODELS = [
  {
    id: "magenta-verde-militar",
    name: "Chaqueta Magenta y Verde Militar",
    fullName: "AMBO MAGENTA Y VERDE MILITAR",
    tagline: "Chaqueta magenta con bolsillos frontales verde militar y vivos a tono",
    hex: "#9a1f59",
    contrastHex: "#4b5320",
    stockNote: "En stock para entrega inmediata",
    sizes: [
      { size: "XS", stock: 0, status: "agotado" },
      { size: "S", stock: 0, status: "agotado" },
      { size: "M", stock: 0, status: "agotado" },
      { size: "L", stock: 0, status: "agotado" },
      { size: "XL", stock: 3, status: "en-stock" },
      { size: "XXL", stock: 0, status: "agotado" },
    ],
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg",
      "/products/ambo-magenta-verde-militar-nuevo.jpg",
      "/products/ambo-magenta-oliva-pose.jpg"
    ]
  },
  {
    id: "verde-militar-magenta",
    name: "Chaqueta Verde Militar y Magenta",
    fullName: "AMBO VERDE MILITAR Y MAGENTA",
    tagline: "Chaqueta verde militar con vivos y pantalón en tono magenta",
    hex: "#4b5320",
    contrastHex: "#9a1f59",
    stockNote: "En stock para entrega inmediata",
    sizes: [
      { size: "XS", stock: 0, status: "agotado" },
      { size: "S", stock: 0, status: "agotado" },
      { size: "M", stock: 0, status: "agotado" },
      { size: "L", stock: 0, status: "agotado" },
      { size: "XL", stock: 0, status: "agotado" },
      { size: "XXL", stock: 1, status: "en-stock" },
    ],
    images: [
      "/products/ambo-verde-militar-magenta-sentada.png",
      "/products/ambo-verde-militar-magenta-pie.jpg",
      "/products/ambo-verde-militar-magenta.jpg"
    ]
  }
];

export const products = [
  // 1. AMBO TRICOLOR BLUE GREEN (Carousel Slide 2)
  {
    id: "ambo-tricolor-menta-blanco",
    slug: "ambo-tricolor-blue-green",
    name: "AMBO TRICOLOR BLUE GREEN",
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
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
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

  // 2. AMBO CHIELO (Carousel Slide 1)
  {
    id: "ambo-celeste-marino",
    slug: "ambo-chielo",
    name: "AMBO CHIELO",
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
      "/products/ambo-chielo-mao.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg",
      "/products/ambo-celeste-marino-pose.jpg"
    ],
    colors: [
      { name: "Celeste Sanitario + Azul Marino", hex: "#7ba7bc", inStock: true },
      { name: "Azul Marino Sólido", hex: "#1e3a5f", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
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

  // 3. AMBO SAFIRO BEIGE C/ NEGRO (Carousel Slide 3)
  {
    id: "ambo-beige-negro",
    slug: "ambo-safiro-beige-negro",
    name: "AMBO SAFIRO BEIGE C/ NEGRO",
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
      "/products/ambo-safiro-beige-negro-nuevo.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/6db6e534003861e5572bae4eb67cde08963f4a8f4a8d530378623f4a0c091d79466763.jpg",
      "/products/ambo-beige-negro-sentada.jpg"
    ],
    colors: [
      { name: "Beige Camel + Negro", hex: "#c8b29b", inStock: true },
      { name: "Negro Azabache", hex: "#1f2022", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
    ],
    description: {
      intro: "Un estilo sofisticado inspirado en las pasarelas europeas. Combina un tono camel cálido con detalles en negro intenso.",
      casaca: "Corte semi entallado, bolsillos ergonómicos para celular de 6.7 pulgadas.",
      pantalon: "Pantalón negro elastizado que estiliza las piernas sin apretar.",
      composicion: "Gabardina elastizada 97% algodón, 3% spandex.",
      cuidados: ["Lavar con colores similares", "No usar cloro"]
    }
  },



  // 5. AMBO AZUL QUIRÚRGICO (Carousel Slide 5)
  {
    id: "ambo-azul-quirurgico",
    slug: "azzuro-francia",
    name: "AZZURO FRANCIA",
    tagline: "Azul Francia intenso en tela técnica de alta resistencia",
    gender: "Unisex",
    category: "Ambos Unisex",
    subCategory: "Azul Francia",
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
      { name: "Azul Francia", hex: "#0055a5", inStock: true }
    ],
    sizes: [
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" },
      { size: "3XL" }
    ],
    description: {
      intro: "Diseñado para resistir largas jornadas de guardia, quirófano o clínica veterinaria. Tela que no destiñe ni pierde elasticidad.",
      casaca: "Cuello en V tradicional reforzado, triple costura en zonas de mayor tensión.",
      pantalon: "Pantalón unisex de corte recto con cordón de ajuste regulable en cintura.",
      composicion: "65% Poliéster técnico, 32% Algodón, 3% Elastano.",
      cuidados: ["Apto autoclave y lavado con desinfectantes hospitalarios"]
    }
  },

  // 6. TRICOLOR GREEN (Carousel Slide 5)
  {
    id: "ambo-menta-negro",
    slug: "tricolor-green",
    name: "TRICOLOR GREEN",
    tagline: "Chaqueta verde menta y negro tricolor con pantalón recto elastizado",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Tricolor",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 142000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 33,
    badge: "EDICIÓN TRICOLOR",
    images: [
      "/products/ambo-tricolor-green-recto.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/6472c905867ad8d562bf38c2395b5b10f7fa921fadba6aa0d0fb88a4f3b2ed14466763.jpg",
      "/products/ambo-menta-negro-pose.jpg"
    ],
    colors: [
      { name: "Tricolor Green", hex: "#98ddca", inStock: true },
      { name: "Negro Sólido", hex: "#1e1e1e", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
    ],
    description: {
      intro: "Combinación tricolor en verde menta y negro con corte moderno y pantalón recto de caída estilizada para tu jornada clínica.",
      casaca: "Chaqueta tricolor menta y negro con bolsillos laterales reforzados.",
      pantalon: "Pantalón recto negro elastizado con cintura anatómica confort.",
      composicion: "Spandex Premium 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secar colgado"]
    }
  },

  // 6. AMBO MAGENTA Y VERDE MILITAR (Carousel Slide 6)
  {
    id: "ambo-magenta-oliva",
    slug: "ambo-magenta-y-verde-militar",
    name: "AMBO MAGENTA Y VERDE MILITAR",
    tagline: "Impactante chaqueta magenta con bolsillos frontales verde oliva y pantalón anatómico haciendo juego",
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
    defaultModelId: "magenta-verde-militar",
    models: MAGENTA_MILITAR_MODELS,
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg",
      "/products/ambo-magenta-verde-militar-nuevo.jpg",
      "/products/ambo-magenta-oliva-pose.jpg",
      "/products/ambo-verde-militar-magenta-sentada.png"
    ],
    colors: [
      { name: "Chaqueta Magenta y Verde Militar", hex: "#9a1f59", inStock: true },
      { name: "Chaqueta Verde Militar y Magenta", hex: "#4b5320", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 0, status: "agotado" },
      { size: "S", stock: 0, status: "agotado" },
      { size: "M", stock: 0, status: "agotado" },
      { size: "L", stock: 0, status: "agotado" },
      { size: "XL", stock: 3, status: "en-stock" },
      { size: "XXL", stock: 0, status: "agotado" }
    ],
    description: {
      intro: "Para profesionales que buscan distinción y diseño. Disponible en dos variantes combinadas con chaqueta magenta o chaqueta verde militar según tu preferencia.",
      casaca: "Casaca entallada con bolsillos frontales reforzados en contratono y cuello pikito anatómico.",
      pantalon: "Pantalón elastizado confort con tiro medio/alto.",
      composicion: "Spandex Premium 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secar colgado"]
    }
  },

  // 7. AMBO VERDE MILITAR Y MAGENTA
  {
    id: "ambo-verde-militar-y-magenta",
    slug: "ambo-verde-militar-y-magenta",
    name: "AMBO VERDE MILITAR Y MAGENTA",
    tagline: "Chaqueta verde militar con vivos y detalles magenta en tela Gabardina Spandex",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 128000,
    originalPrice: 145000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 18,
    badge: "NUEVO INGRESO 2026",
    defaultModelId: "verde-militar-magenta",
    models: MAGENTA_MILITAR_MODELS,
    images: [
      "/products/ambo-verde-militar-magenta-sentada.png",
      "/products/ambo-verde-militar-magenta-pie.jpg",
      "/products/ambo-verde-militar-magenta.jpg"
    ],
    colors: [
      { name: "Chaqueta Verde Militar y Magenta", hex: "#4b5320", inStock: true },
      { name: "Chaqueta Magenta y Verde Militar", hex: "#9a1f59", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 0, status: "agotado" },
      { size: "S", stock: 0, status: "agotado" },
      { size: "M", stock: 0, status: "agotado" },
      { size: "L", stock: 0, status: "agotado" },
      { size: "XL", stock: 0, status: "agotado" },
      { size: "XXL", stock: 1, status: "en-stock" }
    ],
    description: {
      intro: "La variante con chaqueta en verde militar otorga presencia profesional y serenidad, complementada con detalles y pantalón en tono magenta.",
      casaca: "Casaca verde militar con bolsillos amplios reforzados y vivos magenta.",
      pantalon: "Pantalón elastizado confort con tiro anatómico.",
      composicion: "Spandex Premium 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secar colgado"]
    }
  },

  // 8. BOLSILLOS ANATÓMICOS TRICOLOR
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
    featured: false,
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
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
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
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
    ],
    description: {
      intro: "Destacado en nuestra comunidad oficial de Facebook. Un diseño dulce pero con personalidad gracias a los vivos profundos en bordeaux.",
      casaca: "Casaca en rosa pastel con pinzas anatómicas traseras y vivos bordeaux.",
      pantalon: "Pantalón bordeaux recto con cintura elastizada.",
      composicion: "Gabardina Spandex 97% algodón, 3% elastano.",
      cuidados: ["Lavar con agua fría", "Secado a la sombra"]
    }
  },

  // 10. AMBO TOPACIO CUELLO CORAZÓN (Actualizado con foto real y stock Excel)
  {
    id: "ambo-topacio",
    slug: "ambo-topacio-cuello-corazon",
    name: "AMBO TOPACIO CUELLO CORAZÓN",
    tagline: "Chaqueta blanca cuello corazón con vivos azul topacio y pantalón haciendo juego",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 19,
    badge: "CUELLO CORAZÓN • STOCK",
    images: [
      "/products/ambo-topacio-cuello-corazon.jpg"
    ],
    colors: [
      { name: "Blanco + Azul Topacio", hex: "#007791", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
    ],
    description: {
      intro: "Chaqueta blanca luminosa con delicados vivos en azul topacio en cuello corazón y bolsillos, combinada con pantalón azul topacio.",
      casaca: "Chaqueta cuello corazón con vivos contrastantes y bolsillos frontales amplios.",
      pantalon: "Pantalón azul topacio de corte recto confort con cintura elastizada.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Apto lavarropas programa delicado", "Planchado fácil"]
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
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
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
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
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
    name: "AMBO ROSA PLUMETI",
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
      "/products/ambo-rosa-plumeti.jpg",
      "/products/ambo-plumeti-rosa-nuevo.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/8e88e15d99e302000e6362428e137b9f64fd5b6d004a668ddf4d02fadb4bcb56466763.jpg",
      "/products/ambo-rosita-bordeaux.jpg"
    ],
    colors: [
      { name: "Rosa Plumetí", hex: "#e2a9b3", inStock: true },
      { name: "Bordó", hex: "#6b172a", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
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
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" }
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
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
    ],
    description: {
      intro: "Indispensable para estudiantes e instituciones que requieren uniforme reglamentario blanco con vivos azul marino.",
      casaca: "Bolsillos reforzados para instrumental básico.",
      pantalon: "Pantalón elastizado de fácil lavado.",
      composicion: "Gabardina antimancha de larga duración.",
      cuidados: ["Apto blanqueadores según protocolo hospitalario"]
    }
  },

  // 16. AMBO VERDE SECO CUELLO EN V
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
    ],
    colors: [
      { name: "Verde Seco / Sage", hex: "#7a8b7b", inStock: true }
    ],
    sizes: [
      { size: "XS" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
    ],
    description: {
      intro: "El verde seco es el tono más solicitado de la temporada por su versatilidad y armonía visual.",
      casaca: "Casaca con entalle anatómico y bolsillos amplios.",
      pantalon: "Pantalón corte recto con cintura elastizada.",
      composicion: "97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría"]
    }
  },
  // === NUEVOS INGRESOS DEL EXCEL CON STOCK REAL ===
  {
    id: "ambo-chocobeige",
    slug: "ambo-chocobeige",
    name: "AMBO CHOCOBEIGE",
    tagline: "Chaqueta beige camel con vivos chocolate y pantalón chocolate anatómico",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 142000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 16,
    badge: "NUEVO INGRESO 2026",
    images: ["/products/ambo-chocobeige.jpg"],
    colors: [
      { name: "Beige + Chocolate", hex: "#6f4e37", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Combinación cálida y sofisticada de beige con vivos y pantalón en tono chocolate intenso.",
      casaca: "Cuello corazón con vivos chocolate, corte semi entallado y doble bolsillo frontal.",
      pantalon: "Pantalón recto chocolate elastizado de calce anatómico.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "Secado a la sombra"]
    }
  },
  {
    id: "ambo-beige-verde-malta",
    slug: "ambo-beige-verde-malta",
    name: "AMBO BEIGE C/ VERDE MALTA",
    tagline: "Casaca beige cuello corazón con vivos verde malta y pantalón verde malta",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 142000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 14,
    badge: "NUEVO INGRESO 2026",
    images: ["/products/ambo-beige-verde-malta.jpg"],
    colors: [
      { name: "Beige + Verde Malta", hex: "#5c7056", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Diseño natural y distinguido que fusiona casaca beige claro con detalles y pantalón en verde malta.",
      casaca: "Casaca cuello corazón con vivos verde malta y bolsillos delanteros amplios.",
      pantalon: "Pantalón recto verde malta elastizado con cintura confort.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "No usar cloro"]
    }
  },
  {
    id: "ambo-topacio-cuello-mao",
    slug: "ambo-topacio-cuello-mao",
    name: "AMBO TOPACIO CUELLO MAO",
    tagline: "Chaqueta blanca cuello mao con vivos azul topacio y pantalón azul oscuro",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 12,
    badge: "CUELLO MAO • STOCK",
    images: ["/products/ambo-topacio-cuello-mao.jpg"],
    colors: [
      { name: "Blanco + Azul Topacio", hex: "#005f73", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Impecable modelo Cuello Mao en blanco clínico con vivos azul topacio y pantalón a tono.",
      casaca: "Casaca blanca cuello mao con terminaciones contrastantes y bolsillos funcionales.",
      pantalon: "Pantalón azul oscuro de calce anatómico elastizado.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Apto lavarropas programa delicado", "Plancha tibia"]
    }
  },
  {
    id: "ambo-chocolate",
    slug: "ambo-chocolate",
    name: "AMBO CHOCOLATE",
    tagline: "Monocromo chocolate profundo con delicados vivos claros en cuello corazón",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 124000,
    originalPrice: 140000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 11,
    badge: "STOCK INMEDIATO",
    images: ["/products/ambo-chocolate.jpg"],
    colors: [
      { name: "Chocolate + Vivos Claros", hex: "#4a3228", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Ambo monocromático color chocolate que estiliza la silueta con delicados vivos claros en escote y bolsillo.",
      casaca: "Casaca cuello corazón en tono chocolate con costuras reforzadas.",
      pantalon: "Pantalón recto chocolate elastizado de cintura confortable.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar del revés con agua fría"]
    }
  },
  {
    id: "ambo-tricolor-topo",
    slug: "ambo-tricolor-topo",
    name: "AMBO TRICOLOR TOPO",
    tagline: "Tricolor en rosa pastel, banda gris perla y base con pantalón gris topo",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Tricolor",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 15,
    badge: "EDICIÓN TRICOLOR",
    images: ["/products/ambo-tricolor-topo.jpg"],
    colors: [
      { name: "Rosa + Gris + Topo", hex: "#4f5459", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Diseño tricolor de vanguardia que combina parte superior rosa pastel, banda gris claro y pantalón gris topo.",
      casaca: "Casaca tricolor con bolsillos frontales amplios en tono topo.",
      pantalon: "Pantalón recto gris topo elastizado de calce anatómico.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "No usar cloro"]
    }
  },
  {
    id: "ambo-tricolor-rose",
    slug: "ambo-tricolor-rose",
    name: "AMBO TRICOLOR ROSÉ",
    tagline: "Armoniosa combinación tricolor en rosa pastel y gris perla claro",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Tricolor",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 10,
    badge: "EDICIÓN TRICOLOR",
    images: ["/products/ambo-tricolor-rose.jpg"],
    colors: [
      { name: "Rosa + Gris Perla", hex: "#e8b4bc", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Estética luminosa y femenina con bloque superior rosa suave y base en gris claro.",
      casaca: "Casaca tricolor con escote en V y bolsillos delanteros funcionales.",
      pantalon: "Pantalón gris claro elastizado con tiro ergonómico.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "Secado a la sombra"]
    }
  },
  {
    id: "ambo-tricolor-rojo-gris-negro",
    slug: "ambo-tricolor-rojo-gris-negro",
    name: "AMBO TRICOLOR ROJO, GRIS Y NEGRO",
    tagline: "Edición tricolor de alto impacto en rojo carmesí, gris grafito y negro",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Tricolor",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 13,
    badge: "EDICIÓN TRICOLOR",
    images: ["/products/ambo-tricolor-rojo-gris-negro.jpg"],
    colors: [
      { name: "Rojo + Gris + Negro", hex: "#b91c1c", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Presencia enérgica con bloques estratégicos en rojo, gris medio y negro azabache.",
      casaca: "Casaca tricolor con refuerzo en hombros y bolsillos de gran capacidad.",
      pantalon: "Pantalón negro elastizado de calce anatómico.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar por separado con agua fría"]
    }
  },
  {
    id: "ambo-rococo-3-verde-militar",
    slug: "ambo-rococo-3-verde-militar",
    name: "AMBO ROCOCÓ 3 VERDE MILITAR C/ BLANCO",
    tagline: "Cuello mao bipartito en blanco óptico y verde militar con pantalón a tono",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 126000,
    originalPrice: 143000,
    discount: "12% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 9,
    badge: "EDICIÓN ESPECIAL",
    images: ["/products/ambo-rococo-3-verde-militar-blanco.jpg"],
    colors: [
      { name: "Blanco + Verde Militar", hex: "#4b5320", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Modelo Rococó-3 con canesú superior blanco y base en verde militar que aporta frescura y estructura.",
      casaca: "Cuello mao con corte bicolor blanco/verde militar y bolsillos inferiores profundos.",
      pantalon: "Pantalón verde militar recto con cintura elastizada confortable.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "Secado colgado"]
    }
  },
  {
    id: "ambo-plumeti-celeste",
    slug: "ambo-plumeti-celeste",
    name: "AMBO PLUMETI CELESTE",
    tagline: "Delicado conjunto celeste cielo en tejido plumetí texturado con calce anatómico",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex + Tejido Plumetí",
    price: 124000,
    originalPrice: 140000,
    discount: "11% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 11,
    badge: "TEJIDO PLUMETÍ",
    images: ["/products/ambo-plumeti-celeste.jpg"],
    colors: [
      { name: "Celeste Plumetí", hex: "#93c5fd", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Textura plumetí en tono celeste clínico, suave al tacto y sumamente fresca.",
      casaca: "Casaca cuello corazón en tela plumetí con pinzas que estilizan.",
      pantalon: "Pantalón celeste haciendo juego de corte recto.",
      composicion: "Spandex Premium + Plumetí.",
      cuidados: ["Lavar en ciclo delicado", "Secar a la sombra"]
    }
  },
  {
    id: "ambo-azul-marino-rosa-bebe",
    slug: "ambo-azul-marino-rosa-bebe",
    name: "AMBO AZUL MARINO Y ROSA BEBÉ",
    tagline: "Casaca bicolor rosa bebé con azul marino y pantalón náutico haciendo juego",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 142000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 10,
    badge: "EDICIÓN ESPECIAL",
    images: ["/products/ambo-azul-marino-rosa-bebe.jpg"],
    colors: [
      { name: "Rosa Bebé + Azul Marino", hex: "#1e3a5f", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Contraste equilibrado entre la dulzura del rosa bebé superior y la sobriedad del azul marino.",
      casaca: "Casaca cuello corazón bicolor con vivos marinos y doble bolsillo.",
      pantalon: "Pantalón azul marino recto con cintura confortable.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría"]
    }
  },
  {
    id: "ambo-verde-oliva",
    slug: "ambo-verde-oliva",
    name: "AMBO VERDE OLIVA",
    tagline: "Casaca verde salvia con vivos oliva y pantalón verde oliva cuello pikito",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 124000,
    originalPrice: 140000,
    discount: "11% OFF",
    featured: true,
    rating: 4.8,
    reviewsCount: 9,
    badge: "CUELLO PIKITO",
    images: ["/products/ambo-verde-oliva.jpg"],
    colors: [
      { name: "Verde Salvia + Oliva", hex: "#556b2f", inStock: true }
    ],
    sizes: [{ size: "XS" }, { size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }],
    description: {
      intro: "Gama orgánica en dos intensidades de verde oliva con cuello pikito estilizado.",
      casaca: "Casaca verde salvia claro cuello pikito con vivos y detalles verde oliva.",
      pantalon: "Pantalón recto verde oliva oscuro con cintura elastizada.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría", "Secado a la sombra"]
    }
  },
  {
    id: "ambo-amatista",
    slug: "ambo-amatista",
    name: "AMBO AMATISTA",
    tagline: "Casaca blanca cuello pikito con vivos amatista y pantalón amatista intenso",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Gabardina Spandex Prémium",
    price: 125000,
    originalPrice: 142000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 8,
    badge: "TALLE ESPECIAL 3XL",
    images: ["/products/ambo-amatista.jpg"],
    colors: [
      { name: "Blanco + Amatista", hex: "#8e2463", inStock: true }
    ],
    sizes: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }, { size: "XXL" }, { size: "3XL" }],
    description: {
      intro: "Chaqueta blanca impecable con detalles en tono amatista profundo y pantalón confort haciendo juego.",
      casaca: "Cuello pikito con vivo amatista y bolsillos amplios.",
      pantalon: "Pantalón amatista de calce anatómico en talle especial 3XL.",
      composicion: "Gabardina Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Lavar con agua fría"]
    }
  },

  // PIEZA SUELTA: chaqueta del conjunto Azzurro Francia (fila 54 del depósito)
  {
    id: "chaqueta-azzurro-francia",
    slug: "chaqueta-azzurro-francia",
    name: "CHAQUETA AZZURRO FRANCIA CUELLO MAO",
    tagline: "La chaqueta del conjunto Azzurro Francia, sola (entrega inmediata)",
    gender: "Unisex",
    category: "Chaquetas",
    subCategory: "Azul Francia",
    fabric: "Arciel con elastano",
    price: 49500,
    originalPrice: 57500,
    discount: "OFERTA • -14%",
    featured: false,
    rating: 5,
    reviewsCount: 0,
    badge: "PIEZA SUELTA",
    images: ["/products/chaqueta-azzurro-francia.jpg"],
    colors: [{ name: "Azul Francia", hex: "#0055a5", inStock: true }],
    sizes: SIZES_REAL["chaqueta-azzurro-francia"],
    description: {
      intro: "Chaqueta suelta del conjunto Azzurro Francia. Se vende por separado.",
      casaca: "Cuello mao, corte recto, dos bolsillos inferiores.",
      pantalon: "",
      composicion: "Arciel con elastano.",
      cuidados: ["Lavado suave con agua fría", "Plancha tibia"]
    }
  },

  // PIEZA SUELTA: pantalón del conjunto Azzurro Francia (fila 81 del depósito)
  {
    id: "pantalon-azzurro-francia",
    slug: "pantalon-azzurro-francia",
    name: "PANTALÓN AZZURRO FRANCIA ARCIEL ELASTIZADO",
    tagline: "El pantalón del conjunto Azzurro Francia, solo (entrega inmediata)",
    gender: "Unisex",
    category: "Pantalones",
    subCategory: "Azul Francia",
    fabric: "Arciel elastizado",
    price: 49500,
    originalPrice: 57500,
    discount: "OFERTA • -14%",
    featured: false,
    rating: 5,
    reviewsCount: 0,
    badge: "PIEZA SUELTA",
    // TODO: foto propia del pantalón
    images: ["/products/ambo-azul-quirurgico-pose.jpg"],
    colors: [{ name: "Azul Francia", hex: "#0055a5", inStock: true }],
    sizes: SIZES_REAL["pantalon-azzurro-francia"],
    description: {
      intro: "Pantalón suelto del conjunto Azzurro Francia. Se vende por separado.",
      casaca: "",
      pantalon: "Corte recto, cintura elastizada, tela Arciel elastizada.",
      composicion: "Arciel con elastano.",
      cuidados: ["Lavado suave con agua fría", "Plancha tibia"]
    }
  }
];

// El stock real del depósito manda sobre los talles cargados a mano.
products.forEach((p) => {
  const real = SIZES_REAL[p.id] || SIZES_REAL[p.slug];
  if (real) p.sizes = real;
});

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
    subCategories: ["Línea Quirúrgica", "Azul Francia", "Enfermería"]
  },
  {
    id: "edicion-tricolor",
    name: "EDICIÓN TRICOLOR",
    subCategories: ["Menta y Blanco", "Detalle Bolsillos"]
  },
  {
    id: "chaquetas",
    name: "CHAQUETAS",
    subCategories: []
  },
  {
    id: "pantalones",
    name: "PANTALONES",
    subCategories: []
  }
];