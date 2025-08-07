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
      name: "user-storage",
      getStorage: () => localStorage,
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
      name: "access-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useGymStore = create(
  persist(
    (set) => ({
      gyms: [],
      setGyms: (gyms) => set({ gyms }),
      addGym: (gym) => set((state) => ({ gyms: [...state.gyms, gym] })), // add one gym
      clearGyms: () => set({ gyms: [] }),
    }),
    {
      name: "gym-array-store",
    }
  )
);

export const resetAllStores = () => {
  // Clear Zustand state
  useUserStore.getState().clearUser();
  useAccessStore.getState().clearUser();
  useGymStore.getState().clearGyms();

  // Remove persisted localStorage keys
  localStorage.removeItem("user-storage");
  localStorage.removeItem("access-storage");
  localStorage.removeItem("gym-array-store");
};
