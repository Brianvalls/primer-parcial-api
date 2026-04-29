import { Router } from "express";
import { addProject, editProject, listProjects, removeProject } from "../controllers/projects.controller.js";

const router = Router();

router.get("/", listProjects);
router.post("/", addProject);
router.put("/:id", editProject);
router.delete("/:id", removeProject);

export default router;
