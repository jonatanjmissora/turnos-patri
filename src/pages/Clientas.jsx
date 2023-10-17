import "../styles/Clientas.css";
import { getClientas } from "../services/getClientas";
import { useState } from "react";
import { formatedValor } from "../services/formatedValor";

const Clientas = () => {
  const [clientas, sortedNombres] = getClientas();

  return (
    <div className="clientas-container">
      <div className="clientas-header">
        <h2 className="clientas-title">Clientas</h2>
      </div>
      {sortedNombres.map((nombre) => (
        <Clienta key={nombre} nombre={nombre} turnos={clientas[nombre]} />
      ))}
    </div>
  );
};

const Clienta = ({ nombre, turnos }) => {
  const [showTurnos, setShowTurnos] = useState(false);

  return (
    <div className="clienta">
      <p
        className="clienta-nombre"
        onClick={() => setShowTurnos((prev) => !prev)}
      >
        {nombre} ({turnos.length})
      </p>
      {showTurnos && <ClientaTurnos turnos={turnos} />}
    </div>
  );
};

const ClientaTurnos = ({ turnos }) => {
  const totalClienta = turnos.reduce((acc, turno) => acc + turno.valor, 0);

  return (
    <div className="clienta-turnos">
      {turnos.map((turno) => (
        <ClientaTurno key={turno.id} turno={turno} />
      ))}
      <p className="total-clienta">total : $ {formatedValor(totalClienta)}</p>
    </div>
  );
};

const ClientaTurno = ({ turno }) => {
  const formatedDate = (fecha) => {
    return `${fecha.substring(0, 4)}-${fecha.substring(4, 6)}-${fecha.substring(
      6,
      8
    )}`;
  };

  const turnoType = turno.is_depi
    ? "clienta-turno depi"
    : "clienta-turno turno";

  return (
    <div className={turnoType}>
      <span>{formatedDate(turno.fecha.toString())}</span>
      <span>{turno.tratamiento}</span>
      <span>{formatedValor(turno.valor)}</span>
    </div>
  );
};

export default Clientas;
