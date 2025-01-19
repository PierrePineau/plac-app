import { mockNotes } from "@/core/mock/data";
import { create } from "zustand";
interface NoteState {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  createNote: (note: Partial<Note>) => Promise<void>;
  updateNote: (id: number, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ? mockNotes : [],
  fetchNotes: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") return;
    try {
      const response = await fetch("/api/notes");
      const data: Note[] = await response.json();
      set({ notes: data });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },
  createNote: async (note) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      const newMockNote: Note = {
        id: mockNotes.length + 1,
        uuid: (Math.random() * 100000).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        projects: note.projects ?? [],
        ...note
      } as Note;
      set((state) => ({ notes: [...state.notes, newMockNote] }));
      return;
    }
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      });
      const newNote: Note = await response.json();
      set((state) => ({ notes: [...state.notes, newNote] }));
    } catch (error) {
      console.error("Error creating note:", error);
    }
  },
  updateNote: async (id, note) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, ...note } : n))
      }));
      return;
    }
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      });
      const updatedNote: Note = await response.json();
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? updatedNote : n))
      }));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  },
  deleteNote: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      set((state) => ({
        notes: state.notes.filter((n) => n.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      set((state) => ({
        notes: state.notes.filter((n) => n.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
}));
