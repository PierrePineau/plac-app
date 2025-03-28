import { create } from "zustand";
import { persist } from "zustand/middleware";
import { post, get as apiGet } from "../core/services/api.helper";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
}

interface AuthResponse {
  token: string;
  user: any;
  organisation: any;
}

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authenticateUserByToken: (token: string) => Promise<boolean>;
  checkAuth: (role: string) => Promise<boolean>;
  login: (
    email: string,
    password: string,
    authTarget?: string
  ) => Promise<boolean>;
  logout: () => void;
  _setUser: (data: AuthResponse) => boolean;
  _clearAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      authenticateUserByToken: async (token: string) => {
        if (!token) return false;
        set({ isLoading: true });
        localStorage.setItem("jwtToken", token);
        try {
          const response = await apiGet<ResponseApi>("/api/app/users/me");
          if (response.success) {
            return get()._setUser(response.data);
          }
        } catch {
          set({ isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
        return false;
      },
      checkAuth: async (role: string) => {
        try {
          const token = localStorage.getItem("jwtToken");
          if (!token) return get()._clearAuth();
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded.exp * 1000 < Date.now()) return get()._clearAuth();
          if (!decoded.roles.includes(role)) return get()._clearAuth();
          return true;
        } catch {
          return get()._clearAuth();
        }
      },
      login: async (email, password, authTarget = "user") => {
        set({ isLoading: true, error: null });
        try {
          const path =
            authTarget === "admin"
              ? "/api/admin/login_check"
              : "/api/app/login_check";
          const data = await post<AuthResponse>(
            path,
            { username: email, password },
            { skipAuth: true }
          );
          if (data.token) {
            localStorage.setItem("jwtToken", data.token);
            return get()._setUser(data);
          }
          set({ error: "Les identifiants ne sont pas bons" });
        } catch {
          set({ error: "Les identifiants ne sont pas bons" });
        } finally {
          set({ isLoading: false });
        }
        return false;
      },
      logout: () => {
        localStorage.removeItem("jwtToken");
        set({ user: null, isAuthenticated: false });
      },
      _setUser: (data: AuthResponse) => {
        // Si l'utilisateur n'est pas défini, on retourne false
        try {
          if (!data.user) return false;
        
          const user = {
            uuidUser: data.user.id ?? null,
            uuidOrganisation: data.organisation ? data.organisation.uuid ?? data.organisation.id : null,
            email: data.user.email,
            roles: data.user.roles,
            fullname: data.user.fullname ?? '',
          };
          
          // Si l'utilisateur n'a pas d'organisation et n'est pas super admin, on retourne false
          if (!data.organisation && !user.roles.includes("ROLE_SUPER_ADMIN")) return false;
          
          localStorage.setItem("idOrganisation", user.uuidOrganisation);
          localStorage.setItem("idUser", user.uuidUser);

          set({ 
            user: user,
            isAuthenticated: true
          });

          return true;
        } catch (error) {
          console.log("error", error);
          return false;
        }
      },
      _clearAuth: () => {
        set({ isAuthenticated: false, user: null });

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("idOrganisation");
        localStorage.removeItem("idUser");
        return false;
      }
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
