import { create } from "zustand";
import { post, get } from "../core/services/api.helper";
import { jwtDecode } from "jwt-decode";
import { useOrganisationStore } from "./user/organisationStore";

interface JwtPayload {
  iat: number;
  exp: number;
  roles: string[];
  username: string; // email
}

interface AuthResponse {
  token: string;
  [key: string]: any;
}

interface AuthState {
  user: AuthenticateUser | null;
  isAuthenticated: boolean;
  checkAuth: (role: string) => Promise<boolean>;
  authenticateUserByToken: (token: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    authTarget?: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authenticateUserByToken: async (token: string) => {
    try {
      set({ 
        user: null,
        isLoading: true,
        isAuthenticated: false
       });
      if (!token) {
        return false;
      }
      // Utilisé lors de la request
      localStorage.setItem("jwtToken", token);
      // On récupère les informations de l'utilisateur
      const response = await get<ResponseApi>("/api/app/users/me");
      if (response.success) {
        const infosUser = response.data as {
          [key: string]: any;
        };
        const user = infosUser.user;
        const org = infosUser.organisation;

        console.log("user", user);
        

        if (user && org) {
          localStorage.setItem("idUser", user.uuid);
          localStorage.setItem("idOrganisation", org.id);
          set({
            user: {
              uuidUser: user.id,
              uuidOrganisation: org.uuid,
              email: user.email as string,
              roles: user.roles as string[],
              fullname: user.fullname as string,
            },
            isAuthenticated: true
          });
        }

        set({
          isLoading: false,
        });
        return true;
      }
    } catch (error) {
      set({ isAuthenticated: false });
    }
    return false;
  },
  checkAuth: async (role) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        set({ isAuthenticated: false });
        return false;
      }
      const decoded = jwtDecode<JwtPayload>(token);

      // On vérifie si le token est encore valide
      // TODO : Auto refresh token
      if (decoded.exp * 1000 < Date.now()) {
        set({
          isAuthenticated: false,
          user: null
        });
        return false;
      }

      // On vérifie si le role est bon
      if (!decoded.roles.includes(role)) {
        set({
          isAuthenticated: false,
          user: null
        });
        return false;
      }
      const stringData = localStorage.getItem("organisation");
      const org = stringData ? JSON.parse(stringData) : null;
      if (!org) {
        // On va récupérer l'organisation de l'utilisateur
        // Deja fait via authentification ?
      }
      return true;
    } catch (error) {
      set({ isAuthenticated: false });
    }
    return false;
  },
  isLoading: false,
  error: null,
  login: async (email, password, authTarget = "user") => {
    set({ isLoading: true, error: null, user: null });
    try {
      // Si on lui passe n'importe qui il passera par le login user
      const path =
        authTarget === "admin"
          ? "/api/admin/login_check"
          : "/api/app/login_check";
      const data = await post<AuthResponse>(
        path,
        { username: email, password },
        { skipAuth: true }
      );
      if ("token" in data && typeof data.token === "string") {
        const decoded = jwtDecode<JwtPayload>(data.token);
        localStorage.setItem("jwtToken", data.token);
        // localStorage.setItem("userId", decoded.username);
        const user = data.user;
        const org = data.organisation;

        console.log("user", user);
        
        if (user && org) {
          localStorage.setItem("idUser", user.uuid);
          localStorage.setItem("idOrganisation", org.id);
          set({
            user: {
              uuidUser: user.id,
              uuidOrganisation: org.uuid,
              email: user.email as string,
              roles: user.roles as string[],
              fullname: user.fullname as string,
            },
            isAuthenticated: true
          });
        }

        set({
          isLoading: false,
        });

        if (org) {
        }
        return true;
      }

      return false;
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
      set({ error: "Invalid credentials or network error", isLoading: false });

      return false;
    }
  },
  logout: async () => {
    try {
      // await get("/api/logout", { authTarget: "user" }); // Balek de se logout sur l'api
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("jwtToken"); // On retir aussi le token admin
      localStorage.removeItem("idUser"); // On retir aussi le token admin
      localStorage.removeItem("idOrganisation"); // On retir aussi le token admin
    } catch (error) {}
  }
}));
