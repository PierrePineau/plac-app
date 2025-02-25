import { createCrudStore } from "../createCrudStore";

export const usePlanStore = createCrudStore<Plan>("/api/app/plan");
