import { TurnosData } from "../../context/TurnosContext";
import { formatedValor } from "../../services/formatedValor";
import { DateCell } from "./DateCell";

export const CalendarWeek = ({ week, actualHeaderMonth, actualDate }) => {
  const { turnos } = TurnosData();
  const totalWeek = week.reduce((acc, date) => {
    let totalDay = 0;
    const formatedDate = date.split("-").join("");
    if (turnos.hasOwnProperty(formatedDate)) {
      totalDay += turnos[formatedDate].reduce(
        (acc, turno) => acc + parseInt(turno.valor, 10),
        0
      );
    }
    return acc + totalDay;
  }, 0);

  return (
    <>
      <div className="week">
        {week.map((date) => (
          <DateCell
            key={date}
            date={date}
            actualHeaderMonth={actualHeaderMonth}
            actualDate={actualDate}
          />
        ))}
      </div>
      <p className="total-week">Total $ {formatedValor(totalWeek)}</p>
    </>
  );
};
