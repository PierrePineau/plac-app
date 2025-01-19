
import { mockModules } from '@/core/mock/data';
import { create } from 'zustand';

interface ModuleState {
  modules: Module[];
  fetchModules: () => Promise<void>;
  createModule: (module: Partial<Module>) => Promise<void>;
  updateModule: (id: number, module: Partial<Module>) => Promise<void>;
  deleteModule: (id: number) => Promise<void>;
}

export const useModuleStore = create<ModuleState>((set) => ({
  modules: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ? mockModules : [],
  fetchModules: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      return;
    }
    try {
      const response = await fetch('/api/modules');
      const data: Module[] = await response.json();
      set({ modules: data });
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  },
  createModule: async (module) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      const newMockModule: Module = {
        id: mockModules.length + 1,
        ...module,
        enable: module.enable ?? true,
      } as Module;
      set((state) => ({ modules: [...state.modules, newMockModule] }));
      return;
    }
    try {
      const response = await fetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(module),
      });
      if (!response.ok) {
        throw new Error('Failed to create module');
      }
      const newModule: Module = await response.json();
      set((state) => ({ modules: [...state.modules, newModule] }));
    } catch (error) {
      console.error('Error creating module:', error);
    }
  },
  updateModule: async (id, module) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        modules: state.modules.map((m) =>
          m.id === id ? { ...m, ...module } : m
        ),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/modules/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(module),
      });
      if (!response.ok) {
        throw new Error('Failed to update module');
      }
      const updatedModule: Module = await response.json();
      set((state) => ({
        modules: state.modules.map((m) =>
          m.id === id ? updatedModule : m
        ),
      }));
    } catch (error) {
      console.error('Error updating module:', error);
    }
  },
  deleteModule: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        modules: state.modules.filter((m) => m.id !== id),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/modules/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete module');
      }
      set((state) => ({
        modules: state.modules.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  },
}));
