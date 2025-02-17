import { create } from "zustand";
import { post, get } from "../../core/services/api.helper";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null, user: null });
    try {
      const data = await post<User>(
        "/api/app/login_check",
        { username: email, password },
        { skipAuth: true, authTarget: "user" }
      );
      if ("token" in data && typeof data.token === "string") {
        const decoded = jwtDecode<JwtPayload>(data.token);
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userId", decoded.username);
      }
      set({ user: data, isLoading: false, isAuthenticated: true });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
      set({ error: "Invalid credentials or network error", isLoading: false });
    }
  },
  logout: async () => {
    try {
      // await get("/api/logout", { authTarget: "user" }); // Balek de se logout sur l'api
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("jwtToken"); // On retir aussi le token admin
    } catch (error) {}
  }
}));
