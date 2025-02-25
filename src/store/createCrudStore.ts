import { create } from "zustand";
import { get as apiGet, post, remove } from "@/core/services/api.helper";

interface CrudInterface<T> {
  endpoint: string;
  data: T[];
  getEndpoint: (params?: any) => string;
  setEndpoint: (newEndpoint: string) => void;
  fetchData: (filters: any) => Promise<void>;
  getOneById: (id: string) => T | undefined;
  create: (item: Partial<T>) => Promise<T | null>;
  update: (id: string | number, item: Partial<T>) => Promise<T | null>;
  delete: (id: string | number) => Promise<void>;
}

export const createCrudStore = <
  T,
  ExtraMethods extends Record<string, any> = {}
>(
  endpoint: string,
  extend?: (set: any, get: any) => ExtraMethods
) => {
  return create<CrudInterface<T> & ExtraMethods>((set, get) => ({
    endpoint,
    getEndpoint: (params?: any) => {
      const getOrgId = () => localStorage.getItem("idOrganisation") || "";
      return endpoint.replace("{idOrganisation}", getOrgId());
    },
    setEndpoint: (newEndpoint: string) =>
      set((state) => ({ ...state, endpoint: newEndpoint })),
    data: [],
    fetchData: async (filters: any) => {
      let ep = "";
      try {
        ep = get().getEndpoint();
        const response = await apiGet<ResponseApi>(ep, filters);
        if (response.success) {
          const data = (response.data as any).results as T[];
          set((state) => ({ ...state, data }));
        }
      } catch (error) {
        console.error(`Error fetching from ${ep}:`, error);
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
        console.log("hvfjhvfhjezvfzejhf");
        console.log(response.success);
        if (response.success) {
          const newData = response.data as T;
          console.log(newData);
          set((state) => ({ ...state, data: [...state.data, newData] }));
          return newData;
        }
      } catch (error) {
        console.error(`Error creating in ${ep}:`, error);
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
            )
          }));
          return updatedData;
        }
      } catch (error) {
        console.error(`Error updating in ${ep}:`, error);
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
            data: state.data.filter((p) => (p as any).id !== id)
          }));
        }
      } catch (error) {
        console.error(`Error deleting in ${ep}:`, error);
      }
    },
    ...(extend ? extend(set, get) : ({} as ExtraMethods))
  }));
};
