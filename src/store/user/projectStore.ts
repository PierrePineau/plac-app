import { createCrudStore } from "../createCrudStore";

export const useProjectStore = createCrudStore<Project>("/api/app/organisations/{idOrganisation}/projects", (set, get) => ({}));

// export const useProjectStore = createCrudStore<Project>("/api/app/organisations/{idOrganisation}/projects", (set, get) => ({
//     resetPassword: async (userId: string) => {
//         try {
//             const response = await post<ResponseApi>(`/api/admin/users/${userId}/reset-password`, {});
//             if (response.success) {
//                 console.log(`Password reset for user ${userId}`);
//                 return true;
//             }
//         } catch (error) {
//             console.error(`Error resetting password for user ${userId}:`, error);
//         }
//         return false;
//     },
// }));