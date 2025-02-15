import { mockUsers } from "@/core/mock/data";
import { create } from "zustand";
import { get, post, remove } from "../../core/services/api.helper";

interface UserState {
  users: User[];
  fetchUser: (id: number) => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  fetchUserOrganisations: (idUser: number) => Promise<void>;
  addUserOrganisation: (
    idUser: number,
    organisation: Partial<any>
  ) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockUsers : [],

  fetchUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const data = await get<User>(`/api/app/users/${id}`, {
        authTarget: "user"
      });
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? data : u))
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  createUser: async (user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const newUser = await post<User>("/api/app/users", user, {
        authTarget: "user"
      });
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  updateUser: async (id, user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const updatedUser = await post<User>(`/api/app/users/${id}`, user, {
        authTarget: "user"
      });
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u))
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  deleteUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      await remove(`/api/app/users/${id}`, { authTarget: "user" });
      set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },

  fetchUserOrganisations: async (idUser) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const data = await get(`/api/app/users/${idUser}/organisations`, {
        authTarget: "user"
      });
      console.log("Fetched user organisations:", data);
    } catch (error) {
      console.error("Error fetching user organisations:", error);
    }
  },

  addUserOrganisation: async (idUser, organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const newOrganisation = await post(
        `/api/app/users/${idUser}/organisations`,
        organisation,
        { authTarget: "user" }
      );
      console.log("Added organisation to user:", newOrganisation);
    } catch (error) {
      console.error("Error adding organisation to user:", error);
    }
  }
}));
