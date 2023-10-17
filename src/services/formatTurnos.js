export const formatTurnos = (turnosResponse) => {
  let turnos = {};
  turnosResponse.forEach((turno) => {
    turnos[turno.fecha] = turnos[turno.fecha] || [];
    turnos[turno.fecha].push(turno);
  });
  return turnos;
};
