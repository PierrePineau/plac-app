import { mockOrganisations } from "@/core/mock/data";
import { create } from "zustand";

interface OrganisationState {
  organisations: Organisation[];
  fetchOrganisations: () => Promise<void>;
  createOrganisation: (organisation: Partial<Organisation>) => Promise<void>;
  updateOrganisation: (
    id: number,
    organisation: Partial<Organisation>
  ) => Promise<void>;
  deleteOrganisation: (id: number) => Promise<void>;
}

export const useOrganisationStore = create<OrganisationState>((set) => ({
  organisations:
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockOrganisations : [],
  fetchOrganisations: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/organisations");
      const data: Organisation[] = await response.json();
      set({ organisations: data });
    } catch (error) {
      console.error("Error fetching organisations:", error);
    }
  },
  createOrganisation: async (organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockOrganisation: Organisation = {
        id: mockOrganisations.length + 1,
        uuid: (Math.random() * 100000).toString(),
        name: organisation.name ?? "New Organisation",
        createdAt: new Date(),
        updatedAt: new Date(),
        employes: organisation.employes ?? [],
        organisationModules: organisation.organisationModules ?? []
      } as Organisation;
      set((state) => ({
        organisations: [...state.organisations, newMockOrganisation]
      }));
      return;
    }
    try {
      const response = await fetch("/api/organisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organisation)
      });
      const newOrganisation: Organisation = await response.json();
      set((state) => ({
        organisations: [...state.organisations, newOrganisation]
      }));
    } catch (error) {
      console.error("Error creating organisation:", error);
    }
  },
  updateOrganisation: async (id, organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        organisations: state.organisations.map((o) =>
          o.id === id ? { ...o, ...organisation } : o
        )
      }));
      return;
    }
    try {
      const response = await fetch(`/api/organisations/${id}`, {
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
      console.error("Error updating organisation:", error);
    }
  },
  deleteOrganisation: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        organisations: state.organisations.filter((o) => o.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/organisations/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete organisation");
      }
      set((state) => ({
        organisations: state.organisations.filter((o) => o.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting organisation:", error);
    }
  }
}));
