import { mockOrganisations } from "@/core/mock/data";
import { create } from "zustand";
import { get, post, remove } from "../../core/services/api.helper";

// interface OrganisationState {
//   organisations: Organisation[];
//   fetchOrganisations: () => Promise<Organisation[]>;
//   fetchOrganisation: (
//     idOrganisation: number
//   ) => Promise<Organisation | undefined>;
//   createOrganisation: (organisation: Partial<Organisation>) => Promise<void>;
//   updateOrganisation: (
//     idOrganisation: number,
//     organisation: Partial<Organisation>
//   ) => Promise<void>;
//   deleteOrganisation: (idOrganisation: number) => Promise<void>;
//   fetchClients: (idOrganisation: number) => Promise<void>;
//   fetchNotes: (idOrganisation: number) => Promise<void>;
//   fetchProjects: (idOrganisation: number) => Promise<void>;
// }

// export const useOrganisationStore = create<OrganisationState>((set) => ({
//   organisations:
//     process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockOrganisations : [],
//   fetchOrganisations: async () => {
//     if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return mockOrganisations;
//     try {
//       const response = await get<ResponseApi>("/api/app/organisations/");
//       if (response.success) {
//         const organisations = (response.data as any).results as Organisation[];
//         set({ organisations });
//         return organisations;
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching organisations:", error);
//       return [];
//     }
//   },
//   fetchOrganisation: async (idOrganisation: number) => {
//     if (process.env.NEXT_PUBLIC_USE_MOCK === "true")
//       return mockOrganisations[0];
//     try {
//       const data = await get<Organisation>(
//         `/api/app/organisations/${idOrganisation}`,
//         { authTarget: "user" }
//       );
//       set((state) => ({
//         organisations: state.organisations.map((org) =>
//           org.id === idOrganisation ? data : org
//         )
//       }));
//       return data;
//     } catch (error) {
//       console.error("Error fetching organisation:", error);
//       return undefined;
//     }
//   },
//   createOrganisation: async (organisation) => {
//     if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
//     try {
//       const newOrganisation = await post<Organisation>(
//         `/api/app/organisations`,
//         organisation,
//         { authTarget: "user" }
//       );
//       set((state) => ({
//         organisations: [...state.organisations, newOrganisation]
//       }));
//     } catch (error) {
//       console.error("Error creating organisation:", error);
//     }
//   },
//   updateOrganisation: async (idOrganisation, organisation) => {
//     if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
//     try {
//       const updatedOrganisation = await post<Organisation>(
//         `/api/app/organisations/${idOrganisation}`,
//         organisation,
//         { authTarget: "user" }
//       );
//       set((state) => ({
//         organisations: state.organisations.map((o) =>
//           o.id === idOrganisation ? updatedOrganisation : o
//         )
//       }));
//     } catch (error) {
//       console.error("Error updating organisation:", error);
//     }
//   },
//   deleteOrganisation: async (idOrganisation) => {
//     if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
//     try {
//       await remove<Organisation>(`/api/app/organisations/${idOrganisation}`, {
//         authTarget: "user"
//       });
//       set((state) => ({
//         organisations: state.organisations.filter(
//           (o) => o.id !== idOrganisation
//         )
//       }));
//     } catch (error) {
//       console.error("Error deleting organisation:", error);
//     }
//   },
//   fetchClients: async (idOrganisation) => {
//     try {
//       const data = await get(
//         `/api/app/organisations/${idOrganisation}/clients`,
//         { authTarget: "user" }
//       );
//       console.log("Fetched clients:", data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     }
//   },
//   fetchNotes: async (idOrganisation) => {
//     try {
//       const data = await get(`/api/app/organisations/${idOrganisation}/notes`, {
//         authTarget: "user"
//       });
//       console.log("Fetched notes:", data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   },
//   fetchProjects: async (idOrganisation) => {
//     try {
//       const data = await get(
//         `/api/app/organisations/${idOrganisation}/projects`,
//         { authTarget: "user" }
//       );
//       console.log("Fetched projects:", data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   }
// }));

interface OrganisationState {
	idOrganisation: string | null;
	organisation: Organisation | null;
    setOrganisation: (organisation: Organisation) => void;
	get: (idOrganisation: number) => Promise<Organisation | undefined>;
	create: (organisation: Partial<Organisation>) => Promise<void>;
	update: (idOrganisation: number, organisation: Partial<Organisation>) => Promise<void>;
	delete: (idOrganisation: number) => Promise<void>;
}

export const useOrganisationStore = create<OrganisationState>((set) => ({
	idOrganisation: null,
	organisation: null,
    setOrganisation: (organisation: Organisation) => {
		console.log("Setting organisation:", organisation);
        localStorage.setItem("idOrganisation", organisation.id);
        localStorage.setItem("organisation", JSON.stringify(organisation));
        set({ organisation });
    },
	get: async (idOrganisation) => {
		try {
            const data = localStorage.getItem("organisation");
            if (data) {
                const org = JSON.parse(data);
                // localStorage.setItem("organisation", JSON.stringify(org));
                set({ organisation: org });
                set({ idOrganisation: org.id });
                return org;
            }else{
                const data = await get<Organisation>(`/api/app/organisations/${idOrganisation}`);
                localStorage.setItem("organisation", JSON.stringify(data));
				localStorage.setItem("idOrganisation", data.id);
                set({ organisation: data });
                return data;
            }
		} catch (error) {
			console.error("Error fetching organisation:", error);
			return undefined;
		}
	},
	create: async (organisation) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
		try {
			const newOrganisation = await post<Organisation>(`/api/app/organisations`, organisation);
            localStorage.setItem("organisation", JSON.stringify(newOrganisation));
			localStorage.setItem("idOrganisation", newOrganisation.id);
			set({ organisation: newOrganisation });
		} catch (error) {
			console.error("Error creating organisation:", error);
		}
	},
	update: async (idOrganisation, organisation) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
		try {
			const updatedOrganisation = await post<Organisation>(`/api/app/organisations/${idOrganisation}`, organisation);
			set({ organisation: updatedOrganisation });
            localStorage.setItem("organisation", JSON.stringify(updatedOrganisation));
			localStorage.setItem("idOrganisation", updatedOrganisation.id);
		} catch (error) {
			console.error("Error updating organisation:", error);
		}
	},
	delete: async (idOrganisation) => {
		// if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return;
		try {
			await remove<Organisation>(`/api/app/organisations/${idOrganisation}`);
			set({ organisation: null });
			set({ idOrganisation: null });
            localStorage.removeItem("organisation");
			localStorage.removeItem("idOrganisation");
		} catch (error) {
			console.error("Error deleting organisation:", error);
		}
	},
}));
