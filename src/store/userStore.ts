import { mockUsers } from '@/core/mock/user';
import { create } from 'zustand';

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ? mockUsers : [],
  fetchUsers: async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') return;
    try {
      const response = await fetch('/api/users');
      const data: User[] = await response.json();
      set({ users: data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  createUser: async (user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      const newMockUser: User = {
        id: mockUsers.length + 1,
        uuid: (Math.random() * 100000).toString(),
        email: user.email ?? 'newuser@example.com',
        roles: user.roles ?? ['ROLE_USER'],
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        enable: true,
        userOrganisations: user.userOrganisations ?? [],
        ...user,
      } as User;
      set((state) => ({ users: [...state.users, newMockUser] }));
      return;
    }
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const newUser: User = await response.json();
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error('Error creating user:', error);
    }
  },
  updateUser: async (id, user) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const updatedUser: User = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },
  deleteUser: async (id) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
      return;
    }
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },
}));
