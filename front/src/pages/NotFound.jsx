import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>La pagina que buscas no existe.</p>
      <Link className="btn btn-secondary" to="/">
        Volver al inicio
      </Link>
    </div>
  );
}
