import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, UserRole } from "@/types/user";
import { API_BASE_URL } from "@/services/api";


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<User>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AUTH_STORAGE_KEY = "Ma3ak_ai_user";
const TOKEN_STORAGE_KEY = "Ma3ak_ai_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeRole = (role: string): UserRole | null => {
  const normalized = role?.toLowerCase().trim();

  if (normalized === "student") return UserRole.STUDENT;
  if (normalized === "business") return UserRole.BUSINESS;
  if (normalized === "founder") return UserRole.FOUNDER;

  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔹 Load auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate role
        const validatedRole = normalizeRole(parsedUser.role);

        if (validatedRole) {
          parsedUser.role = validatedRole;
          setUser(parsedUser);
        } else {
          // Invalid role in storage, clear it
          localStorage.clear();
        }
      } catch {
        localStorage.clear();
      }
    }
    setIsInitialized(true);
  }, []);

  // 🔹 Save / Clear auth
  const persistAuth = (userData: User | null, token?: string) => {
    if (userData && token) {
      const normalizedRole = normalizeRole(userData.role);

      if (!normalizedRole) {
        console.error(`Invalid role encountered: ${userData.role}. Clearing session.`);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
        return;
      }

      // Normalize role to lowercase to ensure consistency
      const normalizedUser = {
        ...userData,
        role: normalizedRole
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalizedUser));
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(normalizedUser);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    }
  };

  // ======================
  // 🔐 LOGIN
  // ======================
  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const normalizedRole = normalizeRole(data.user.role);
      if (!normalizedRole) {
        throw new Error(`Login failed: Invalid role '${data.user.role}' received.`);
      }

      // Ensure we pass the normalized user to persistAuth
      const safeUser = { ...data.user, role: normalizedRole };
      persistAuth(safeUser, data.token);
      return safeUser;
    } finally {
      setIsLoading(false);
    }
  };

  // ======================
  // 📝 SIGNUP
  // ======================
  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, role }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      const normalizedRole = normalizeRole(data.user.role);
      if (!normalizedRole) {
        throw new Error(`Signup failed: Invalid role '${data.user.role}' received.`);
      }

      const safeUser = { ...data.user, role: normalizedRole };
      persistAuth(safeUser, data.token);
      return safeUser;
    } finally {
      setIsLoading(false);
    }
  };

  // ======================
  // 🚪 LOGOUT
  // ======================
  const logout = () => {
    persistAuth(null);
  };

  // ======================
  // 🔄 UPDATE ROLE (Frontend only)
  // ======================
  const setUserRole = (role: UserRole) => {
    if (!user) return;
    const updatedUser = { ...user, role };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: isLoading || !isInitialized,
        login,
        signup,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {

    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

