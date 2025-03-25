import { createCrudStore } from "../createCrudStore";

export const useUserStore = createCrudStore<User>("/api/app/organisations/{idOrganisation}/users", (set, get) => ({}));
