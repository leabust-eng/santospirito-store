// Guía oficial de medidas en centímetros para ambos SantoSpirito

export const sizeGuideData = {
  mujer: {
    title: "Ambos y Chaquetas Mujer (Corte Entallado)",
    description: "Medidas tomadas sobre la prenda extendida y/o contorno corporal sugerido en centímetros.",
    columns: ["Talle", "Busto (cm)", "Cintura (cm)", "Cadera (cm)", "Largo Casaca (cm)", "Largo Pantalón (cm)"],
    sizes: [
      { talle: "XS", busto: "84 - 88", cintura: "62 - 66", cadera: "88 - 92", largoCasaca: "63", largoPantalon: "98" },
      { talle: "S", busto: "88 - 94", cintura: "66 - 72", cadera: "92 - 98", largoCasaca: "65", largoPantalon: "100" },
      { talle: "M", busto: "94 - 100", cintura: "72 - 78", cadera: "98 - 104", largoCasaca: "67", largoPantalon: "102" },
      { talle: "L", busto: "100 - 106", cintura: "78 - 84", cadera: "104 - 110", largoCasaca: "69", largoPantalon: "103" },
      { talle: "XL", busto: "106 - 114", cintura: "84 - 92", cadera: "110 - 118", largoCasaca: "71", largoPantalon: "105" },
      { talle: "XXL", busto: "114 - 122", cintura: "92 - 100", cadera: "118 - 126", largoCasaca: "73", largoPantalon: "106" },
      { talle: "XXXL", busto: "122 - 130", cintura: "100 - 110", cadera: "126 - 136", largoCasaca: "75", largoPantalon: "107" }
    ]
  },
  hombre: {
    title: "Ambos y Chaquetas Hombre / Unisex (Corte Recto)",
    description: "Corte clásico más holgado en hombros y torso para máxima comodidad en guardias.",
    columns: ["Talle", "Pecho (cm)", "Cintura (cm)", "Cadera (cm)", "Largo Casaca (cm)", "Largo Pantalón (cm)"],
    sizes: [
      { talle: "S", busto: "92 - 98", cintura: "78 - 84", cadera: "94 - 100", largoCasaca: "70", largoPantalon: "102" },
      { talle: "M", busto: "98 - 106", cintura: "84 - 92", cadera: "100 - 108", largoCasaca: "72", largoPantalon: "104" },
      { talle: "L", busto: "106 - 114", cintura: "92 - 100", cadera: "108 - 116", largoCasaca: "74", largoPantalon: "106" },
      { talle: "XL", busto: "114 - 122", cintura: "100 - 108", cadera: "116 - 124", largoCasaca: "76", largoPantalon: "108" },
      { talle: "XXL", busto: "122 - 132", cintura: "108 - 118", cadera: "124 - 134", largoCasaca: "78", largoPantalon: "110" },
      { talle: "XXXL", busto: "132 - 142", cintura: "118 - 128", cadera: "134 - 144", largoCasaca: "80", largoPantalon: "112" }
    ]
  },
  measuringTips: [
    {
      title: "1. Busto / Pecho",
      text: "Mide con una cinta métrica alrededor de la parte más saliente del pecho manteniendo la cinta horizontal."
    },
    {
      title: "2. Cintura",
      text: "Mide alrededor de tu cintura natural (la parte más estrecha del abdomen, por encima del ombligo)."
    },
    {
      title: "3. Cadera",
      text: "Con los pies juntos, mide alrededor de la parte más ancha de tus caderas y glúteos."
    },
    {
      title: "4. Tip SantoSpirito",
      text: "Si estás entre dos talles o dudas, te recomendamos elegir el talle más amplio para mayor comodidad durante tus guardias y jornadas largas de trabajo."
    }
  ]
};
