import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  company?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // TODO: Replace with actual API call
        console.log('Logging in:', email, password);
        
        // Mock login
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          plan: 'Enterprise',
          company: 'Acme Corp'
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      setUser: (user: User) => {
        set({ user });
      }
    }),
    {
      name: 'guaw-auth-storage'
    }
  )
);
