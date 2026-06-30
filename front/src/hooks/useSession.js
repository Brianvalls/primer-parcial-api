import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

export function useSession() {
  return useContext(SessionContext);
}

export function useToken() {
  return useContext(SessionContext).token;
}

export function useLogin() {
  const { setEmail, setToken } = useContext(SessionContext);

  return (data) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
    setEmail(data.email);
    setToken(data.token);
  };
}

export function useLogout() {
  const { setEmail, setToken } = useContext(SessionContext);

  return () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setEmail(null);
    setToken(null);
  };
}
