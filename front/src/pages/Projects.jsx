import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProjectsService } from "../services/projects.service";
import { useSession } from "../hooks/useSession";

const SECTIONS = [
  { value: "", label: "Todas las secciones" },
  { value: "mobile", label: "Mobile" },
  { value: "landing", label: "Landing Page" },
  { value: "webapp", label: "Web App" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "game", label: "Games" },
];

export function Projects() {
  const { getProjects } = useProjectsService();
  const { email } = useSession();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [section, setSection] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProjects(section)
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [section]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Proyectos</h1>
        <div className="d-flex gap-2">
          <select
            className="form-select w-auto"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {SECTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {email && (
            <Link to="/projects/new" className="btn btn-primary">
              Nuevo proyecto
            </Link>
          )}
        </div>
      </div>

      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="text-danger">Error al cargar los proyectos: {error}</p>}
      {!loading && !error && projects.length === 0 && <p>No hay proyectos en esta seccion.</p>}

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-3 mb-3" key={project._id}>
            <div className="card h-100">
              <img
                src={project.img}
                className="card-img-top"
                alt={project.name}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title">{project.name}</h6>
                <p className="card-text small">{project.description}</p>
                <p className="text-muted small">{(project.technologies || []).join(", ")}</p>
                <Link to={`/projects/${project._id}`} className="btn btn-sm btn-outline-primary">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
