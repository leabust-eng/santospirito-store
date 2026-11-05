// Algoritmo de recomendación antropométrica y estimación de medidas corporales
// para el Vestuario Virtual de SantoSpirito

export function calculateMeasurements({ gender, height, weight, age = 30, fitPreference = 'normal' }) {
  const h = Number(height) || (gender === 'mujer' ? 165 : 175);
  const w = Number(weight) || (gender === 'mujer' ? 60 : 75);
  const a = Number(age) || 30;

  // Factores de edad (cambios sutiles en distribución corporal después de los 35)
  const ageWaistAdj = a > 35 ? Math.min(4, (a - 35) * 0.15) : 0;
  const ageBustAdj = a > 40 ? Math.min(2, (a - 40) * 0.10) : 0;

  let bust = 0;
  let waist = 0;
  let hip = 0;

  if (gender === 'mujer') {
    bust = Math.round(0.38 * h + 0.46 * w - 2 + ageBustAdj);
    waist = Math.round(0.28 * h + 0.48 * w - 11 + ageWaistAdj);
    hip = Math.round(0.40 * h + 0.58 * w - 5);
  } else {
    bust = Math.round(0.42 * h + 0.52 * w - 12 + ageBustAdj);
    waist = Math.round(0.35 * h + 0.55 * w - 18 + ageWaistAdj);
    hip = Math.round(0.40 * h + 0.50 * w - 5);
  }

  // Ajuste según preferencia de calce ('ajustado' | 'normal' | 'holgado')
  let fitAllowance = 0;
  if (fitPreference === 'ajustado') fitAllowance = -2;
  if (fitPreference === 'holgado') fitAllowance = 3;

  const targetBust = bust + fitAllowance;
  const targetHip = hip + fitAllowance;

  // Tablas de referencia SantoSpirito
  const femaleSizes = [
    { size: 'XS', bustMin: 80, bustMax: 88, waistMin: 60, waistMax: 67, hipMin: 84, hipMax: 92, jacketLen: 63, pantLen: 98 },
    { size: 'S', bustMin: 88, bustMax: 94, waistMin: 66, waistMax: 73, hipMin: 92, hipMax: 98, jacketLen: 65, pantLen: 100 },
    { size: 'M', bustMin: 94, bustMax: 100, waistMin: 72, waistMax: 79, hipMin: 98, hipMax: 104, jacketLen: 67, pantLen: 102 },
    { size: 'L', bustMin: 100, bustMax: 107, waistMin: 78, waistMax: 86, hipMin: 104, hipMax: 111, jacketLen: 69, pantLen: 103 },
    { size: 'XL', bustMin: 107, bustMax: 115, waistMin: 85, waistMax: 94, hipMin: 111, hipMax: 119, jacketLen: 71, pantLen: 105 },
    { size: 'XXL', bustMin: 115, bustMax: 124, waistMin: 93, waistMax: 102, hipMin: 119, hipMax: 127, jacketLen: 73, pantLen: 106 },
    { size: 'XXXL', bustMin: 124, bustMax: 135, waistMin: 101, waistMax: 112, hipMin: 127, hipMax: 138, jacketLen: 75, pantLen: 107 }
  ];

  const maleSizes = [
    { size: 'S', bustMin: 88, bustMax: 97, waistMin: 76, waistMax: 84, hipMin: 92, hipMax: 100, jacketLen: 70, pantLen: 102 },
    { size: 'M', bustMin: 97, bustMax: 105, waistMin: 84, waistMax: 92, hipMin: 100, hipMax: 108, jacketLen: 72, pantLen: 104 },
    { size: 'L', bustMin: 105, bustMax: 114, waistMin: 92, waistMax: 101, hipMin: 108, hipMax: 116, jacketLen: 74, pantLen: 106 },
    { size: 'XL', bustMin: 114, bustMax: 123, waistMin: 100, waistMax: 110, hipMin: 116, hipMax: 125, jacketLen: 76, pantLen: 108 },
    { size: 'XXL', bustMin: 123, bustMax: 133, waistMin: 109, waistMax: 120, hipMin: 124, hipMax: 135, jacketLen: 78, pantLen: 110 },
    { size: 'XXXL', bustMin: 133, bustMax: 145, waistMin: 119, waistMax: 130, hipMin: 134, hipMax: 146, jacketLen: 80, pantLen: 112 }
  ];

  const sizeTable = gender === 'mujer' ? femaleSizes : maleSizes;

  // Encontrar el talle con mayor puntaje de coincidencia
  let bestSize = sizeTable[1]; // default S / M
  let bestScore = -999999;
  let confidence = 94;

  for (const s of sizeTable) {
    const bustCenter = (s.bustMin + s.bustMax) / 2;
    const hipCenter = (s.hipMin + s.hipMax) / 2;
    const distBust = Math.abs(targetBust - bustCenter);
    const distHip = Math.abs(targetHip - hipCenter);
    
    // Penalización por quedar chico (en ambos de trabajo se prefiere holgura)
    const tooSmallPenalty = (targetBust > s.bustMax ? (targetBust - s.bustMax) * 3 : 0) +
                            (targetHip > s.hipMax ? (targetHip - s.hipMax) * 3 : 0);

    const score = -(distBust * 1.2 + distHip * 1.0 + tooSmallPenalty);

    if (score > bestScore) {
      bestScore = score;
      bestSize = s;
    }
  }

  // Índice de Masa Corporal (IMC)
  const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);

  // Sugerencia de largo de pantalón según altura
  let pantLengthNote = 'Largo ideal estándar';
  if (gender === 'mujer') {
    if (h < 155) pantLengthNote = 'Puede requerir 2-3 cm de botamanga';
    else if (h > 173) pantLengthNote = 'Calce tobillero moderno';
  } else {
    if (h < 168) pantLengthNote = 'Puede requerir 2-3 cm de botamanga';
    else if (h > 185) pantLengthNote = 'Calce estándar';
  }

  return {
    bust,
    waist,
    hip,
    recommendedSize: bestSize.size,
    jacketLength: bestSize.jacketLen,
    pantLength: bestSize.pantLen,
    pantLengthNote,
    bmi,
    confidence: Math.min(98, Math.max(88, Math.round(100 - Math.abs(bestScore) * 1.5)))
  };
}
