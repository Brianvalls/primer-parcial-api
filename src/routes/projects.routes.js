import { Router } from "express";
import { addProject, editProject, getProject, listProjects, removeProject } from "../controllers/projects.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { projectSchema } from "../schemas/projects.schema.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", authRequired, validate(projectSchema), addProject);
router.put("/:id", authRequired, validate(projectSchema), editProject);
router.delete("/:id", authRequired, removeProject);

export default router;
