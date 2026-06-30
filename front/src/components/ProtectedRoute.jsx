import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useSession";

export function ProtectedRoute({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
