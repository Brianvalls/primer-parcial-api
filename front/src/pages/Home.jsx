import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="text-center py-5">
      <h1>Portfolio de Proyectos</h1>
      <p className="lead">Explora los proyectos cargados y sus tecnologias.</p>
      <Link className="btn btn-primary" to="/projects">
        Ver proyectos
      </Link>
    </div>
  );
}
