import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  device: null,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
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
      } else {
        const data = await response.json();
        console.log("Connexion réussie :", data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  },
  logout: () => set({ user: null })
}));
