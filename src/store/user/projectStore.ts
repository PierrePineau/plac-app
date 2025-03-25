import { createCrudStore } from "../createCrudStore";

export const useProjectStore = createCrudStore<Project>(
  "/api/app/organisations/{idOrganisation}/projects",
  (set, get) => ({})
);
