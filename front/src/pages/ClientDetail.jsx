import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useClientsService } from "../services/clients.service";
import { useSession } from "../hooks/useSession";

export function ClientDetail() {
  const { id } = useParams();
  const { getClient, getClientProjects, deleteClient } = useClientsService();
  const { email } = useSession();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    Promise.all([getClient(id), getClientProjects(id)])
      .then(([clientData, projectsData]) => {
        setClient(clientData);
        setProjects(projectsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const onDelete = async () => {
    try {
      await deleteClient(id);
      navigate("/clients");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Cargando cliente...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!client) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <img src={client.photo} className="img-fluid rounded" alt={client.name} />
      </div>
      <div className="col-md-7">
        <h1>{client.name}</h1>
        <p>{client.description}</p>

        <h5 className="mt-4">Proyectos del cliente</h5>
        {projects.length === 0 ? (
          <p className="text-muted">Este cliente no tiene proyectos.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <Link to={`/projects/${project._id}`}>{project.name}</Link>
              </li>
            ))}
          </ul>
        )}

        {email && (
          <div className="border-top pt-3">
            <Link to={`/clients/${id}/edit`} className="btn btn-warning me-2">
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
