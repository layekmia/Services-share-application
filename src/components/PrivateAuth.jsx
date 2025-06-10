import { Navigate, useLocation } from "react-router-dom";
import { useService } from "../context/ServiceContext";

export default function PrivateAuth({ children }) {
  const { user } = useService();
  const location = useLocation();

  const from = location?.state?.from.pathname || "/";

  return user ? <Navigate to={from} /> : children;
}
