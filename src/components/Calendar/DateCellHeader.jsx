import { Link } from "react-router-dom";
import { getHeaderDay } from "../../services/getHeaderDay";
export const DateCellHeader = ({ date, actualDate, showLists }) => {
  const [dayStr, dayNum] = getHeaderDay(date);

  const formatDate = date.split("-").join("");

  const cellHeaderNumClass =
    date === actualDate ? "date-cell-header-num today" : "date-cell-header-num";

  return (
    <Link className="date-cell-header" to={"/" + formatDate}>
      {showLists && <span>{dayStr}</span>}
      <p className={cellHeaderNumClass}>{dayNum}</p>
    </Link>
  );
};
