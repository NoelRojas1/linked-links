import {type ReactNode} from "react";
import {useAuthStore} from "../../store/useAuthStore.ts";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const location = useLocation();


    // Maybe add a spinner if loading

    if (!isAuthenticated) {
       return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>
}