import { createCrudStore } from "../createCrudStore";

export const useUserStore = createCrudStore<User>("/api/admin/users");