const dayStrSpanish = {
  "Sun,": "Domingo",
  "Mon,": "Lunes",
  "Tue,": "Martes",
  "Wed,": "Miercoles",
  "Thu,": "Jueves",
  "Fri,": "Viernes",
  "Sat,": "Sabado"
};

const monthStrSpanish = {
  Jan: "Ene",
  Feb: "Feb",
  Mar: "Mar",
  Apr: "Abr",
  May: "May",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Sep",
  Oct: "Oct",
  Nov: "Nov",
  Dec: "Dic"
};

export const getHeaderDay = (date) => {
  date = date.split("-").join("");
  date =
    date.substring(0, 4) +
    "-" +
    date.substring(4, 6) +
    "-" +
    date.substring(6, 8);
  const [dayStr, dayNumber, month] = new Date(date).toUTCString().split(" ", 3);

  return [dayStrSpanish[dayStr], dayNumber, monthStrSpanish[month]];
};
