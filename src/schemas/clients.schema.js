import * as yup from "yup";

export const clientSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  photo: yup.string().required("La foto es requerida"),
  description: yup.string().required("La descripcion es requerida"),
});
