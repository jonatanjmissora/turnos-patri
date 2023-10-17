import { TurnosData } from "../context/TurnosContext";

const sortObject = (obj) => {
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  return sortedKeys;
};

export const getClientas = () => {
  const { turnos } = TurnosData();

  const clientas = {};

  Object.values(turnos).forEach((turnosArray) =>
    turnosArray.forEach((turno) => {
      clientas[turno.nombre] = clientas[turno.nombre] || [];
      clientas[turno.nombre].push({
        id: turno.id,
        fecha: turno.fecha,
        tratamiento: turno.tratamiento,
        valor: turno.valor,
        is_depi: turno.is_depi
      });
    })
  );

  const sortedNombres = sortObject(clientas);

  return [clientas, sortedNombres];
};
