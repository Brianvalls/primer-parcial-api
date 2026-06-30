import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useClientsService } from "../services/clients.service";

export function NewClient() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createClient } = useClientsService();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    setError(null);
    try {
      await createClient(formData);
      navigate("/clients");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Nuevo cliente</h1>
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
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
