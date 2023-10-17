export const formatedValor = (valor) => {
  const valorStr = valor.toString();
  return valorStr.length > 3
    ? valorStr.slice(0, -3) + "." + valorStr.slice(-3)
    : valorStr;
};
