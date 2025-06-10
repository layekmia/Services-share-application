import { Navigate, useLocation } from "react-router-dom";
import { useService } from "../context/ServiceContext";

export default function PrivateRoute({children}) {
  const {user} = useService();
  const location = useLocation();
  return user ? children : <Navigate to='/login' state={{from: location}}/>
}