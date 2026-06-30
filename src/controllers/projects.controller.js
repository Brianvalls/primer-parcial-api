import { ObjectId } from "mongodb";
import { getClientById } from "../services/clients.service.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/projects.service.js";

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

export async function listProjects(req, res) {
  try {
    const { section } = req.query;
    const filters = {};

    if (section) {
      filters.section = section;
    }

    const projects = await getAllProjects(filters);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyectos", error: error.message });
  }
}

export async function getProject(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id invalido" });
    }

    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyecto", error: error.message });
  }
}

export async function addProject(req, res) {
  try {
    const { name, description, technologies, link, img, section, clientId } = req.body;

    let clientObjectId = null;
    if (clientId) {
      const client = await getClientById(clientId);
      if (!client) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      clientObjectId = new ObjectId(clientId);
    }

    const newProject = {
      name,
      description,
      technologies,
      link,
      img,
      section,
      clientId: clientObjectId,
    };

    const created = await createProject(newProject);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Error al crear proyecto", error: error.message });
  }
}

export async function editProject(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id invalido" });
    }

    const existing = await getProjectById(id);
    if (!existing) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const { name, description, technologies, link, img, section, clientId } = req.body;

    let clientObjectId = existing.clientId || null;
    if (clientId !== undefined) {
      if (!clientId) {
        clientObjectId = null;
      } else {
        const client = await getClientById(clientId);
        if (!client) {
          return res.status(404).json({ message: "Cliente no encontrado" });
        }

        clientObjectId = new ObjectId(clientId);
      }
    }

    const updated = await updateProject(id, {
      name,
      description,
      technologies,
      link,
      img,
      section,
      clientId: clientObjectId,
    });

    if (!updated) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al modificar proyecto", error: error.message });
  }
}

export async function removeProject(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id invalido" });
    }

    const deleted = await deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json({ message: "Proyecto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proyecto", error: error.message });
  }
}
