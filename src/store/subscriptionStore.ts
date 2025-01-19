import { mockSubscriptions } from '@/core/mock/subscription';
import { create } from 'zustand';

interface SubscriptionState {
  subscriptions: Subscription[];
  fetchSubscriptions: () => Promise<void>;
  createSubscription: (subscription: Partial<Subscription>) => Promise<void>;
  updateSubscription: (id: number, subscription: Partial<Subscription>) => Promise<void>;
  deleteSubscription: (id: number) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ? mockSubscriptions : [],
  fetchSubscriptions: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') return;
    try {
      const response = await fetch('/api/subscriptions');
      const data: Subscription[] = await response.json();
      set({ subscriptions: data });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  },
  createSubscription: async (subscription) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      const newMockSubscription: Subscription = {
        id: mockSubscriptions.length + 1,
        organisationSubscriptions: subscription.organisationSubscriptions ?? [],
      } as Subscription;
      set((state) => ({ subscriptions: [...state.subscriptions, newMockSubscription] }));
      return;
    }
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });
      const newSubscription: Subscription = await response.json();
      set((state) => ({ subscriptions: [...state.subscriptions, newSubscription] }));
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  },
  updateSubscription: async (id, subscription) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        subscriptions: state.subscriptions.map((s) =>
          s.id === id ? { ...s, ...subscription } : s
        ),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });
      const updatedSubscription: Subscription = await response.json();
      set((state) => ({
        subscriptions: state.subscriptions.map((s) =>
          s.id === id ? updatedSubscription : s
        ),
      }));
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  },
  deleteSubscription: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        subscriptions: state.subscriptions.filter((s) => s.id !== id),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }
      set((state) => ({
        subscriptions: state.subscriptions.filter((s) => s.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  },
}));
