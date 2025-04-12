import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../hooks/authStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuthStore();

  useEffect(() => {
    console.log("currentUser", currentUser); // Debug
  }, [currentUser]);

  if (!currentUser) {
    console.log("Redirecting to /login"); // Debug
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role?.toLowerCase())) {
    console.log("Redirecting to /login due to role mismatch"); // Debug
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;;
};

export default ProtectedRoute;
