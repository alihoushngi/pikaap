import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../panel/hooks/useAuth";
const ProtectedRoute = ({ Component }) => {
	const isAuthenticate = useAuth();
	return isAuthenticate ? Component : <Navigate to={"/administrator/login"} />;
};

export default ProtectedRoute;
