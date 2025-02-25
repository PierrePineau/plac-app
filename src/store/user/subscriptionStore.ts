import { createCrudStore } from "../createCrudStore";

export const useSubScriptionStore = createCrudStore<Subscription>("/api/app/subscription");