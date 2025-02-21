import { createCrudStore } from "../createCrudStore";

export const useProjectStore = createCrudStore<Project>("/api/admin/projects");