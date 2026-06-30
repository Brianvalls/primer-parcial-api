import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "La contraseña debe tener una mayuscula")
    .matches(/[a-z]/, "La contraseña debe tener una minuscula")
    .matches(/[0-9]/, "La contraseña debe tener un numero")
    .matches(/[^A-Za-z0-9]/, "La contraseña debe tener un simbolo")
    .required("La contraseña es requerida"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});
