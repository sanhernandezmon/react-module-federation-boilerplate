// useUserStore.ts
import { create } from 'zustand';
import { persist , createJSONStorage } from 'zustand/middleware';

export type UserData = {
  id: number; 
  name: string;
  email: string;
  number: string;
};

type Store = {
  users: UserData[];
  lastUserId: number;
  addUser: (userData: UserData) => void;
  deleteUser: (userId: number) => void;
};

export const useUserStore = create(
  persist<Store>(
    (set) => ({
      users: [],
      lastUserId : 1,
      addUser: (userData : UserData) => {
        console.log("Agregando usuario con id: " + userData.id)
        set((state) => ({
          users: [...state.users, userData]  , lastUserId : userData.id}));
      },
      deleteUser: (userId : number) => {
        console.log("Eliminando usuario con id: " + userId)
        set((state) => ({
          users: state.users.filter((user : UserData) => user.id !== userId),
        }));
      },
    }),
    {
      name: 'user-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useUserStore;
