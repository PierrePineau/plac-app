import { mockPlans } from "@/core/mock/data";
import { create } from "zustand";

interface PlanState {
  plans: Plan[];
  fetchPlans: () => Promise<void>;
  createPlan: (plan: Partial<Plan>) => Promise<void>;
  updatePlan: (id: number, plan: Partial<Plan>) => Promise<void>;
  deletePlan: (id: number) => Promise<void>;
}

export const usePlanStore = create<PlanState>((set) => ({
  plans: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ? mockPlans : [],
  fetchPlans: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") return;
    try {
      const response = await fetch("/api/plans");
      const data: Plan[] = await response.json();
      set({ plans: data });
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  },
  createPlan: async (plan) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      const newMockPlan: Plan = {
        id: mockPlans.length + 1,
        reference: `PLAN${mockPlans.length + 1}`,
        price: 0,
        modules: [],
        enable: true,
        ...plan
      } as Plan;
      set((state) => ({ plans: [...state.plans, newMockPlan] }));
      return;
    }
    try {
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan)
      });
      const newPlan: Plan = await response.json();
      set((state) => ({ plans: [...state.plans, newPlan] }));
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  },
  updatePlan: async (id, plan) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      set((state) => ({
        plans: state.plans.map((p) => (p.id === id ? { ...p, ...plan } : p))
      }));
      return;
    }
    try {
      const response = await fetch(`/api/plans/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan)
      });
      const updatedPlan: Plan = await response.json();
      set((state) => ({
        plans: state.plans.map((p) => (p.id === id ? updatedPlan : p))
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  },
  deletePlan: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      set((state) => ({
        plans: state.plans.filter((p) => p.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/plans/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete plan");
      }
      set((state) => ({
        plans: state.plans.filter((p) => p.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  }
}));
