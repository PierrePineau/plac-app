import { mockNotifications } from "@/core/mock/data";
import { create } from "zustand";

interface NotificationState {
  notifications: Notif[];
  fetchNotifications: () => Promise<void>;
  createNotification: (notification: Partial<Notif>) => Promise<void>;
  archivedNotification: (id: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications:
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ? mockNotifications : [],
  fetchNotifications: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set({ notifications: mockNotifications });
      return;
    }
    try {
      const response = await fetch("/api/employes");
      const data: Notif[] = await response.json();
      set({ notifications: data });
    } catch (error) {
      console.error("Error fetching employes:", error);
    }
  },
  createNotification: async (notification) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const newMockNotification: Notif = {
        id: mockNotifications.length + 1,
        message: notification.message,
        createdAt: notification.createdAt,
        read: false,
        sender: notification.sender
      } as Notif;
      set((state) => ({
        notifications: [...state.notifications, newMockNotification]
      }));
      return;
    }
    try {
      const response = await fetch("/api/employes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification)
      });
      const newNotification: Notif = await response.json();
      set((state) => ({
        notifications: [...state.notifications, newNotification]
      }));
    } catch (error) {
      console.error("Error creating employe:", error);
    }
  },
  archivedNotification: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      set((state) => ({
        notifications: state.notifications.filter((e) => e.id !== id)
      }));
      return;
    }
    try {
      const response = await fetch(`/api/employes/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete employe");
      }
      set((state) => ({
        notifications: state.notifications.filter((e) => e.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting employe:", error);
    }
  }
}));
