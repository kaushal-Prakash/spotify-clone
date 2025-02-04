import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserData {
  userData: Record<string, unknown>;
  updateData: (newData: Record<string, unknown>) => void;
  clearStore: () => void;
}

export const UserStore = create<UserData>()(
  persist(
    (set) => ({
      userData: {},
      updateData: (newData) => set(() => ({ userData: newData })),
      clearStore: () => set(() => ({ userData: {} })),
    }),
    {
      name: "user-data-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => console.log("rehydrated"),
    }
  )
);
