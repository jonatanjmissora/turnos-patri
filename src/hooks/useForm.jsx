import { AuthData } from "../context/AuthContext";
import { TurnosData } from "../context/TurnosContext";
import { checkHoraFormat, getTratamiento } from "../services/formUtils";

export const useForm = () => {
  const { user } = AuthData();
  const { turnos, addTurno, deleteTurno, updateTurnos } = TurnosData();

  const checkTurnoInConflict = (id, fecha, hora, duracion) => {
    if (!turnos[fecha]) return [undefined, ""];

    const newTurnoStart = +hora.substring(0, 2) * 60 + +hora.substring(2, 4);
    const newTurnoEnd = newTurnoStart + parseInt(duracion, 10);

    const newTurnosFecha = turnos[fecha].filter(
      (t) => t.id !== parseInt(id, 10)
    );

    const turnoInConflict = newTurnosFecha.find((turno) => {
      const turnoStart =
        +turno.hora.substring(0, 2) * 60 + +turno.hora.substring(2, 4);
      const turnoEnd = turnoStart + turno.duracion;
      return (
        (newTurnoStart >= turnoStart) & (newTurnoStart < turnoEnd) ||
        (newTurnoEnd > turnoStart) & (newTurnoEnd <= turnoEnd) ||
        (newTurnoStart <= turnoStart) & (newTurnoEnd >= turnoEnd)
      );
    });

    let turnoInConflictJSON = "";
    if (turnoInConflict) {
      const turnoInConflictStart =
        +turnoInConflict.hora.substring(0, 2) * 60 +
        +turnoInConflict.hora.substring(2, 4);
      const turnoInConflictEnd =
        turnoInConflictStart + parseInt(turnoInConflict.duracion, 10);

      const turnoInConflictEndStr =
        "" + Math.floor(turnoInConflictEnd / 60) + (turnoInConflictEnd % 60);

      turnoInConflictJSON = `CONFLICTO: ${turnoInConflict.hora} - ${turnoInConflictEndStr}  ${turnoInConflict.nombre}  ${turnoInConflict.tratamiento}`;
    }
    return [turnoInConflict, turnoInConflictJSON];
  };

  const formSubmit = async (event, id) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const { ...formInputs } = Object.fromEntries(formData);
    //console.log("formInputs", formInputs)
    let isEdit = id.length > 10;

    let newHora = checkHoraFormat(formInputs.hora);
    if (!newHora) return "hora incorrecta...";
    let newFecha = isEdit ? formInputs.fecha.split("-").join("") : id;
    let newId = newFecha + newHora;
    let newNombre = formInputs.nombre;
    let [newTratamiento, newIs_depi] = getTratamiento(
      formInputs.tratamiento,
      formInputs.otro
    );
    let newDuracion = formInputs.duracion;
    let newValor = formInputs.valor;
    let newUser_email = user.email;
    if (newTratamiento === "") return "seleccione un tratamiento ...";

    const newTurno = {
      id: parseInt(newId, 10),
      fecha: parseInt(newFecha, 10),
      hora: newHora,
      is_depi: newIs_depi,
      nombre: newNombre,
      tratamiento: newTratamiento,
      duracion: parseInt(newDuracion, 10),
      valor: parseInt(newValor, 10),
      user_email: newUser_email
    };
    console.log("newTurno", newTurno);

    //  CHECK FECHA y HORA si hay conflicto;
    const [turnoInConflict, turnoInConflictJSON] = checkTurnoInConflict(
      id,
      newFecha,
      newHora,
      newDuracion
    );

    if (turnoInConflict) {
      return turnoInConflictJSON;
    }

    //  ES un turno NUEVO
    if (!isEdit) {
      const serverError = await addTurno(newTurno);
      if (serverError) return serverError;
      return;
    }

    //  ES un EDIT
    let serverError;
    if (id === newId) {
      serverError = await updateTurnos(id, newTurno);
      if (serverError) return serverError;
      return;
    } else {
      const serverErrorAdd = await addTurno(newTurno);
      const serverErrorDelete = await deleteTurno(id);
      if (serverErrorDelete || serverErrorAdd)
        return serverErrorDelete + serverErrorAdd;
      return;
    }
  };
  return { formSubmit };
};
