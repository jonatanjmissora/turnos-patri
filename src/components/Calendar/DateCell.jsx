import { useState } from "react";
import { TurnosData } from "../../context/TurnosContext";
import { DateCellHeader } from "./DateCellHeader";
import { DateCellList } from "./DateCellList";

export const DateCell = ({ date, actualHeaderMonth, actualDate }) => {
  const { turnos } = TurnosData();
  const [showLists, setShowLists] = useState(false);

  const handleShowList = (event) => {
    if (!turnosArray) return;
    setShowLists((prev) => !prev);
  };

  const dateMonth = date.split("-")[1];
  const formatedDate = date.split("-").join("");
  const turnosArray = turnos[formatedDate];

  let dateCellClass = showLists ? "date-cell full" : "date-cell";

  return (
    <>
      {actualHeaderMonth === dateMonth ? (
        <div className={dateCellClass}>
          <DateCellHeader
            date={date}
            actualDate={actualDate}
            showLists={showLists}
          />
          <div className="date-cell-lists" onClick={handleShowList}>
            {turnosArray && (
              <DateCellList
                turnosArray={turnosArray || []}
                showLists={showLists}
                setShowLists={setShowLists}
              />
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
