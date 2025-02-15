import { mockOrganisations } from "@/core/mock/data";
import { create } from "zustand";
import { get, post, remove } from "../../core/services/api.helper";

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
      const data = await get<Organisation>(
        `/api/app/organisations/${idOrganisation}`,
        { authTarget: "user" }
      );
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
      const newOrganisation = await post<Organisation>(
        `/api/app/organisations`,
        organisation,
        { authTarget: "user" }
      );
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
      const updatedOrganisation = await post<Organisation>(
        `/api/app/organisations/${idOrganisation}`,
        organisation,
        { authTarget: "user" }
      );
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
      await remove<Organisation>(`/api/app/organisations/${idOrganisation}`, {
        authTarget: "user"
      });
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
      const data = await get(
        `/api/app/organisations/${idOrganisation}/clients`,
        { authTarget: "user" }
      );
      console.log("Fetched clients:", data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  },
  fetchNotes: async (idOrganisation) => {
    try {
      const data = await get(`/api/app/organisations/${idOrganisation}/notes`, {
        authTarget: "user"
      });
      console.log("Fetched notes:", data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },
  fetchProjects: async (idOrganisation) => {
    try {
      const data = await get(
        `/api/app/organisations/${idOrganisation}/projects`,
        { authTarget: "user" }
      );
      console.log("Fetched projects:", data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
}));
