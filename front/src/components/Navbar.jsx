import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-brand">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Portfolio
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/projects">
              Proyectos
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              Iniciar sesion
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
