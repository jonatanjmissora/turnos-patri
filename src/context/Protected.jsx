import { Navigate } from "react-router-dom";
import { AuthData } from "./AuthContext";

export const Protected = ({ children }) => {
  const { user } = AuthData();

  return user ? children : <Navigate to="/login" />;
};
