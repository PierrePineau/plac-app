// adminAuthStore.ts
import { create } from "zustand";
import { post, get } from "../../core/services/api.helper";

interface AdminAuthState {
  adminToken: string | null;
  isAuthenticated: boolean;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  adminToken: null,
  isAuthenticated: false,
  loginAdmin: async (username, password) => {
    try {
      const data = await post<{ token: string }>(
        "/api/admin/login_check",
        { username, password },
        { skipAuth: true, authTarget: "admin" }
      );
      set({ adminToken: data.token, isAuthenticated: true });
      localStorage.setItem("adminToken", data.token);
      localStorage.removeItem("userToken");
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },
  logoutAdmin: async () => {
    try {
      await get("/api/logout", { authTarget: "admin" });
      set({ adminToken: null, isAuthenticated: false });
      localStorage.removeItem("adminToken");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}));
