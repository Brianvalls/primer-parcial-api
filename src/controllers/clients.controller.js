import { ObjectId } from "mongodb";
import { createClient, getAllClients, getClientById } from "../services/clients.service.js";
import { getProjectsByClientId } from "../services/projects.service.js";

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

export async function listClients(req, res) {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error: error.message });
  }
}

export async function addClient(req, res) {
  try {
    const { name, photo, description } = req.body;

    if (!name || !photo || !description) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: name, photo, description",
      });
    }

    const created = await createClient({ name, photo, description });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Error al crear cliente", error: error.message });
  }
}

export async function listClientProjects(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id invalido" });
    }

    const client = await getClientById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const projects = await getProjectsByClientId(new ObjectId(id));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyectos del cliente", error: error.message });
  }
}
