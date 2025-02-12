import { mockOrganisations, mockUsers } from "@/core/mock/data";
import { create } from "zustand";
import { get, post, remove } from "../../core/services/api.helper";

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
      const data = await get<Organisation[]>("/api/admin/organisations", {
        authTarget: "admin"
      });
      set({ organisations: data });
    } catch (error) {
      console.error("Error fetching admin organisations:", error);
    }
  },
  createOrganisation: async (organisation) => {
    try {
      const newOrganisation = await post<Organisation>(
        "/api/admin/organisations",
        organisation,
        { authTarget: "admin" }
      );
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
      const updatedOrganisation = await post<Organisation>(
        `/api/admin/organisations/${id}`,
        organisation,
        { authTarget: "admin" }
      );
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
      await remove(`/api/admin/organisations/${id}`, { authTarget: "admin" });
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
      const data = await get<User[]>("/api/admin/users", {
        authTarget: "admin"
      });
      set({ users: data });
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  },
  fetchUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const data = await get<User>(`/api/admin/users/${id}`, {
        authTarget: "admin"
      });
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
      const updatedUser = await post<User>(`/api/admin/users/${id}`, user, {
        authTarget: "admin"
      });
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
      await remove(`/api/admin/users/${id}`, { authTarget: "admin" });
      set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
    } catch (error) {
      console.error("Error deleting admin user:", error);
    }
  }
}));
