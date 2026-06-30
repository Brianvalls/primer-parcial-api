import { Router } from "express";
import {
  addClient,
  editClient,
  getClient,
  listClientProjects,
  listClients,
  removeClient,
} from "../controllers/clients.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/clients.schema.js";

const router = Router();

router.get("/", authRequired, listClients);
router.get("/:id/projects", authRequired, listClientProjects);
router.get("/:id", authRequired, getClient);
router.post("/", authRequired, validate(clientSchema), addClient);
router.put("/:id", authRequired, validate(clientSchema), editClient);
router.delete("/:id", authRequired, removeClient);

export default router;
