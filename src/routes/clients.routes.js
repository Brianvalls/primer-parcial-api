import { Router } from "express";
import { addClient, listClientProjects, listClients } from "../controllers/clients.controller.js";

const router = Router();

router.get("/", listClients);
router.get("/:id/projects", listClientProjects);
router.post("/", addClient);

export default router;
