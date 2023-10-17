export const getTratamiento = (tratamiento, otro) => {
  let tratamientoAux = tratamiento;
  let is_depi = false;
  if (tratamiento === "depilacion") {
    const tratamientosDepi = document.querySelectorAll(".active");
    const tratamientosDepiArray = [];
    tratamientosDepi.forEach((tD) =>
      tratamientosDepiArray.push(tD.textContent)
    );
    tratamientoAux = tratamientosDepiArray.join(" / ");
    is_depi = true;
  }

  if (tratamiento === "otro") {
    tratamientoAux = otro;
  }

  return [tratamientoAux, is_depi];
};

export const checkHoraFormat = (hora) => {
  while (hora.length !== 4) {
    hora = "0" + hora;
  }
  if (
    !(
      parseInt(hora.substring(0, 2), 10) < 24 &&
      parseInt(hora.substring(2, 4), 10) < 60
    )
  )
    hora = null;
  return hora;
};
