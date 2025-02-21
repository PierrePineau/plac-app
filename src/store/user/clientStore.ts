import { createCrudStore } from "../createCrudStore";

export const useClientStore = createCrudStore<Client>("/api/app/clients");
