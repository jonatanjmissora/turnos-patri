import { useEffect, useState } from "react";
import { AuthData } from "../context/AuthContext";
import {
  addBackendData,
  deleteBackendData,
  getBackendActualMonthData,
  getBackendAllData,
  updateBackendData
} from "../backend/supabase";
import { formatTurnos } from "../services/formatTurnos";

export const useTurnos = () => {
  const { user } = AuthData();
  const [turnos, setTurnos] = useState({});
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  //const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const getNewTurnos = async () => {
      try {
        const { data, error } = await getBackendAllData();

        if (error) {
          throw new Error(error.message);
        }

        if (data && user) {
          setServerError("");
          const newTurnos = formatTurnos(data);
          //console.log("TURNOS :", newTurnos);
          setTurnos(newTurnos);
          setLoading(false);
        }
      } catch (err) {
        console.log("Server:", err);
        setServerError("Error leyendo el servidor");
      }
      //setFirstLoad(false);
    };
    if (user) getNewTurnos();
  }, [user]);
  /*
  useEffect(() => {
    const getNewAllTurnos = async () => {
      try {
        const { data, error } = await getBackendAllData();

        if (error) {
          throw new Error(error.message);
        } else {
          const newTurnos = formatTurnos(data);
          console.log("TURNOS RESPONSE", data.length, newTurnos);
          setTurnos(newTurnos);
        }
      } catch (err) {
        console.log("Server:", err);
        setServerError("Error leyendo el servidor");
      }
    };
    if (!firstLoad) getNewAllTurnos();
  }, [firstLoad]);
*/
  const addTurno = async (newTurno) => {
    const serverError = await addBackendData(newTurno);

    if (!serverError) {
      setTurnos((prev) => {
        const newTurnos = { ...prev };
        newTurnos[newTurno.fecha] = newTurnos[newTurno.fecha] || [];
        // TODO check si los horarios se superponen
        newTurnos[newTurno.fecha].push(newTurno);
        return newTurnos;
      });
      return;
    } else {
      return serverError;
    }
  };

  const deleteTurno = async (id) => {
    const serverError = await deleteBackendData(id);

    if (!serverError) {
      let fecha = id.toString().substring(0, 8);

      setTurnos((prev) => {
        const newTurnos = { ...prev };
        newTurnos[fecha] = newTurnos[fecha].filter(
          (turno) => turno.id !== parseInt(id, 10)
        );
        if (newTurnos[fecha].length === 0) delete newTurnos[fecha];
        return newTurnos;
      });
      return;
    } else {
      return serverError;
    }
  };

  const updateTurnos = async (id, newTurno) => {
    const serverError = await updateBackendData(id, newTurno);

    if (!serverError) {
      let fecha = id.toString().substring(0, 8);
      const newTurnos = { ...turnos };
      let updateIndex = newTurnos[fecha].findIndex(
        (turno) => turno.id === parseInt(id, 10)
      );
      console.log("TURNO ANTERIOR:", newTurnos[fecha][updateIndex]);
      newTurnos[fecha][updateIndex] = { ...newTurno };
      console.log("TURNO ACTUALIZADO:", newTurno);
      setTurnos(newTurnos);
      return;
    } else {
      return serverError;
    }
  };

  return {
    turnos,
    loading,
    addTurno,
    deleteTurno,
    updateTurnos,
    serverError
  };
};
