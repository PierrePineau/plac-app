import { mockProjects } from "@/core/mock/data";
import { create } from "zustand";

interface ProjectState {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  createProject: (project: Partial<Project>) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockProjects : [],
  fetchProjects: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
    try {
      const response = await fetch("/api/projects");
      const data: Project[] = await response.json();
      set({ projects: data });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },
  createProject: async (project) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockProject: Project = {
        id: mockProjects.length + 1,
        uuid: (Math.random() * 100000).toString(),
        reference: project.reference ?? `PRJ-${mockProjects.length + 1}`,
        name: project.name ?? "New Project",
        notes: project.notes ?? [],
        files: project.files ?? []
      } as Project;
      set((state) => ({ projects: [...state.projects, newMockProject] }));
      return;
    }
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });
      const newProject: Project = await response.json();
      set((state) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error("Error creating project:", error);
    }
  },
  updateProject: async (id, project) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        )
      }));
      return;
    }
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });
      const updatedProject: Project = await response.json();
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? updatedProject : p))
      }));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  },
  deleteProject: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
}));
