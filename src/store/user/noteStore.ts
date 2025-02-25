import { createCrudStore } from "../createCrudStore";

export const useNoteStore = createCrudStore<Note>("/api/app/notes");