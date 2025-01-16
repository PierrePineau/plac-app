import { create } from "zustand";
import { mockYards, mockMedias, mockMediaTypes } from "@/core/mock/yards";

interface YardStore {
  yards: Yard[];
  medias: Media[];
  mediaTypes: MediaType[];
  fetchYards: () => Promise<void>;
  fetchMedias: () => Promise<void>;
  fetchMediaTypes: () => Promise<void>;
  getYardById: (id: number) => Yard | undefined;
  addYard: (yard: Omit<Yard, "id">) => Promise<void>;
  updateYard: (id: number, updatedYard: Partial<Yard>) => Promise<void>;
  removeYard: (id: number) => Promise<void>;
}

export const useYardStore = create<YardStore>((set, get) => ({
  yards: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockYards : [],
  medias: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockMedias : [],
  mediaTypes: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockMediaTypes : [],
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
  fetchMedias: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set(() => ({ medias: mockMedias }));
    } else {
      try {
        const response = await fetch("/api/medias");
        if (!response.ok) throw new Error("Failed to fetch medias");
        const data: Media[] = await response.json();
        set(() => ({ medias: data }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  fetchMediaTypes: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set(() => ({ mediaTypes: mockMediaTypes }));
    } else {
      try {
        const response = await fetch("/api/media-types");
        if (!response.ok) throw new Error("Failed to fetch media types");
        const data: MediaType[] = await response.json();
        set(() => ({ mediaTypes: data }));
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
