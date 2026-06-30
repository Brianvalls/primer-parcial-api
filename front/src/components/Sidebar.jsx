import { Link, useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../hooks/useSession";

export function Sidebar() {
  const { email } = useSession();
  const logout = useLogout();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="bg-brand text-white d-flex flex-column p-2"
      style={{ width: "180px", height: "100vh", position: "sticky", top: 0 }}
    >
      <Link className="navbar-brand text-white mb-3 fs-6" to="/">
        Portfolio
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link text-white py-1 small" to="/projects">
            Proyectos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white py-1 small" to="/clients">
            Clientes
          </Link>
        </li>
      </ul>
      <div className="border-top pt-2">
        <p className="small mb-2 text-truncate">{email}</p>
        <button className="btn btn-light btn-sm w-100" onClick={onLogout}>
          Cerrar sesion
        </button>
      </div>
    </aside>
  );
}
