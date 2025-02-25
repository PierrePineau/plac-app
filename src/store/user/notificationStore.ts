import { createCrudStore } from "../createCrudStore";

export const useNotificationStore = createCrudStore<Notif>("/api/app/notif");