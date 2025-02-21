import { create } from "zustand";
import { get as apiGet, post, remove } from "@/core/services/api.helper";

// Interface générique pour le CRUD
interface CrudInterface<T> {
    endpoint: string;
    data: T[];
    fetchData: (filters: any) => Promise<void>;
    getOneById: (id: string | number) => T | undefined;
    create: (item: Partial<T>) => Promise<T | null>;
    update: (id: string | number, item: Partial<T>) => Promise<T | null>;
    delete: (id: string | number) => Promise<void>;
}

// Factory pour générer un store CRUD
export const createCrudStore = <T, ExtraMethods extends Record<string, any> = {}>(
    endpoint: string,
    extend?: (set: any, get: any) => ExtraMethods
) => {
    return create<CrudInterface<T> & ExtraMethods>((set, get) => ({
        endpoint: endpoint,
        getEndpoint: (params: any) => {
            // Fonction pour récupérer le `idOrganisation` depuis le `localStorage`
            const getOrgId = () => localStorage.getItem("idOrganisation") || "";

            // Génération dynamique de l'endpoint
            const newEndpoint = endpoint.replace("{idOrganisation}", getOrgId());

            return newEndpoint;
        },
        data: [],
        setEndpoint: (newEndpoint: string) => set({ endpoint: newEndpoint } as Partial<CrudInterface<T> & ExtraMethods>),
        fetchData: async (filters: any) => {
            try {
                const { getEndpoint } = get();
                const endpoint = getEndpoint();
                const response = await apiGet<ResponseApi>(endpoint, filters);
                if (response.success) {
                    const data = (response.data as any).results as T[];
                    set({ data } as Partial<CrudInterface<T> & ExtraMethods>);
                }
            } catch (error) {
                console.error(`Error fetching from ${endpoint}:`, error);
            }
        },
        getOneById: (id) => {
            const { data } = get();
            return data.find((item) => (item as any).id === id);
        },
        create: async (item) => {
            try {
                const { getEndpoint } = get();
                const endpoint = getEndpoint();
                const response = await post<ResponseApi>(endpoint, item);
                if (response.success) {
                    const newData = response.data as T;
                    set((state) => ({ data: [...state.data, newData] } as Partial<CrudInterface<T> & ExtraMethods>));
                    return newData;
                }
            } catch (error) {
                console.error(`Error creating in ${endpoint}:`, error);
            }
            return null;
        },
        update: async (id, item) => {
            try {
                const { getEndpoint } = get();
                const endpoint = getEndpoint();
                const response = await post<ResponseApi>(`${endpoint}/${id}`, item);
                if (response.success) {
                    const updatedData = response.data as T;
                    set((state) => ({
                        data: state.data.map((p) => ((p as any).id === id ? updatedData : p)),
                    }) as Partial<CrudInterface<T> & ExtraMethods>);
                    return updatedData;
                }
            } catch (error) {
                console.error(`Error updating in ${endpoint}:`, error);
            }
            return null;
        },
        delete: async (id) => {
            try {
                const { getEndpoint } = get();
                const endpoint = getEndpoint();
                const response = await remove<ResponseApi>(`${endpoint}/${id}`);
                if (response.success) {
                    set((state) => ({
                        data: state.data.filter((p) => (p as any).id !== id),
                    }) as Partial<CrudInterface<T> & ExtraMethods>);
                }
            } catch (error) {
                console.error(`Error deleting in ${endpoint}:`, error);
            }
        },
        ...(extend ? extend(set, get) : {} as ExtraMethods), // Correction ici
    }));
};
