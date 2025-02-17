// adminAuthStore.ts
import { create } from "zustand";
import { post, get } from "../../core/services/api.helper";

interface AdminAuthState {
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  adminToken: null,
  isAdminAuthenticated: false,
  loginAdmin: async (username, password) => {
    try {
      const data = await post<{ token: string }>(
        "/api/admin/login_check",
        { username, password },
        { skipAuth: true }
      );
      set({ adminToken: data.token, isAdminAuthenticated: true });
      localStorage.setItem("jwtToken", data.token);
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },
}));
