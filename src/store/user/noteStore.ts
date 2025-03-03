import { createCrudStore } from "../createCrudStore";

export const useNoteStore = createCrudStore<Note>(
  "/api/app/organisations/{idOrganisation}/notes",
  (set, get) => ({})
);
