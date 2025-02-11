import { mockUsers } from "@/core/mock/data";
import { create } from "zustand";

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
      const response = await fetch(`/api/app/users/${id}`);
      const data: User = await response.json();
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
      const response = await fetch("/api/app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const newUser: User = await response.json();
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  updateUser: async (id, user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/app/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const updatedUser: User = await response.json();
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
      const response = await fetch(`/api/app/users/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },

  fetchUserOrganisations: async (idUser) => {
    try {
      const response = await fetch(`/api/app/users/${idUser}/organisations`);
      const data = await response.json();
      console.log("Fetched user organisations:", data);
    } catch (error) {
      console.error("Error fetching user organisations:", error);
    }
  },

  addUserOrganisation: async (idUser, organisation) => {
    try {
      const response = await fetch(`/api/app/users/${idUser}/organisations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organisation)
      });
      const newOrganisation = await response.json();
      console.log("Added organisation to user:", newOrganisation);
    } catch (error) {
      console.error("Error adding organisation to user:", error);
    }
  }
}));
