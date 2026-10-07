import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axiosClient.ts";
import { useAuthStore } from "./useAuthStore.ts";

// Maybe its own hook
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

interface UserInfo {
    bio?: string;
    location?: string;
    firstName?: string;
    lastName?: string;
    bgType?: string;
}

interface UserStore {
    updateUserInfo: (data: UserInfo) => void;
}

export const useUserStore = create<UserStore>((set, get) => {
    return {
        updateUserInfo: async (data: UserInfo) => {
            try {
                const userId = useAuthStore.getState().authUser.id;
                await axiosInstance.put(`/user/${userId}`, data, {
                    withCredentials: true,
                });

                // update AuthStore with Updated User Info
                useAuthStore.getState().updateUserFromUserStore({...data});
            } catch (e) {
                toast.error('Error creating user.');
                console.log(e);
            }
        }
    }
});