import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth(); // Get token & role once

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role exists in route and user role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/un-authorized" replace />;
  }

  return children; // Authorized
};

export default ProtectedRoute;
