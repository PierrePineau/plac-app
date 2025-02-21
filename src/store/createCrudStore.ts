import { create } from "zustand";
import { get as apiGet, post, remove } from "@/core/services/api.helper";

export const createCrudStore = <T extends { id: number | string }>(endpoint: string) => {
    return create<CrudInterface<T>>((set, get) => ({
        data: [],
        fetchData: async (filters: any) => {
            try {
                const response = await apiGet<ResponseApi>(`${endpoint}`, filters);
                if (response.success) {
                    const data = (response.data as any).results as T[];
                    set({ data });
                }
            } catch (error) {
                console.error(`Error fetching from ${endpoint}:`, error);
            }
        },
        getOneById: (id) => {
            const { data } = get();
            return data.find((item) => item.id === id);
        },
        create: async (item) => {
            try {
                const response = await post<ResponseApi>(`${endpoint}`, item);
                if (response.success) {
                    const newData = response.data as T;
                    set((state) => ({ data: [...state.data, newData] }));
                    return newData;
                }
            } catch (error) {
                console.error(`Error creating in ${endpoint}:`, error);
            }
            return null;
        },
        update: async (id, item) => {
            try {
                const response = await post<ResponseApi>(`${endpoint}/${id}`, item);
                if (response.success) {
                    const updatedData = response.data as T;
                    set((state) => ({
                        data: state.data.map((p) => (p.id === id ? updatedData : p)),
                    }));
                    return updatedData;
                }
            } catch (error) {
                console.error(`Error updating in ${endpoint}:`, error);
            }
            return null;
        },
        delete: async (id) => {
            try {
                const response = await remove<ResponseApi>(`${endpoint}/${id}`);
                if (response.success) {
                    set((state) => ({
                        data: state.data.filter((p) => p.id !== id),
                    }));
                }
            } catch (error) {
                console.error(`Error deleting in ${endpoint}:`, error);
            }
        },
    }));
};
