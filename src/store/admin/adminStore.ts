import { mockOrganisations, mockUsers } from "@/core/mock/data";
import { create } from "zustand";

interface AdminState {
  organisations: Organisation[];
  users: User[];

  fetchOrganisations: () => Promise<void>;
  createOrganisation: (organisation: Partial<Organisation>) => Promise<void>;
  updateOrganisation: (
    id: number,
    organisation: Partial<Organisation>
  ) => Promise<void>;
  deleteOrganisation: (id: number) => Promise<void>;

  fetchUsers: () => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  organisations:
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockOrganisations : [],
  users: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockUsers : [],

  fetchOrganisations: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/admin/organisations");
      const data: Organisation[] = await response.json();
      set({ organisations: data });
    } catch (error) {
      console.error("Error fetching admin organisations:", error);
    }
  },

  createOrganisation: async (organisation) => {
    try {
      const response = await fetch("/api/admin/organisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organisation)
      });
      const newOrganisation: Organisation = await response.json();
      set((state) => ({
        organisations: [...state.organisations, newOrganisation]
      }));
    } catch (error) {
      console.error("Error creating admin organisation:", error);
    }
  },

  updateOrganisation: async (id, organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/admin/organisations/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organisation)
      });
      const updatedOrganisation: Organisation = await response.json();
      set((state) => ({
        organisations: state.organisations.map((o) =>
          o.id === id ? updatedOrganisation : o
        )
      }));
    } catch (error) {
      console.error("Error updating admin organisation:", error);
    }
  },

  deleteOrganisation: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/admin/organisations/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete organisation");
      }
      set((state) => ({
        organisations: state.organisations.filter((o) => o.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting admin organisation:", error);
    }
  },

  fetchUsers: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/admin/users");
      const data: User[] = await response.json();
      set({ users: data });
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  },

  fetchUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/admin/users/${id}`);
      const data: User = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? data : u))
      }));
    } catch (error) {
      console.error("Error fetching admin user:", error);
    }
  },

  updateUser: async (id, user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const updatedUser: User = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u))
      }));
    } catch (error) {
      console.error("Error updating admin user:", error);
    }
  },

  deleteUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete admin user");
      }
      set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting admin user:", error);
    }
  }
}));
