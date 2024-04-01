import { create } from 'zustand';
import {Me} from "../domains/Me";

interface AuthStore {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresIn: Date | null;
    me: Me | null;
    setAccessToken: (newToken: string | null) => void;
    setRefreshToken: (newRefreshToken: string | null) => void;
    setAccessTokenExpiresIn: (newDate: Date | null) => void;
    setMe: (newMe: Me | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresIn: null,
    me: null,
    setAccessToken: (newToken: string | null) => set({ accessToken: newToken }),
    setRefreshToken: (newRefreshToken: string | null) => set({ refreshToken: newRefreshToken }),
    setAccessTokenExpiresIn: (newDate: Date | null) => set({ accessTokenExpiresIn: newDate }),
    setMe: (newMe: Me | null) => set({ me: newMe }),
}));
