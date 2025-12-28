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
            case UserRole.STUDENT:
                return <Navigate to="/dashboard/student" replace />;
            case UserRole.BUSINESS:
                return <Navigate to="/dashboard/business" replace />;
            case UserRole.FOUNDER:
                return <Navigate to="/dashboard/founder" replace />;
            default:
                // Prevent infinite redirect loops if role is invalid
                console.warn("Unauthorized access with unknown role:", user.role);
                return <Navigate to="/login" replace />;
        }
    }

    return <>{children}</>;
}
