import { createContext, useState } from "react";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [email, setEmail] = useState(() => localStorage.getItem("email"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <SessionContext.Provider value={{ email, setEmail, token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
}
