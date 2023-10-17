import { DateCellListObj } from "./DateCellListObj";

export const DateCellList = ({ turnosArray, showLists, setShowLists }) => {
  let turnosNumber = 0;
  let depisNumber = 0;
  if (turnosArray.length > 0) {
    turnosArray.forEach((obj) => {
      if (obj.is_depi) depisNumber++;
      else turnosNumber++;
    });
  }

  const times = turnosArray.map((obj, index) => {
    return { time: obj.hora, index };
  });
  const sortedTurnosByTime = times.sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      {showLists ? (
        <div className="date-cell-list">
          {sortedTurnosByTime.map((obj) => (
            <DateCellListObj
              key={obj.time}
              obj={turnosArray[obj.index]}
              setShowLists={setShowLists}
            />
          ))}
        </div>
      ) : (
        <TurnosNumbers turnosNumber={turnosNumber} depisNumber={depisNumber} />
      )}
    </>
  );
};

const TurnosNumbers = ({ turnosNumber, depisNumber }) => {
  return (
    <>
      {turnosNumber !== 0 && (
        <div className="date-cell-list-obj-number turno">
          <span>{turnosNumber}</span>
        </div>
      )}
      {depisNumber !== 0 && (
        <div className="date-cell-list-obj-number depi">
          <span>{depisNumber}</span>
        </div>
      )}
    </>
  );
};
