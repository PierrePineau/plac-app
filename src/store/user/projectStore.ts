import { mockProjects } from "@/core/mock/data";
import { create } from "zustand";
import { get as apiGet, post, remove } from "@/core/services/api.helper";
import { useOrganisationStore } from "./organisationStore";

interface ProjectState {
	data: Project[] | [];
	fetchData: (filters: any) => Promise<void>;
	getOneById: (id: number) => Project | undefined;
	create: (project: Partial<Project>) => Promise<Project | null>;
	update: (id: number, project: Partial<Project>) => Promise<Project | null>;
	delete: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
	data: [],
	fetchData: async (filters: any) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
		try {
            // const { idOrganisation } = useOrganisationStore(); // Don't work ?
            const idOrganisation = localStorage.getItem("idOrganisation");
			const response = await apiGet<ResponseApi>(`/api/app/organisations/${idOrganisation}/projects`, filters);
			if (response.success) {
				const data = (response.data as any).results as Project[];
				set({ data });
				// return data;
			}
		} catch (error) {
			console.error("Error fetching:", error);
		}
	},
	getOneById: (id) => {
		const { data } = get();
		return data.find((data) => data.id === id);
	},
	create: async (project) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
		// 	const newMockProject: Project = {
		// 		id: mockProjects.length + 1,
		// 		uuid: (Math.random() * 100000).toString(),
		// 		reference: project.reference ?? `PRJ-${mockProjects.length + 1}`,
		// 		name: project.name ?? "New Project",
		// 		notes: project.notes ?? [],
		// 		files: project.files ?? [],
		// 	} as Project;
		// 	set((state) => ({ data: [...state.projects, newMockProject] }));
		// 	return;
		// }
		try {
			// const response = await fetch("/api/projects", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(project),
			// });
            // const { idOrganisation } = useOrganisationStore();
            const idOrganisation = localStorage.getItem("idOrganisation");
            const response = await post<ResponseApi>(`/api/app/organisations/${idOrganisation}/projects`, project);
			if (response.success) {
                const data = (response.data as Project);
                set((state) => ({ data: [...state.data, data] }));

                return data;
			}

			// const newProject: Project = await response.json();
			// set((state) => ({ data: [...state.projects, newProject] }));
		} catch (error) {
			console.error("Error creating project:", error);
		}

        return null;
	},
	update: async (id, project) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
		// 	set((state) => ({
		// 		data: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
		// 	}));
		// 	return;
		// }
		try {
            const idOrganisation = localStorage.getItem("idOrganisation");
            const response = await post<ResponseApi>(`/api/app/organisations/${idOrganisation}/projects/${id}`, project);
			if (response.success) {
                const updatedProject = (response.data as Project);
                set((state) => ({
                    data: state.data.map((p) => (p.id === id ? updatedProject : p)),
                }));

                return updatedProject;
			}
		} catch (error) {
			console.error("Error updating project:", error);
		}

        return null;
	},
	delete: async (id) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
		// 	set((state) => ({
		// 		data: state.projects.filter((p) => p.id !== id),
		// 	}));
		// 	return;
		// }
		try {
            const { idOrganisation } = useOrganisationStore();
            const response = await remove<ResponseApi>(`/api/app/organisations/${idOrganisation}/projects/${id}`);
            if (response.success) {
                set((state) => ({
                    data: state.data.filter((p) => p.id !== id),
                }));
			}
		} catch (error) {
			console.error("Error deleting project:", error);
		}
	},
}));
