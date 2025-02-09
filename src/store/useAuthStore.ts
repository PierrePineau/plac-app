import { create } from "zustand";
import { mockUsers } from "@/core/mock/data";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set({ user: mockUsers[1], isLoading: false });
      return;
    }
    try {
      const response = await fetch(
        `https://dev-api.gestion-plac.fr/api/admin/login_check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          mode: "cors",
          body: JSON.stringify({ username: email, password })
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur API :", errorData);
        set({ error: "Invalid credentials", isLoading: false });
      } else {
        const data = await response.json();
        set({ user: data, isLoading: false });
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      set({ error: "Network error", isLoading: false });
    }
  },
  logout: () => set({ user: null })
}));
