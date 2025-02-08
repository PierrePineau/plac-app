import { mockEmployes } from "@/core/mock/data";
import { create } from "zustand";

interface EmployeState {
  employes: Employe[];
  fetchEmployes: () => Promise<void>;
  getEmployeeById: (id: number) => Employe | undefined;
  createEmploye: (employe: Partial<Employe>) => Promise<void>;
  updateEmploye: (id: number, employe: Partial<Employe>) => Promise<void>;
  deleteEmploye: (id: number) => Promise<void>;
}

export const useEmployeStore = create<EmployeState>((set, get) => ({
  employes: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockEmployes : [],
  fetchEmployes: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set({ employes: mockEmployes });
      return;
    }
    try {
      const response = await fetch("/api/employes");
      const data: Employe[] = await response.json();
      set({ employes: data });
    } catch (error) {
      console.error("Error fetching employes:", error);
    }
  },
  getEmployeeById: (id: number) => {
    const { employes } = get();
    return employes.find((employe: Employe) => employe.id === id);
  },
  createEmploye: async (employe) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockEmploye: Employe = {
        id: mockEmployes.length + 1,
        uuid: (Math.random() * 100000).toString(),
        roles: employe.roles ?? ["ROLE_EMPLOYE"],
        organisations: employe.organisations ?? [],
        username: employe.username ?? "new_user",
        ...employe
      } as Employe;
      set((state) => ({ employes: [...state.employes, newMockEmploye] }));
      return;
    }
    try {
      const response = await fetch("/api/employes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employe)
      });
      const newEmploye: Employe = await response.json();
      set((state) => ({ employes: [...state.employes, newEmploye] }));
    } catch (error) {
      console.error("Error creating employe:", error);
    }
  },
  updateEmploye: async (id, employe) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        employes: state.employes.map((e) =>
          e.id === id ? { ...e, ...employe } : e
        )
      }));
      return;
    }
    try {
      const response = await fetch(`/api/employes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employe)
      });
      const updatedEmploye: Employe = await response.json();
      set((state) => ({
        employes: state.employes.map((e) => (e.id === id ? updatedEmploye : e))
      }));
    } catch (error) {
      console.error("Error updating employe:", error);
    }
  },
  deleteEmploye: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        employes: state.employes.filter((e) => e.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/employes/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete employe");
      }
      set((state) => ({
        employes: state.employes.filter((e) => e.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting employe:", error);
    }
  }
}));
