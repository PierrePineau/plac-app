import { create } from "zustand";
import { mockYards } from "@/core/mock/yards";

interface YardStore {
  yards: Yard[];
  fetchYards: () => Promise<void>;
  getYardById: (id: number) => Yard | undefined;
  addYard: (yard: Omit<Yard, "id">) => Promise<void>;
  updateYard: (id: number, updatedYard: Partial<Yard>) => Promise<void>;
  removeYard: (id: number) => Promise<void>;
}

export const useYardStore = create<YardStore>((set, get) => ({
  yards: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockYards : [],
  fetchYards: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set(() => ({ yards: mockYards }));
    } else {
      try {
        const response = await fetch("/api/yards");
        if (!response.ok) throw new Error("Failed to fetch yards");
        const data: Yard[] = await response.json();
        set(() => ({ yards: data }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  getYardById: (id) => {
    const { yards } = get();
    return yards.find((yard) => yard.id === id);
  },
  addYard: async (yard) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newYard = { ...yard, id: Date.now() };
      set((state) => ({ yards: [...state.yards, newYard] }));
    } else {
      try {
        const response = await fetch("/api/yards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(yard)
        });
        if (!response.ok) throw new Error("Failed to add yard");
        const newYard: Yard = await response.json();
        set((state) => ({ yards: [...state.yards, newYard] }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  updateYard: async (id, updatedYard) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        yards: state.yards.map((yard) =>
          yard.id === id ? { ...yard, ...updatedYard } : yard
        )
      }));
    } else {
      try {
        const response = await fetch(`/api/yards/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedYard)
        });
        if (!response.ok) throw new Error("Failed to update yard");
        const updated: Yard = await response.json();
        set((state) => ({
          yards: state.yards.map((yard) => (yard.id === id ? updated : yard))
        }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  removeYard: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        yards: state.yards.filter((yard) => yard.id !== id)
      }));
    } else {
      try {
        const response = await fetch(`/api/yards/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete yard");
        set((state) => ({
          yards: state.yards.filter((yard) => yard.id !== id)
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }
}));
