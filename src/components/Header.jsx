import { Link, useLocation, useParams } from "react-router-dom";
import { AuthData } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import "../styles/Header.css";

export const Header = () => {
  const { user, signOut } = AuthData();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      alert(error);
    }
  };

  const linkClassTurnos = location.pathname === "/" ? "active" : "";
  const linkClassClientas = location.pathname === "/clientas" ? "active" : "";

  return (
    <>
      {user && (
        <header className="header-container">
          <nav className="header-nav">
            <Link className={linkClassTurnos} to="/">
              Turnos
            </Link>
            <Link className={linkClassClientas} to="/clientas">
              Clientas
            </Link>
          </nav>
          <span className="logout-icon" onClick={handleLogout}>
            <MdLogout />
          </span>
        </header>
      )}
    </>
  );
};
