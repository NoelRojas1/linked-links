import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axiosClient.ts";

interface RegisterData {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
}

interface LoginData {
    usernameOrEmail: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    bgImage?: string;
    bgColor?: string;
    bgType?: string;
    bio?: string;
    location?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    authUser: AuthUser | null;

    verify: () => void,
    register: (data: RegisterData) => void;
    login: (data: LoginData) => void;
    logout: () => void;
    checkUsernameAvailability: (username: string) => Promise<{taken: boolean}>;
    updateUserFromUserStore: (userData: Omit<AuthUser, 'email' | 'id' | 'username'>) => void;
}

// Maybe its own hook
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useAuthStore = create<AuthState>((set, get) => {
    return {
        authUser: null,
        isAuthenticated: false,

        register: async (data: RegisterData) => {
            try {
                await axiosInstance.post('/auth/register', data);
                get().verify();
                toast.success('Registered user successfully!', {
                    style: {
                        border: `1px solid ${isDarkMode ? '#c084fc' : '#aa3bff'}`,
                        padding: '1rem',
                        color: `${isDarkMode ? '#9ca3af' : '#6b6375'}`,
                    },
                    iconTheme: {
                        primary: `${isDarkMode ? '#c084fc' : '#aa3bff'}`,
                        secondary: `${isDarkMode ? '#f3f4f6' : '#08060d'}`,
                    }
                });
            } catch (e) {
                toast.error('Error creating user.');
                console.log(e);
            }
        },
        login: async (data: LoginData) => {
            try {
                await axiosInstance.post('/auth/login', data);
                get().verify();
                toast.success('Logged in successfully!', {
                    style: {
                        border: `1px solid ${isDarkMode ? '#c084fc' : '#aa3bff'}`,
                        padding: '1rem',
                        color: `${isDarkMode ? '#9ca3af' : '#6b6375'}`,
                    },
                    iconTheme: {
                        primary: `${isDarkMode ? '#c084fc' : '#aa3bff'}`,
                        secondary: `${isDarkMode ? '#f3f4f6' : '#08060d'}`,
                    }
                });
            } catch (e) {
                toast.error('Error logging user in.');
                console.log(e);
            }
        },
        logout: async () => {
            try {
                await axiosInstance.delete('/auth/logout', {
                    withCredentials: true,
                })
                set({authUser: null, isAuthenticated: false});
            } catch (e) {
                toast.error('Error logging user out.');
                console.log(e);
            }
        },
        verify: async () => {
          try {
              const response = await axiosInstance.get('/auth/verify', {
                  withCredentials: true,
              });
              set({authUser: response.data, isAuthenticated: true});
          } catch (e) {
              toast.error('Error verifying user.');
              console.log(e);
          }
        },
        checkUsernameAvailability: async (username: string) => {
            try {
                const response = await axiosInstance.post('/auth/availability', {
                    username
                });
                return response.data;
            } catch (e) {
                toast.error('Error checking username availability.');
                console.log(e);
            }
        },
        updateUserFromUserStore : (newUserData: Omit<AuthUser, 'email' | 'id' | 'username'>) => {
            const currentUser = get().authUser;
            if (!currentUser) {return}
            set({authUser: {...currentUser, ...newUserData}});
        }
    }
});