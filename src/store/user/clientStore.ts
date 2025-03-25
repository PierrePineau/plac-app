import { createCrudStore } from "../createCrudStore";

export const useClientStore = createCrudStore<Client>("/api/app/organisations/{idOrganisation}/clients", (set, get) => ({}));
