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
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await post<User>(
        "/api/app/login_check",
        { username: email, password },
        { skipAuth: true, authTarget: "user" }
      );
      if ("token" in data && typeof data.token === "string") {
        const decoded = jwtDecode<JwtPayload>(data.token);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", decoded.username);
      }
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ error: "Invalid credentials or network error", isLoading: false });
    }
  },
  logout: async () => {
    try {
      await get("/api/logout", { authTarget: "user" });
      set({ user: null });
      localStorage.removeItem("userToken");
    } catch (error) {}
  }
}));
