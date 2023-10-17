import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
export const InputDuracion = ({ value }) => {
  const [duracion, setDuracion] = useState(value);
  useEffect(() => {
    setDuracion(value);
  }, [value]);

  const handleDuracionChange = (step) => {
    if (duracion === 0 && step === -15) return;
    setDuracion((prev) => prev + step);
  };

  return (
    <div className="form-row-duracion">
      <span onClick={() => handleDuracionChange(-15)}>
        <FaMinus />
      </span>
      <input
        name="duracion"
        className="duracion-form-input"
        type="number"
        value={duracion}
        readOnly
      />
      <span onClick={() => handleDuracionChange(15)}>
        <FaPlus />
      </span>
    </div>
  );
};
