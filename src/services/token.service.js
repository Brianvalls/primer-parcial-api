import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("Falta la variable JWT_SECRET en el archivo .env");
}

export function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function validateToken(token) {
  return jwt.verify(token, SECRET);
}
