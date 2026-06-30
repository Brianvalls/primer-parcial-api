import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "../services/users.service.js";
import { createToken } from "../services/token.service.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const existe = await getUserByEmail(email);
    if (existe) {
      return res.status(409).json({ message: "El email ya esta registrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hash });

    res.status(201).json({ message: "Usuario registrado", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const coincide = await bcrypt.compare(password, user.password);
    if (!coincide) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = createToken({ email: user.email });
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesion", error: error.message });
  }
}
