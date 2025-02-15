import { mockStatuses } from "@/core/mock/data";
import { create } from "zustand";

interface StatusState {
  statuses: Status[];
  fetchStatuses: () => Promise<void>;
  createStatus: (status: Partial<Status>) => Promise<void>;
  updateStatus: (id: number, status: Partial<Status>) => Promise<void>;
  deleteStatus: (id: number) => Promise<void>;
}

export const useStatusStore = create<StatusState>((set) => ({
  statuses: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockStatuses : [],
  fetchStatuses: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/statuses");
      const data: Status[] = await response.json();
      set({ statuses: data });
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  },
  createStatus: async (status) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockStatus: Status = {
        id: mockStatuses.length + 1,
        ...status
      } as Status;
      set((state) => ({ statuses: [...state.statuses, newMockStatus] }));
      return;
    }
    try {
      const response = await fetch("/api/statuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status)
      });
      const newStatus: Status = await response.json();
      set((state) => ({ statuses: [...state.statuses, newStatus] }));
    } catch (error) {
      console.error("Error creating status:", error);
    }
  },
  updateStatus: async (id, status) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        statuses: state.statuses.map((s) =>
          s.id === id ? { ...s, ...status } : s
        )
      }));
      return;
    }
    try {
      const response = await fetch(`/api/statuses/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status)
      });
      const updatedStatus: Status = await response.json();
      set((state) => ({
        statuses: state.statuses.map((s) => (s.id === id ? updatedStatus : s))
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  },
  deleteStatus: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        statuses: state.statuses.filter((s) => s.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/statuses/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete status");
      }
      set((state) => ({
        statuses: state.statuses.filter((s) => s.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  }
}));
