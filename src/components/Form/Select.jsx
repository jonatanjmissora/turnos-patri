import { useEffect, useState } from "react";
import {
  TRATAMIENTO_OPTIONS,
  DEPILACION_OPTIONS
} from "../../data/tratamientos";
import { Input } from "./Input";

const isDepi = (value) => {
  const valueArray = value.split("/");
  return valueArray.every((v) => DEPILACION_OPTIONS.includes(v.trim()));
};

export const Select = ({ value }) => {
  const [tratamiento, setTratamiento] = useState(value);
  const [otro, setOtro] = useState(value);

  useEffect(() => {
    TRATAMIENTO_OPTIONS.includes(value)
      ? setTratamiento(value)
      : isDepi(value)
      ? setTratamiento("depilacion")
      : setTratamiento("otro");
  }, [value]);

  const handleSelectChange = (event) => {
    setTratamiento(event.target.value);
    setOtro("");
  };

  return (
    <div className="select-container">
      <select
        name="tratamiento"
        id="tratamiento-select"
        onChange={handleSelectChange}
        value={tratamiento}
      >
        {TRATAMIENTO_OPTIONS.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
      {tratamiento === "depilacion" && <DepiTratamientos depiOptions={value} />}
      {tratamiento === "otro" && (
        <Input
          className="otro-input"
          label=""
          type="text"
          name="otro"
          value={otro}
        />
      )}
    </div>
  );
};

const DepiTratamientos = ({ depiOptions }) => {
  const [options, setOptions] = useState(() => {
    let depiOptionsArray = depiOptions.split(" / ");
    depiOptionsArray =
      depiOptionsArray.length === 0
        ? depiOptionsArray.push(depiOptions)
        : depiOptionsArray.map((doa) => doa.trim());
    return depiOptionsArray;
  });

  return (
    <div className="depi-option-container">
      {DEPILACION_OPTIONS.map((dO) => (
        <DepiOption
          key={dO}
          option={dO}
          options={options}
          setOptions={setOptions}
        />
      ))}
    </div>
  );
};

const DepiOption = ({ option, options, setOptions }) => {
  const handleClick = (event) => {
    const optionElem = event.target;
    optionElem.classList.toggle("active");
    const optionTxt = optionElem.textContent;
    if (options.includes(optionTxt))
      setOptions((prev) => prev.filter((p) => p !== optionTxt));
    else setOptions((prev) => [...prev, optionTxt]);
  };

  const depiOptionClass = options.includes(option)
    ? "depi-option active"
    : "depi-option";

  return (
    <span className={depiOptionClass} onClick={handleClick}>
      {option}
    </span>
  );
};
