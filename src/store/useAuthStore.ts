import { create } from "zustand";
import { persist } from "zustand/middleware";
import { post, get as apiGet } from "../core/services/api.helper";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  iat: number;
  exp: number;
  roles: string[];
  username: string; // email
}

interface AuthResponse {
  token: string;
  user: any;
  organisation: any;
}

interface AuthState {
  user: AuthenticateUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authenticateUserByToken: (token: string) => Promise<boolean>;
  checkAuth: (role: string) => Promise<boolean>;
  login: (email: string, password: string, authTarget?: string) => Promise<boolean>;
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

      /**
       * Authentifie un utilisateur via un token JWT.
       */
      authenticateUserByToken: async (token: string) => {
        if (!token) return false;

        try {
          set({ isLoading: true });

          localStorage.setItem("jwtToken", token);

          // Récupération des infos utilisateur depuis l'API
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

      /**
       * Vérifie si un utilisateur est authentifié et possède un rôle donné.
       */
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

      /**
       * Gère la connexion utilisateur.
       */
      login: async (email, password, authTarget = "user") => {
        set({ isLoading: true, error: null });

        try {
          const path = authTarget === "admin" ? "/api/admin/login_check" : "/api/app/login_check";
          const data = await post<AuthResponse>(path, { username: email, password }, { skipAuth: true });

          if (data.token) {
            localStorage.setItem("jwtToken", data.token);
            return get()._setUser(data);
          }
        } catch {
          set({ error: "Invalid credentials or network error" });
        } finally {
          set({ isLoading: false });
        }
        return false;
      },

      /**
       * Déconnexion de l'utilisateur.
       */
      logout: () => {
        localStorage.removeItem("jwtToken");
        set({ user: null, isAuthenticated: false });
      },

      /**
       * Fonction interne pour stocker les infos utilisateur après authentification.
       */
      _setUser: (data: AuthResponse) => {
        if (!data.user || !data.organisation) return false;
        
        const user = {
          uuidUser: data.user.id,
          uuidOrganisation: data.organisation.id ?? data.organisation.uuid,
          email: data.user.email,
          roles: data.user.roles,
          fullname: data.user.fullname,
        };

        localStorage.setItem("idOrganisation", user.uuidOrganisation);
        localStorage.setItem("idUser", user.uuidUser);

        // console.log("user", user);

        set({ 
          user: user,
          isAuthenticated: true
        });

        return true;
      },

      /**
       * Fonction interne pour nettoyer l'authentification en cas d'erreur.
       */
      _clearAuth: () => {
        set({ isAuthenticated: false, user: null });

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("idOrganisation");
        localStorage.removeItem("idUser");
        return false;
      },
    }),
    { name: "auth-store" } // Activation du persist pour garder l'état après un refresh
  )
);
