import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const CalendarHeader = ({
  actualHeaderYear,
  setActualHeaderYear,
  actualHeaderMonth,
  setActualHeaderMonth
}) => {
  const monthStr = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ];

  const handleMonthChange = (direction) => {
    let actualMonthNumber = parseInt(actualHeaderMonth, 10);
    let actualYearNumber = parseInt(actualHeaderYear, 10);
    if (direction === "prev") {
      if (actualMonthNumber === 1) {
        if (actualYearNumber === 2022) return;
        else {
          actualMonthNumber = 12;
          actualYearNumber -= 1;
        }
      } else actualMonthNumber -= 1;
    } else {
      if (actualMonthNumber === 12) {
        if (actualYearNumber === 2026) return;
        else {
          actualMonthNumber = 1;
          actualYearNumber += 1;
        }
      } else actualMonthNumber += 1;
    }
    let actualMonthStr =
      actualMonthNumber < 10 ? "0" + actualMonthNumber : "" + actualMonthNumber;
    setActualHeaderMonth(actualMonthStr);
    setActualHeaderYear(actualYearNumber.toString());
  };

  return (
    <div className="calendar-header">
      <span
        className="calendar-header-icon"
        onClick={() => handleMonthChange("prev")}
      >
        <FaChevronLeft />
      </span>
      <h3 className="header-month">
        {monthStr[parseInt(actualHeaderMonth - 1, 10)]}
      </h3>
      <h3>{actualHeaderYear}</h3>
      <span
        className="calendar-header-icon"
        onClick={() => handleMonthChange("next")}
      >
        <FaChevronRight />
      </span>
    </div>
  );
};
