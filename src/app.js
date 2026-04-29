import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import clientsRoutes from "./routes/clients.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import { getAllProjects } from "./services/projects.service.js";
import { renderHomePage } from "./views/home.view.js";
import { renderSectionPage } from "./views/section.view.js";

const app = express();
const PORT = process.env.PORT || 3333;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).send(renderHomePage());
});

app.get("/section/:slug", async (req, res) => {
  try {
    const projects = await getAllProjects({ section: req.params.slug });
    res.status(200).send(renderSectionPage(req.params.slug, projects));
  } catch (error) {
    res.status(500).send("Error al cargar la seccion");
  }
});

app.use("/api/projects", projectsRoutes);
app.use("/api/clients", clientsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
