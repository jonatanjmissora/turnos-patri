import { createContext, useContext } from "react";
import { useTurnos } from "../hooks/useTurnos";

const TurnosContext = createContext();
export const TurnosData = () => useContext(TurnosContext);

export const TurnosWrapper = ({ children }) => {
  const {
    turnos,
    loading,
    addTurno,
    deleteTurno,
    updateTurnos,
    serverError
  } = useTurnos();

  return (
    <TurnosContext.Provider
      value={{
        turnos,
        loading,
        addTurno,
        updateTurnos,
        deleteTurno,
        serverError
      }}
    >
      {children}
    </TurnosContext.Provider>
  );
};
