import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to the correct dashboard based on their role
        switch (user.role) {
            case 'student':
                return <Navigate to="/dashboard/student" replace />;
            case 'business':
                return <Navigate to="/dashboard/business" replace />;
            case 'founder':
                return <Navigate to="/dashboard/founder" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return <>{children}</>;
}
