export const SIZE_STATUS = {
  EN_STOCK: "en-stock",
  A_PEDIDO: "a-pedido",
  AGOTADO: "agotado",
};

export function getSizeStatus(size) {
  if (!size) return SIZE_STATUS.AGOTADO;
  const valid = Object.values(SIZE_STATUS);
  if (size.status && valid.includes(size.status)) return size.status;
  return (size.stock || 0) > 0 ? SIZE_STATUS.EN_STOCK : SIZE_STATUS.A_PEDIDO;
}

export const isSizeAvailable = (size) =>
  getSizeStatus(size) !== SIZE_STATUS.AGOTADO;

export function sizeAvailabilityText(size) {
  switch (getSizeStatus(size)) {
    case SIZE_STATUS.EN_STOCK:
      return "En stock — se despacha en 24 h";
    case SIZE_STATUS.A_PEDIDO:
      return "A pedido — listo en 7 días hábiles";
    default:
      return "Agotado";
  }
}
