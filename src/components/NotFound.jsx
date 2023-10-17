import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const classStyle = {
    display: "grid",
    placeItems: "center",
    height: "8rem",
    marginTop: "3rem"
  };

  return (
    <div style={classStyle}>
      <h3>Ruta no encontrada</h3>
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
};
