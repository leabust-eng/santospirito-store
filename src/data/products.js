// Catálogo completo de SantoSpirito - Inspirado en el estándar de calidad de Plavusa

export const products = [
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
      "https://images.unsplash.com/photo-1594824813589-9a706bfa43e0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Rosa Plumetí", hex: "#e2a9b3", inStock: true },
      { name: "Bordó", hex: "#6b172a", inStock: true },
      { name: "Celeste Sanitario", hex: "#7ba7bc", inStock: true }
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
      intro: "Ambo femenino confeccionado en gabardina elastizada de tacto suave con detalles en plumetí traslúcido reforzado. Brinda un calce anatómico estilizado sin perder la holgura necesaria para jornadas intensas.",
      casaca: "Corte semi entallado femenino. Escote en V anatómico. Dos bolsillos frontales amplios de fácil acceso (aptos para celular de 6.7'') más bolsillo superior porta-lapicera/termómetro.",
      espalda: "Espalda con pinzas de entalle y tira trasera regulable con presillas.",
      pantalon: "Corte chupín / recto moderno. Tiro medio a alto con cintura elastizada de 4 cm que no marca. Dos bolsillos laterales profundos y un bolsillo cargo funcional.",
      composicion: "Gabardina Spandex: 97% Algodón, 3% Elastano. Detalles en Plumetí técnico 100% poliéster indeformable.",
      cuidados: [
        "Apto para lavarropas en ciclo delicado o agua fría",
        "No usar lavandina ni cloro directo sobre el color",
        "Plancha tibia del lado del revés",
        "Secado a la sombra para preservar la intensidad del tono"
      ]
    }
  },
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
    badge: "DESTACADO",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/44d79c226eaa92c228654fe429d81f229d77214f7ba34674dc704c0b1bf22663466763.jpg",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
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
      { size: "XXL", stock: 3 },
      { size: "XXXL", stock: 2 }
    ],
    description: {
      intro: "Ambo masculino confeccionado en tela elastizada de alta resistencia. Diseñado para cirujanos, médicos de guardia y kinesiólogos que demandan libertad de movimiento absoluto.",
      casaca: "Escote en V masculino reforzado con doble pespunte. Canesú en hombros para mayor movilidad de brazos. Bolsillo plaqué en pecho con división para lapicera y dos bolsillos inferiores con fuelle.",
      espalda: "Corte recto con aberturas laterales en el bajo que facilitan sentarse.",
      pantalon: "Corte recto clásico. Tiro medio. Cintura con elástico reforzado y cordón de ajuste interno. 4 bolsillos: dos laterales italianos y dos bolsillos cargo en muslo.",
      composicion: "Spandex Resist: 65% Poliéster, 32% Algodón, 3% Spandex.",
      cuidados: [
        "Apto para lavado frecuente a 40°C",
        "Resistente a salpicaduras y manchas",
        "Planchado fácil o colgado directo"
      ]
    }
  },
  {
    id: "ambo-enfermeria",
    slug: "ambo-enfermeria",
    name: "AMBO CLÁSICO ENFERMERÍA BLANCO + DETALLES AZULES",
    tagline: "El estándar de alta durabilidad para profesionales de enfermería",
    gender: "Unisex",
    category: "Ambos Unisex",
    subCategory: "Arciel",
    fabric: "Tela Arciel INTI Original",
    price: 105000,
    originalPrice: 120000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 52,
    badge: "OFERTA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/afb5633010031322605278bbdf053dcc269421f03079aabc2fb1d26df291e563466763.jpg",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Blanco Puro", hex: "#ffffff", inStock: true },
      { name: "Azul Marino", hex: "#1e3a5f", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 6 },
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 8 },
      { size: "XXL", stock: 4 }
    ],
    description: {
      intro: "Ambo profesional fabricado en tela Arciel de primera calidad. Apto para esterilización y lavados industriales frecuentes. No transparenta y mantiene el blanco impecable.",
      casaca: "Escote en V con vivos a contratono en escote y bolsillos. Tres bolsillos espaciosos.",
      espalda: "Con martingala trasera de ajuste.",
      pantalon: "Pantalón clásico con elástico en cintura y bolsillos traseros y laterales.",
      composicion: "65% Poliéster, 35% Viscosa Arciel auténtica.",
      cuidados: [
        "Apto para lavados a alta temperatura",
        "Resiste lavandina en versión blanco total",
        "Secado ultra rápido"
      ]
    }
  },
  {
    id: "chaqueta-mao-blanca-y-negra",
    slug: "chaqueta-mao-blanca-y-negra",
    name: "CHAQUETA MAO CON BROCHES BLANCA Y NEGRA",
    tagline: "Diseño elegante con cuello mao y broches de acero inoxidable",
    gender: "Mujer",
    category: "Chaquetas",
    subCategory: "Con Broches",
    fabric: "Gabardina Spandex Satinada",
    price: 55000,
    originalPrice: 62000,
    discount: "11% OFF",
    featured: true,
    rating: 5.0,
    reviewsCount: 19,
    badge: "NOVEDAD",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/91e9bf470eae4844922f165458abb84f5a4a975a9a0d6be962cbc088a7a7413f466763.jpg",
      "https://images.unsplash.com/photo-1594824813589-9a706bfa43e0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Blanco con vivos negros", hex: "#f8f9fa", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 8 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "Chaqueta de diseño vanguardista con cuello mao y cierre asimétrico mediante broches a presión metálicos de alta calidad que no se oxidan con los lavados.",
      casaca: "Cuello mao estructurado pero flexible. Cruce delantero con 6 broches metálicos. Mangas al codo o largas a elección.",
      espalda: "Fuelle en espalda para ventilación y facilidad de movimiento.",
      pantalon: "Prenda individual (se puede combinar con cualquier pantalón SantoSpirito).",
      composicion: "97% Algodón, 3% Elastano.",
      cuidados: [
        "Lavar con prendas del mismo tono",
        "No centrifugar a máximas revoluciones"
      ]
    }
  },
  {
    id: "chaqueta-dior-blanca-y-negra",
    slug: "chaqueta-dior-blanca-y-negra",
    name: "CHAQUETA ESTILO DIOR BICOLOR",
    tagline: "Corte de sastrería médica de alta gama para consultorios privados",
    gender: "Mujer",
    category: "Chaquetas",
    subCategory: "Sin Broches",
    fabric: "Crepé Spandex Pesado",
    price: 60000,
    originalPrice: 68000,
    discount: "12% OFF",
    featured: true,
    rating: 4.9,
    reviewsCount: 31,
    badge: "PREMIUM",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/156e5f7531652e9a6bf6a5ce957d74cd703c39ec5075c310d54acb8cd251fd25466763.jpg",
      "https://d22fxaf9t8d39k.cloudfront.net/c5324a406b92d3ce2f53bdaab8e430ce0d8f098131dcc25bbfdbf070e119f2b4466763.jpg",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Blanco / Negro", hex: "#222222", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 6 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    description: {
      intro: "Inspirada en la sastrería clásica francesa, la Chaqueta Dior es nuestra prenda más distinguida para odontólogas, dermatólogas y cirujanas plásticas.",
      casaca: "Solapas estilizadas a contratono, silueta peplum suave y bolsillos invisibles de ojal.",
      espalda: "Costuras princesa que modelan la cintura.",
      pantalon: "Se vende por separado.",
      composicion: "95% Poliéster Premium, 5% Spandex.",
      cuidados: [
        "Lavado en programa suave o a mano",
        "Plancha tibia con paño protector"
      ]
    }
  },
  {
    id: "ambo-verde-seco",
    slug: "ambo-verde-seco",
    name: "AMBO VERDE SECO CUELLO EN V SPANDEX",
    tagline: "El color tendencia de la temporada médica: sobrio, cálido y moderno",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex Soft Touch",
    price: 110000,
    originalPrice: 120000,
    discount: "8% OFF",
    featured: true,
    rating: 4.8,
    reviewsCount: 16,
    badge: "TENDENCIA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/2be2537df337c543470dbf8cfb8461947d709c98f1b627845f81113ea805f358466763.jpg",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594824813589-9a706bfa43e0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Verde Seco / Sage", hex: "#7a8b7b", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 8 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 3 }
    ],
    description: {
      intro: "Color Verde Seco mate, ideal para quienes buscan salirse del clásico blanco o azul sin perder sobriedad y profesionalismo.",
      casaca: "Escote V femenino con refuerzo. Bolsillos amplios y corte curvo en el bajo.",
      espalda: "Pinzas de ajuste en espalda.",
      pantalon: "Jogger o corte recto con bolsillos cargo y cintura elastizada regulable.",
      composicion: "97% Algodón peinado, 3% Elastano.",
      cuidados: [
        "Lavar con agua fría para mantener el color pastel"
      ]
    }
  },
  {
    id: "ambo-tricolor",
    slug: "ambo-tricolor",
    name: "AMBO TRICOLOR EDICIÓN LIMITADA",
    tagline: "Combinación armónica de bloques de color con diseño exclusivo",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex Premium",
    price: 110000,
    originalPrice: 125000,
    discount: "12% OFF",
    featured: false,
    rating: 4.7,
    reviewsCount: 12,
    badge: "EDICIÓN LIMITADA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/ba27fc27296edf58f7dc07846db7e58f0f1910e2d252befe130cc13fd1fcfafa466763.jpg",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Rosa + Gris + Blanco", hex: "#d1a3a4", inStock: true }
    ],
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 6 },
      { size: "L", stock: 3 }
    ],
    description: {
      intro: "Diseño tricolor en bloques geométricos que estilizan la figura y aportan dinamismo a tu uniforme diario.",
      casaca: "Corte entallado con 3 bloques de color armónicos y 2 bolsillos invisibles.",
      espalda: "Espalda lisa con vivos combinados.",
      pantalon: "Pantalón liso con detalle de vivo en bolsillo.",
      composicion: "Gabardina Spandex 97/3.",
      cuidados: ["Lavar con agua fría y jabón neutro"]
    }
  },
  {
    id: "ambo-celeste-verde-pistacho",
    slug: "ambo-celeste-verde-pistacho",
    name: "AMBO CELESTE + VERDE PISTACHO",
    tagline: "Frescura y vitalidad para consultorios de pediatría y estética",
    gender: "Mujer",
    category: "Ambos Mujer",
    subCategory: "Spandex",
    fabric: "Spandex Soft Touch",
    price: 100000,
    originalPrice: 115000,
    discount: "13% OFF",
    featured: false,
    rating: 4.9,
    reviewsCount: 22,
    badge: "OFERTA",
    images: [
      "https://d22fxaf9t8d39k.cloudfront.net/3cc4096500e9ec20dc44570d8eda1856bf0ef3b39e36e7ae88ad1e9e44c6ebcb466763.jpg",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Celeste / Pistacho", hex: "#8fc1b5", inStock: true }
    ],
    sizes: [
      { size: "XS", stock: 2 },
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 4 }
    ],
    description: {
      intro: "La combinación favorita de profesionales que atienden niños o áreas de rehabilitación, transmitiendo serenidad y alegría.",
      casaca: "Casaca celeste con vivos pistacho en cuello y bocamangas.",
      espalda: "Con tira regulable.",
      pantalon: "Pantalón en compose.",
      composicion: "Spandex 97% Algodón, 3% Elastano.",
      cuidados: ["Apto lavarropas"]
    }
  }
];

// Categorías completas clonadas del árbol de navegación de Plavusa
export const categories = [
  {
    id: "ambos-mujer",
    name: "AMBOS MUJER",
    subCategories: ["Spandex", "Arciel", "Estampados", "Edición Limitada"]
  },
  {
    id: "ambos-hombre",
    name: "AMBOS HOMBRE",
    subCategories: ["Spandex", "Arciel", "Clásicos"]
  },
  {
    id: "ambos-unisex",
    name: "AMBOS UNISEX",
    subCategories: ["Línea Sanitaria", "Guardia 24hs"]
  },
  {
    id: "chaquetas",
    name: "CHAQUETAS",
    subCategories: ["Con Broches", "Sin Broches", "Cuello Mao", "Estilo Dior"]
  },
  {
    id: "pantalones",
    name: "PANTALONES",
    subCategories: ["Jogger Spandex", "Rectos", "Cargo 6 Bolsillos"]
  },
  {
    id: "accesorios",
    name: "ACCESORIOS",
    subCategories: ["Cofias Quirúrgicas", "Portacredenciales", "Bolsos"]
  }
];
