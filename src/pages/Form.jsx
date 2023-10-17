import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TurnosData } from "../context/TurnosContext";

import { FormTitle } from "../components/Form/FormTitle";
import { InputHora } from "../components/Form/InputHora";
import { Input } from "../components/Form/Input";
import { InputDuracion } from "../components/Form/InputDuracion";
import { Select } from "../components/Form/Select";
import { useForm } from "../hooks/useForm";

import { FaTimes } from "react-icons/fa";
import "../styles/Form.css";

export const Form = () => {
  const { turnos } = TurnosData();
  const { formSubmit } = useForm();
  const { id } = useParams();
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let formTurno = {
    id: "",
    fecha: "",
    hora: "",
    is_depi: false,
    nombre: "",
    tratamiento: "servis semipermanente",
    duracion: 15,
    valor: ""
  };
  if (id.length > 10 && JSON.stringify(turnos) !== "{}") {
    const fecha = id.substring(0, 8);
    formTurno = turnos[fecha]?.find((turno) => turno.id === parseInt(id, 10));
  }

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      const error = await formSubmit(event, id);
      if (error) {
        throw new Error(error);
      } else navigate("/");
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <FormTitle id={id} />

      <span className="form-cancel-btn" onClick={handleCancel}>
        <FaTimes />
      </span>

      {/*         Hora y Nombre             */}
      <div className="form-row">
        <InputHora value={formTurno?.hora} />
        <Input
          className="valor-form-input"
          label="nombre"
          type="text"
          name="nombre"
          value={formTurno?.nombre}
        />
      </div>

      {/*         Tratamiento            */}
      <div className="form-row">
        <Select value={formTurno?.tratamiento} />
      </div>

      {/*         Duracion y Valor             */}
      <div className="form-row">
        <InputDuracion value={formTurno?.duracion} />

        <Input
          label="valor"
          type="number"
          name="valor"
          value={formTurno?.valor}
        />
      </div>
      <div className="form-row last-row">
        <button className="form-submit-btn" type="submit">
          {loading && (
            <div className="loader-container">
              <span className="loader">.</span>
              <span className="loader two">.</span>
              <span className="loader three">.</span>
            </div>
          )}
          {formTurno?.id ? "Modificar" : "Agregar"}
        </button>
        <p className="submit-error">{submitError}</p>
      </div>
    </form>
  );
};
