import { createCrudStore } from "../createCrudStore";

export const useModuleStore = createCrudStore<Module>("/api/app/modules");