import { mockClients } from "@/core/mock/data";
import { create } from "zustand";

interface ClientState {
  clients: Client[];
  fetchClients: () => Promise<void>;
  createClient: (client: Partial<Client>) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockClients : [],
  fetchClients: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/clients");
      const data: Client[] = await response.json();
      set({ clients: data });
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  },
  createClient: async (client) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockClient: Client = {
        id: (Math.random() * 100000).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        archived: false,
        deleted: false,
        organisationClients: [],
        ...client
      } as Client;
      set((state) => ({ clients: [...state.clients, newMockClient] }));
      return;
    }
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
      });
      const newClient: Client = await response.json();
      set((state) => ({ clients: [...state.clients, newClient] }));
    } catch (error) {
      console.error("Error creating client:", error);
    }
  },
  updateClient: async (id, client) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        clients: state.clients.map((c) =>
          c.id === id ? { ...c, ...client } : c
        )
      }));
      return;
    }
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
      });
      const updatedClient: Client = await response.json();
      set((state) => ({
        clients: state.clients.map((c) => (c.id === id ? updatedClient : c))
      }));
    } catch (error) {
      console.error("Error updating client:", error);
    }
  },
  deleteClient: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete client");
      }
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }
}));
