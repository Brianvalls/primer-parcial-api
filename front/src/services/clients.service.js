import { useAPI } from "./api";

export function useClientsService() {
  const { call } = useAPI();

  const getClients = () => call("clients");

  const getClient = (id) => call(`clients/${id}`);

  const getClientProjects = (id) => call(`clients/${id}/projects`);

  const createClient = (data) => call("clients", "POST", data);

  const updateClient = (id, data) => call(`clients/${id}`, "PUT", data);

  const deleteClient = (id) => call(`clients/${id}`, "DELETE");

  return { getClients, getClient, getClientProjects, createClient, updateClient, deleteClient };
}
