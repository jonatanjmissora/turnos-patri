export const getActualDate = () => {
  let actualDate = "";

  const date = new Date();

  const [aux] = date.toLocaleString().split(",", 1);
  let [day, month, year] = aux.split("/");

  day = day.length < 2 ? "0" + day : day;
  month = month.length < 2 ? "0" + month : month;

  actualDate = year + "-" + month + "-" + day;
  return actualDate;
};
