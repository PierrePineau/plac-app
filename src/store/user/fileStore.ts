import { createCrudStore } from "../createCrudStore";

export const useFileStore = createCrudStore<Files>("/api/app/organisations/{idOrganisation}/files", (set, get) => ({}));
export const useMediaStore = createCrudStore<Files>("/api/app/organisations/{idOrganisation}/files", (set, get) => ({})); // Ajouter le type de média à récupérer