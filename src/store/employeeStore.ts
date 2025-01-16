import { mockEmployes } from "@/core/mock/employee";
import { create } from "zustand";

interface EmployeStore {
  employes: Employe[];
  fetchEmployes: () => Promise<void>;
  addEmploye: (employe: Omit<Employe, "id">) => Promise<void>;
  getEmployeById: (id: number) => Employe | undefined;
  updateEmploye: (
    id: number,
    updatedEmploye: Partial<Employe>
  ) => Promise<void>;
  removeEmploye: (id: number) => Promise<void>;
}

export const useEmployeStore = create<EmployeStore>((set, get) => ({
  employes: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockEmployes : [],
  fetchEmployes: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set(() => ({ employes: mockEmployes }));
    } else {
      try {
        const response = await fetch("/api/employes");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data: Employe[] = await response.json();
        set(() => ({ employes: data }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  getEmployeById: (id: number) => {
    const { employes } = get();
    return employes.find((employe: Employe) => employe.id === id);
  },
  addEmploye: async (employe) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newEmploye = { ...employe, id: Date.now() };
      set((state) => ({ employes: [...state.employes, newEmploye] }));
    } else {
      try {
        const response = await fetch("/api/employes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employe)
        });
        if (!response.ok) throw new Error("Failed to add employee");
        const newEmploye: Employe = await response.json();
        set((state) => ({ employes: [...state.employes, newEmploye] }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  updateEmploye: async (id, updatedEmploye) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        employes: state.employes.map((e) =>
          e.id === id ? { ...e, ...updatedEmploye } : e
        )
      }));
    } else {
      try {
        const response = await fetch(`/api/employes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmploye)
        });
        if (!response.ok) throw new Error("Failed to update employee");
        const updated: Employe = await response.json();
        set((state) => ({
          employes: state.employes.map((e) => (e.id === id ? updated : e))
        }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  removeEmploye: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        employes: state.employes.filter((e) => e.id !== id)
      }));
    } else {
      try {
        const response = await fetch(`/api/employes/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete employee");
        set((state) => ({
          employes: state.employes.filter((e) => e.id !== id)
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }
}));
