import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TurnosData } from "../../context/TurnosContext";
import { formatedValor } from "../../services/formatedValor";

export const DateCellListObj = ({ obj, setShowLists }) => {
  const { deleteTurno } = TurnosData();
  const [loading, setLoading] = useState(false);

  const objClass = obj.is_depi
    ? "date-cell-list-obj depi"
    : "date-cell-list-obj turno";
  const horaFormat = obj.hora.substring(0, 2) + ":" + obj.hora.substring(2, 4);

  const handleDeleteTurno = async (event, id) => {
    event.stopPropagation();
    setLoading(true);
    const error = await deleteTurno(id);
    if (error) {
      alert(error);
    } else {
      setLoading(false);

      //si no hay turnos ni depis, cierro dia
      const dateCellLists = document.querySelectorAll(
        `[data-date="${obj.fecha}"]`
      );
      if (dateCellLists.length < 2) {
        setShowLists(false);
      }
    }
  };

  return (
    <div className={objClass} data-date={obj.fecha}>
      <span className="date-cell-list-obj-time">{horaFormat}</span>
      <span className="date-cell-list-obj-name">{obj.nombre}</span>
      <span className="date-cell-list-obj-treatment">{obj.tratamiento}</span>
      <span className="date-cell-list-obj-duration">{obj.duracion}m</span>
      <span className="date-cell-list-obj-price">
        $ {formatedValor(obj.valor)}
      </span>
      <div className="date-cell-list-obj-icons">
        <Link to={"/" + obj.id}>
          <BsPencil />
        </Link>
        <span
          className={loading ? "delete-btn noclick" : "delete-btn"}
          onClick={(event) => handleDeleteTurno(event, obj.id)}
        >
          <BsTrash />
        </span>
      </div>
    </div>
  );
};
