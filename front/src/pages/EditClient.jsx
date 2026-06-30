import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useClientsService } from "../services/clients.service";

export function EditClient() {
  const { id } = useParams();
  const { getClient, updateClient } = useClientsService();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClient(id)
      .then((data) => {
        reset({
          name: data.name,
          photo: data.photo,
          description: data.description,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (formData) => {
    setError(null);
    try {
      await updateClient(id, formData);
      navigate(`/clients/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Cargando cliente...</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Editar cliente</h1>
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
            <label className="form-label">Foto (URL)</label>
            <input
              className={`form-control ${errors.photo ? "is-invalid" : ""}`}
              {...register("photo", { required: "La foto es obligatoria" })}
            />
            {errors.photo && <div className="invalid-feedback">{errors.photo.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              {...register("description", { required: "La descripcion es obligatoria" })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
