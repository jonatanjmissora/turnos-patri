import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const { user, loading, login, signOut } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signOut
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
