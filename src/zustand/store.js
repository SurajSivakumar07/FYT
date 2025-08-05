// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key in localStorage
      getStorage: () => localStorage, // or sessionStorage if you prefer
    }
  )
);

export const useAccessStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "access-storage", // key in localStorage
      getStorage: () => localStorage, // you can also use sessionStorage
    }
  )
);
