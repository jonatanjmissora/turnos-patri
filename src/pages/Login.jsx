import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { AuthData } from "../context/AuthContext";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const mail = form.mail.value.toLowerCase().trim();
    const password = form.password.value.toLowerCase().trim();

    try {
      setLoading(true);
      const {
        data: { user, session },
        error
      } = await login(mail, password);
      if (error) {
        console.log(error.status, error.message);
        throw new Error(error.message);
      }
      if (user && session) navigate("/");
    } catch (error) {
      if (error.message === "Invalid login credentials")
        setLoginError("usuario / password incorrectos");
      else if (error.message === "Failed to fetch")
        setLoginError("Fallo al ingresar");
      else setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="mail"
            id="mail"
            name="mail"
            placeholder="mail"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            required
          />
          <button className="login-btn" type="submit">
            Ingresar
            {loading && (
              <div className="loader-container">
                <span className="loader">.</span>
                <span className="loader two">.</span>
                <span className="loader three">.</span>
              </div>
            )}
          </button>
          <p className="login-error">{loginError}</p>
        </form>
      </div>
    </div>
  );
};
