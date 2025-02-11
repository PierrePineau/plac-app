import { create } from "zustand";

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
      const response = await fetch("/api/admin/login_check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      set({ adminToken: data.token, isAuthenticated: true });
      localStorage.setItem("adminToken", data.token);
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },

  logoutAdmin: async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
      set({ adminToken: null, isAuthenticated: false });
      localStorage.removeItem("adminToken");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}));
