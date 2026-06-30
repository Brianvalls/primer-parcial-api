import { useToken } from "../hooks/useSession";

export function useAPI() {
  const token = useToken();

  const call = async (uri, method = "GET", body = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`/api/${uri}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.message || (data.errors && data.errors[0]) || "Error en la peticion";
      throw new Error(message);
    }

    return data;
  };

  return { call };
}
