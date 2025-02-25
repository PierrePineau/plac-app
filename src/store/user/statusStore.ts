import { createCrudStore } from "../createCrudStore";

export const useStatusStore = createCrudStore<Status>("/api/app/status");