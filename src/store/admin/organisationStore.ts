import { createCrudStore } from "../createCrudStore";

export const useOrganisationStore = createCrudStore<Organisation>("/api/admin/organisations");