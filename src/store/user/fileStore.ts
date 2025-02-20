import { mockFiles } from "@/core/mock/data";
import { create } from "zustand";

interface FileState {
  files: ProjectFile[];
  fetchFiles: () => Promise<void>;
  createFile: (file: Partial<File>) => Promise<void>;
  updateFile: (id: number, file: Partial<File>) => Promise<void>;
  deleteFile: (id: number) => Promise<void>;
}

export const useFileStore = create<FileState>((set) => ({
  files: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockFiles : [],
  fetchFiles: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/files");
      const data: ProjectFile[] = await response.json();
      set({ files: data });
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  },
  createFile: async (file) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file)
      });
      const newFile: ProjectFile = await response.json();
      set((state) => ({ files: [...state.files, newFile] }));
    } catch (error) {
      console.error("Error creating file:", error);
    }
  },
  updateFile: async (id, file) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        files: state.files.map((f) => (f.id === id ? { ...f, ...file } : f))
      }));
      return;
    }
    try {
      const response = await fetch(`/api/files/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file)
      });
      const updatedFile: ProjectFile = await response.json();
      set((state) => ({
        files: state.files.map((f) => (f.id === id ? updatedFile : f))
      }));
    } catch (error) {
      console.error("Error updating file:", error);
    }
  },
  deleteFile: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        files: state.files.filter((f) => f.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/files/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
      set((state) => ({
        files: state.files.filter((f) => f.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
}));
