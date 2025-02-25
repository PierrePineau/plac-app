import { createCrudStore } from "../createCrudStore";

export const useUserStore = createCrudStore<User>("/api/app/users");
