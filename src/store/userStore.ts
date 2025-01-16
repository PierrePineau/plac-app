import { mockUsers } from "@/core/mock/user";
import { create } from "zustand";

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => User | undefined;
  updateUser: (id: number, updatedUser: Partial<User>) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockUsers : [],
  fetchUsers: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set(() => ({ users: mockUsers }));
    } else {
      try {
        const response = await fetch("/api/users"); // Remplace par ton endpoint API
        if (!response.ok) throw new Error("Failed to fetch users");
        const data: User[] = await response.json();
        set(() => ({ users: data }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  getUserById: (id) => {
    const { users } = get();
    return users.find((user) => user.id === id);
  },
  updateUser: async (id, updatedUser) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      }));
    } else {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser)
        });
        if (!response.ok) throw new Error("Failed to update user");
        const updated: User = await response.json();
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? updated : user))
        }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  removeUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        users: state.users.filter((user) => user.id !== id)
      }));
    } else {
      try {
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete user");
        set((state) => ({
          users: state.users.filter((user) => user.id !== id)
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }
}));
