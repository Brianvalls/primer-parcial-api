import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

export function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    setError(null);
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h1 className="mb-4">Registrarse</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "No es un email valido",
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "La contraseña es obligatoria",
                validate: (value) => {
                  if (value.length < 8) return "Debe tener al menos 8 caracteres";
                  if (!/[A-Z]/.test(value)) return "Debe tener una mayuscula";
                  if (!/[a-z]/.test(value)) return "Debe tener una minuscula";
                  if (!/[0-9]/.test(value)) return "Debe tener un numero";
                  if (!/[^A-Za-z0-9]/.test(value)) return "Debe tener un simbolo";
                  return true;
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.passwordConfirm ? "is-invalid" : ""}`}
              {...register("passwordConfirm", {
                required: "Debe confirmar la contraseña",
                validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
