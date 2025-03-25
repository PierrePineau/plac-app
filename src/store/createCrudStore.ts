import { create } from "zustand";
import { get as apiGet, post, remove } from "@/core/services/api.helper";

export const createCrudStore = <
  T,
  ExtraMethods extends Record<string, any> = Record<string, any>
>(
  endpoint: string,
  extend?: (set: any, get: any) => ExtraMethods
) => {
  return create<CrudInterface<T> & ExtraMethods>((set, get) => ({
    endpoint,
    error: null,
    getEndpoint: (params?: any) => {
      const getOrgId = () => localStorage.getItem("idOrganisation") || "";
      const getProjectId = () => localStorage.getItem("projectId") || "";
      endpoint = endpoint
        .replace("{idOrganisation}", getOrgId())
        .replace("{idProject}", getProjectId());
      return endpoint;
    },
    setEndpoint: (newEndpoint: string) =>
      set((state) => ({ ...state, endpoint: newEndpoint })),
    data: [],
    fetchData: async (filters: any) => {
      let ep = "";
      try {
        ep = get().getEndpoint();
        if (filters) {
          const params = new URLSearchParams(filters).toString();
          if (params) {
            ep += "?" + params;
          }
        }
        const response = await apiGet<ResponseApi>(ep);
        if (response.success) {
          const data = (response.data as any).results as T[];
          set((state) => ({ ...state, data, error: null }));
        }
        const { data } = get();
        return data;
      } catch (error: any) {
        console.error(`Error fetching from ${ep}:`, error);
        set((state) => ({
          ...state,
          error: `Erreur lors du chargement des données: ${
            error.message || error
          }`
        }));
        return [];
      }
    },
    getOneById: (id) => {
      const { data } = get();
      return data.find((item) => (item as any).id === id);
    },
    create: async (item: Partial<T>) => {
      let ep = "";
      try {
        ep = get().getEndpoint();
        const response = await post<ResponseApi>(ep, item);
        if (response.success) {
          const newData = response.data as T;
          set((state) => ({
            ...state,
            data: [...state.data, newData],
            error: null
          }));
          return newData;
        }
      } catch (error: any) {
        console.error(`Error creating in ${ep}:`, error);
        set((state) => ({
          ...state,
          error: `Erreur lors de la création: ${error.message || error}`
        }));
      }
      return null;
    },
    update: async (id, item: Partial<T>) => {
      let ep = "";
      try {
        ep = get().getEndpoint();
        const response = await post<ResponseApi>(`${ep}/${id}`, item);
        if (response.success) {
          const updatedData = response.data as T;
          set((state) => ({
            ...state,
            data: state.data.map((p) =>
              (p as any).id === id ? updatedData : p
            ),
            error: null
          }));
          return updatedData;
        }
      } catch (error: any) {
        console.error(`Error updating in ${ep}:`, error);
        set((state) => ({
          ...state,
          error: `Erreur lors de la mise à jour: ${error.message || error}`
        }));
      }
      return null;
    },
    delete: async (id) => {
      let ep = "";
      try {
        ep = get().getEndpoint();
        const response = await remove<ResponseApi>(`${ep}/${id}`);
        if (response.success) {
          set((state) => ({
            ...state,
            data: state.data.filter((p) => (p as any).id !== id),
            error: null
          }));
        }
      } catch (error: any) {
        console.error(`Error deleting in ${ep}:`, error);
        set((state) => ({
          ...state,
          error: `Erreur lors de la suppression: ${error.message || error}`
        }));
      }
    },
    ...(extend ? extend(set, get) : ({} as ExtraMethods))
  }));
};
