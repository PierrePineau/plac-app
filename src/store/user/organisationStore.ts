import { mockOrganisations } from "@/core/mock/data";
import { create } from "zustand";

interface OrganisationState {
  organisations: Organisation[];
  fetchOrganisations: (idOrganisation: number) => Promise<void>;
  createOrganisation: (organisation: Partial<Organisation>) => Promise<void>;
  updateOrganisation: (
    idOrganisation: number,
    organisation: Partial<Organisation>
  ) => Promise<void>;
  deleteOrganisation: (idOrganisation: number) => Promise<void>;
  fetchClients: (idOrganisation: number) => Promise<void>;
  fetchNotes: (idOrganisation: number) => Promise<void>;
  fetchProjects: (idOrganisation: number) => Promise<void>;
}

export const useOrganisationStore = create<OrganisationState>((set) => ({
  organisations:
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockOrganisations : [],

  fetchOrganisations: async (idOrganisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/app/organisations/${idOrganisation}`);
      const data: Organisation = await response.json();
      set((state) => ({
        organisations: state.organisations.map((org) =>
          org.id === idOrganisation ? data : org
        )
      }));
    } catch (error) {
      console.error("Error fetching organisation:", error);
    }
  },

  createOrganisation: async (organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/app/organisations", {
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

  updateOrganisation: async (idOrganisation, organisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/app/organisations/${idOrganisation}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organisation)
      });
      const updatedOrganisation: Organisation = await response.json();
      set((state) => ({
        organisations: state.organisations.map((o) =>
          o.id === idOrganisation ? updatedOrganisation : o
        )
      }));
    } catch (error) {
      console.error("Error updating organisation:", error);
    }
  },

  deleteOrganisation: async (idOrganisation) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch(`/api/app/organisations/${idOrganisation}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete organisation");
      }
      set((state) => ({
        organisations: state.organisations.filter(
          (o) => o.id !== idOrganisation
        )
      }));
    } catch (error) {
      console.error("Error deleting organisation:", error);
    }
  },

  fetchClients: async (idOrganisation) => {
    try {
      const response = await fetch(
        `/api/app/organisations/${idOrganisation}/clients`
      );
      const data = await response.json();
      console.log("Fetched clients:", data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  },

  fetchNotes: async (idOrganisation) => {
    try {
      const response = await fetch(
        `/api/app/organisations/${idOrganisation}/notes`
      );
      const data = await response.json();
      console.log("Fetched notes:", data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },

  fetchProjects: async (idOrganisation) => {
    try {
      const response = await fetch(
        `/api/app/organisations/${idOrganisation}/projects`
      );
      const data = await response.json();
      console.log("Fetched projects:", data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
}));
