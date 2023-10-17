import { CalendarWeek } from "./CalendarWeek";

export const CalendarBoard = ({
  actualCalendar,
  actualHeaderMonth,
  actualDate
}) => {
  return (
    <div className="calendar">
      <div className="calendar-week-header">
        <span className="day-str">Lun</span>
        <span className="day-str">Mar</span>
        <span className="day-str">Mie</span>
        <span className="day-str">Jue</span>
        <span className="day-str">Vie</span>
        <span className="day-str">Sab</span>
        <span className="day-str">Dom</span>
      </div>
      {actualCalendar.map((week, index) => (
        <CalendarWeek
          key={index}
          week={week}
          actualHeaderMonth={actualHeaderMonth}
          actualDate={actualDate}
        />
      ))}
    </div>
  );
};
