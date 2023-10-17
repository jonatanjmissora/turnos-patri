import { MESES } from "../data/calendario";
import { TurnosData } from "../context/TurnosContext";
import "../styles/Calendar.css";
import { useEffect, useState } from "react";
import { getActualDate } from "../services/getActualDate";
import { CalendarHeader } from "../components/Calendar/CalendarHeader";
import { CalendarBoard } from "../components/Calendar/CalendarBoard";

export const Calendar = () => {
  const { loading, serverError } = TurnosData();
  const actualDate = getActualDate();
  const [actualYear, actualMonth] = actualDate.split("-", 2);
  const [actualHeaderMonth, setActualHeaderMonth] = useState(actualMonth);
  const [actualHeaderYear, setActualHeaderYear] = useState(actualYear);
  const actualCalendar = MESES[actualHeaderYear][actualHeaderMonth];

  return (
    <>
      {loading ? (
        <Loading serverError={serverError} />
      ) : (
        <>
          <CalendarHeader
            actualHeaderYear={actualHeaderYear}
            setActualHeaderYear={setActualHeaderYear}
            actualHeaderMonth={actualHeaderMonth}
            setActualHeaderMonth={setActualHeaderMonth}
          />
          <CalendarBoard
            actualCalendar={actualCalendar}
            actualHeaderMonth={actualHeaderMonth}
            actualDate={actualDate}
          />
        </>
      )}
    </>
  );
};

const Loading = ({ serverError }) => {
  return (
    <div className="cargando-container">
      {serverError ? (
        <h2 className="cargando-serverError">{serverError}</h2>
      ) : (
        <>
          <h2 className="cargando">Cargando</h2>
          <div className="loader-container">
            <span className="loader">.</span>
            <span className="loader two">.</span>
            <span className="loader three">.</span>
          </div>
        </>
      )}
    </div>
  );
};
