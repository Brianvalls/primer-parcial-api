import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProjectsService } from "../services/projects.service";
import { useClientsService } from "../services/clients.service";

export function NewProject() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createProject } = useProjectsService();
  const { getClients } = useClientsService();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch(() => setClients([]));
  }, []);

  const onSubmit = async (formData) => {
    setError(null);
    try {
      await createProject({
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech),
      });
      navigate("/projects");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Nuevo proyecto</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              {...register("description", { required: "La descripcion es obligatoria" })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Tecnologias (separadas por coma)</label>
            <input className="form-control" {...register("technologies")} />
          </div>
          <div className="mb-3">
            <label className="form-label">Link al repositorio</label>
            <input
              className={`form-control ${errors.link ? "is-invalid" : ""}`}
              {...register("link", { required: "El link es obligatorio" })}
            />
            {errors.link && <div className="invalid-feedback">{errors.link.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input
              className={`form-control ${errors.img ? "is-invalid" : ""}`}
              {...register("img", { required: "La imagen es obligatoria" })}
            />
            {errors.img && <div className="invalid-feedback">{errors.img.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Seccion</label>
            <select
              className={`form-select ${errors.section ? "is-invalid" : ""}`}
              {...register("section", { required: "La seccion es obligatoria" })}
            >
              <option value="">Elegir...</option>
              <option value="mobile">Mobile</option>
              <option value="landing">Landing Page</option>
              <option value="webapp">Web App</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="game">Games</option>
            </select>
            {errors.section && <div className="invalid-feedback">{errors.section.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <select className="form-select" {...register("clientId")}>
              <option value="">Sin cliente</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
