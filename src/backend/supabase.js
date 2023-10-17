import { createClient } from "@supabase/supabase-js";
import { getActualDate } from "../services/getActualDate";

/*    CLIENT      */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
const TABLE = "turnos_patri";
/*    CRUD        */

export const getBackendAllData = async () => {
  const { data, error } = await supabase.from(TABLE).select();
  return { data, error };
};

export const getBackendActualMonthData = async () => {
  const [actualYearStr, actualMonthStr] = getActualDate().split("-", 2);
  const fromActual = actualYearStr + actualMonthStr + "000000";
  const toActual = actualYearStr + actualMonthStr + "310000";
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .gte("id", fromActual)
    .lte("id", toActual);
  return { data, error };
};

export const addBackendData = async (newData) => {
  const { data, error } = await supabase.from(TABLE).insert(newData).select();
  if (error) {
    console.error("INSERT:", error);
    return "Error insertando turno";
  } else {
    console.log(data, "insertado correctamente");
    return;
  }
};

export const deleteBackendData = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select();

  if (data?.length === 0 || error) {
    console.error("DELETE:", error);
    return "Error al eliminar turno";
  } else {
    console.log(data, "eliminado correctamente");
    return;
  }
};

export const updateBackendData = async (id, newData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(newData)
    .eq("id", id)
    .select();

  if (!data || error) {
    console.error("UPDATE", error);
    return "Error al actualizar turno";
  } else {
    console.log("actualizado correctamente");
    return;
  }
};
