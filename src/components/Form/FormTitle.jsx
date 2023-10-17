import { getHeaderDay } from "../../services/getHeaderDay";
export const FormTitle = ({ id }) => {
  const [dayStr, dayNum, month] = getHeaderDay(id);

  const formatDate = () => {
    return (
      id.substring(0, 4) + "-" + id.substring(4, 6) + "-" + id.substring(6, 8)
    );
  };

  return (
    <div className="form-title">
      {id.length > 10 ? (
        <>
          <span>Dia</span>
          <input
            className="form-title-date-input"
            type="date"
            name="fecha"
            defaultValue={formatDate()}
          />
        </>
      ) : (
        <>
          <span>{dayStr}</span>
          <span>{dayNum}</span>
          <span>{month}</span>
        </>
      )}
    </div>
  );
};
