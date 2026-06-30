async function post(uri, body) {
  const response = await fetch(`/api/${uri}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.message || (data.errors && data.errors[0]) || "Error en la peticion";
    throw new Error(message);
  }

  return data;
}

export function registerUser(data) {
  return post("auth/register", data);
}

export function loginUser(data) {
  return post("auth/login", data);
}
