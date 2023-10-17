import { useState } from "react";

export const InputHora = ({ value }) => {
  const [hora, setHora] = useState(value);

  const handleChange = (e) => {
    if (e.target.value.length > 4) return;
    setHora(e.target.value);
  };

  return (
    <>
      <input
        onChange={handleChange}
        className="hora-form-input"
        type="number"
        name="hora"
        value={hora}
        required
        placeholder="hora"
      />
    </>
  );
};
