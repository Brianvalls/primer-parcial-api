import { validateToken } from "../services/token.service.js";

export function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    req.user = validateToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}
