import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectsService } from "../services/projects.service";

export function EditProject() {
  const { id } = useParams();
  const { getProject, updateProject } = useProjectsService();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(id)
      .then((data) => {
        reset({
          name: data.name,
          description: data.description,
          technologies: (data.technologies || []).join(", "),
          link: data.link,
          img: data.img,
          section: data.section,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (formData) => {
    setError(null);
    try {
      await updateProject(id, {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech),
      });
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Editar proyecto</h1>
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
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
