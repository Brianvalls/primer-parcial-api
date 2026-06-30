import { useAPI } from "./api";

export function useProjectsService() {
  const { call } = useAPI();

  const getProjects = (section) => {
    return call(section ? `projects?section=${section}` : "projects");
  };

  const getProject = (id) => call(`projects/${id}`);

  const createProject = (data) => call("projects", "POST", data);

  const updateProject = (id, data) => call(`projects/${id}`, "PUT", data);

  const deleteProject = (id) => call(`projects/${id}`, "DELETE");

  return { getProjects, getProject, createProject, updateProject, deleteProject };
}
