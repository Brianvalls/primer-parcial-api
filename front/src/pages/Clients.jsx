import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClientsService } from "../services/clients.service";
import { useSession } from "../hooks/useSession";

export function Clients() {
  const { getClients } = useClientsService();
  const { email } = useSession();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clientes</h1>
        {email && (
          <Link to="/clients/new" className="btn btn-primary">
            Nuevo cliente
          </Link>
        )}
      </div>

      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-danger">Error al cargar los clientes: {error}</p>}
      {!loading && !error && clients.length === 0 && <p>No hay clientes cargados.</p>}

      <div className="row">
        {clients.map((client) => (
          <div className="col-md-3 mb-3" key={client._id}>
            <div className="card h-100">
              <img
                src={client.photo}
                className="card-img-top"
                alt={client.name}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title">{client.name}</h6>
                <p className="card-text small">{client.description}</p>
                <Link to={`/clients/${client._id}`} className="btn btn-sm btn-outline-primary">
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
