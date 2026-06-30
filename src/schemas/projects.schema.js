import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripcion es requerida"),
  technologies: yup.array().of(yup.string()).default([]),
  link: yup.string().required("El link es requerido"),
  img: yup.string().required("La imagen es requerida"),
  section: yup.string().required("La seccion es requerida"),
  clientId: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, "El clientId no es valido")
    .nullable()
    .optional(),
});
