import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProjectsService } from "../services/projects.service";
import { useSession } from "../hooks/useSession";

export function Detail() {
  const { id } = useParams();
  const { getProject, deleteProject } = useProjectsService();
  const { email } = useSession();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    getProject(id)
      .then((data) => setProject(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const onDelete = async () => {
    try {
      await deleteProject(id);
      navigate("/projects");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!project) {
    return <p>Proyecto no encontrado.</p>;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={project.img} className="img-fluid rounded" alt={project.name} />
      </div>
      <div className="col-md-6">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <p>
          <strong>Tecnologias:</strong> {(project.technologies || []).join(", ")}
        </p>
        <p>
          <strong>Seccion:</strong> {project.section}
        </p>
        <a href={project.link} className="btn btn-outline-primary mb-3" target="_blank" rel="noreferrer">
          Ver repositorio
        </a>

        {email && (
          <div className="border-top pt-3">
            <Link to={`/projects/${id}/edit`} className="btn btn-warning me-2">
              Editar
            </Link>
            {!confirm ? (
              <button className="btn btn-danger" onClick={() => setConfirm(true)}>
                Eliminar
              </button>
            ) : (
              <span>
                ¿Seguro?{" "}
                <button className="btn btn-danger btn-sm me-2" onClick={onDelete}>
                  Si
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setConfirm(false)}>
                  No
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
